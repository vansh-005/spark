import { useEffect, useState } from "react";
import ProductCarousel from "./ProductCarousel";  

// Utility function: fetch all products from DummyJSON
async function fetchAllProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const data = await res.json();
  return data.products || [];
}

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchAllProducts().then(setProducts);
  }, []);

  return (
    <section>
      <ProductCarousel products={products} />
    </section>
  );
}
