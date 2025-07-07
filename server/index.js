require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Product = require('./models/Product');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Utility to strip Markdown fences
function stripMarkdown(jsonStr) {
  let cleaned = jsonStr.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```json|^```/i, '').replace(/```$/, '').trim();
  }
  return cleaned;
}

// JSON validation middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  next();
});

/* ---------- CHATBOT ENDPOINT ---------- */
app.post('/api/chat', async (req, res) => {
  const TIMEOUT = 30000; // 30 seconds timeout
  
  try {
    const userMsg = req.body.message?.trim();
    if (!userMsg) return res.status(400).json({ error: 'Empty user message' });

    // -- ① INTENT EXTRACTION --
    const intentPrompt = `
You are an intent extractor for a grocery chatbot. 
Return ONLY valid JSON with these optional fields:
{
  "budget":   number|null,             // ₹
  "keywords": string[] | null,         // free-text keywords
  "categories": string[] | null,       // food, beauty, electronics…
  "dietary": string[] | null,          // vegan, veg, keto…
  "qtyHints": string | null            // any quantities user mentioned
}
User request: """${userMsg}"""
`;

    // Timeout protection
    const intentPromise = model.generateContent(intentPrompt);
    const intentTimeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Intent extraction timeout')), TIMEOUT)
    );
    
    const intentRaw = await Promise.race([intentPromise, intentTimeout]);
    let intentText = intentRaw.response.text();
    
    // Handle different response formats
    if (intentText.startsWith('json')) {
      intentText = intentText.replace(/^json\s*/i, '');
    }
    
    let intent;
    try {
      intent = JSON.parse(intentText);
    } catch (e) {
      try {
        intent = JSON.parse(stripMarkdown(intentText));
      } catch (parseError) {
        console.error("Intent parse error:", intentText, parseError);
        return res.status(500).json({ 
          error: 'Gemini intent parse error', 
          detail: parseError.toString() 
        });
      }
    }

    // -- ② MONGO RETRIEVAL --
    const q = {};
    if (intent.budget) q.price = { $lte: intent.budget };
    if (intent.categories?.length)
      q.category = { $in: intent.categories.map(c => new RegExp(c, 'i')) };
    if (intent.keywords?.length) {
      q.$or = [
        { name: { $regex: intent.keywords.join('|'), $options: 'i' } },
        { tags: { $in: intent.keywords.map(k => new RegExp(k, 'i')) } }
      ];
    }

    const candidates = await Product.find(q).limit(15);
    if (candidates.length === 0)
      return res.json({ items: [], summary: 'Sorry, no matching items in stock.' });

    // Prepare for Gemini
    const candidatesForGemini = candidates.map(c => ({
      ...c.toObject(),
      _id: c._id.toString()
    }));

    // -- ③ FINAL RECOMMENDATION PROMPT --
    const recPrompt = `
You are a shopping assistant.
Given this user request: """${userMsg}"""
and these available products in the PRODUCTS array below, reply with ONLY valid JSON.

REQUIRED FORMAT:
{
  "items": [
    {
      "productId": "_id from PRODUCTS as string",
      "quantity": "string (e.g. '2 packs', '1kg')",
      "reason": "string, short reason",
      "lineTotal": number (₹)
    }
  ],
  "summary": "Total cost and key benefits"
}

If no items match, return:
{ "items": [], "summary": "No products found" }

Here is PRODUCTS:
${JSON.stringify(candidatesForGemini)}
`;

    const recPromise = model.generateContent(recPrompt);
    const recTimeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Recommendation timeout')), TIMEOUT)
    );
    
    const recRaw = await Promise.race([recPromise, recTimeout]);
    let replyText = recRaw.response.text();
    
    // Robust JSON parsing
    let items = [];
    let summary = "Recommended items";
    
    try {
      // Try to parse as full JSON
      const result = JSON.parse(stripMarkdown(replyText));
      if (result.items) {
        items = result.items;
        summary = result.summary || summary;
      } else if (Array.isArray(result)) {
        items = result;
      }
    } catch (e) {
      // Fallback: Extract JSON from partial response
      try {
        const jsonMatch = replyText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          items = result.items || [];
          summary = result.summary || summary;
        } else {
          summary = replyText.trim();
        }
      } catch (finalError) {
        summary = replyText.trim();
      }
    }

    res.json({ items, summary });

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Chatbot failure', 
      detail: err.toString() 
    });
  }
});

/* --------- Product search API ----------- */
app.get('/api/search', async (req, res) => {
  try {
    const { q, category } = req.query;
    const query = {};
    
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ];
    }
    
    if (category) {
      query.category = new RegExp(category, 'i');
    }

    const results = await Product.find(query).limit(12);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err });
  }
});

/* ---------- GET Products by IDs ---------- */
app.get('/api/products', async (req, res) => {
  try {
    const ids = req.query.ids?.split(',') || [];
    if (ids.length === 0) return res.json([]);
    
    const products = await Product.find({ 
      _id: { $in: ids.map(id => new mongoose.Types.ObjectId(id)) }
    });
    
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err });
  }
});

app.listen(4000, () => console.log('API on http://localhost:4000'));