const mongoose = require('mongoose');
// const fetch = require('node-fetch');
const Product = require('./models/Product');
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));
const MONGO_URI = 'mongodb+srv://fft_03:dbUser1819@gdsc.xnlnm.mongodb.net/Cloud9';

async function main() {
  await mongoose.connect(MONGO_URI);

  // Fetch all products from DummyJSON (default limit: 30, use ?limit=100 if needed)
  const response = await fetch('https://dummyjson.com/products?limit=100');
  const { products } = await response.json();

  // Prepare product docs to match your schema
  const docs = products.map(p => ({
    name: p.title,
    price: p.price,
    originalPrice: Math.round(p.price * (1 + (p.discountPercentage || 0) / 100)),
    image: (p.thumbnail || (p.images && p.images[0]) || ""),
    category: p.category,
    tags: p.tags || [],
    rating: p.rating,
    // You can add more fields if you want, but these are enough for MVP
  }));

  // Clean old products (optional)
  await Product.deleteMany({});
  // Insert new products
  await Product.insertMany(docs);

  console.log('Seeded DB with DummyJSON products!');
  process.exit();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
