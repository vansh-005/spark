export const fetchProducts = async (limit = 10, skip = 0) => {
  const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  return response.json();
};

export const fetchProductById = async (id: string) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  return response.json();
};

export const fetchProductsByCategory = async (category: string) => {
  const response = await fetch(`https://dummyjson.com/products/category/${category}`);
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch('https://dummyjson.com/products/categories');
  return response.json();
};