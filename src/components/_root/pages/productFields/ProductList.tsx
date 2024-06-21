import React, { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "../../../layout/ProductCard";

const USER_PORT = process.env.REACT_APP_USER_PORT;

interface Product {
  productImage: string;
  price: number;
  rating: number;
  name: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${USER_PORT}/get-all-products`, {});
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  const displayedProducts = viewAll ? products : products.slice(0, 8);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Explore Our Products</h2>
        {products.length > 8 && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto">
          {displayedProducts.map((product, index) => (
            <ProductCard
              key={index}
              image={product.productImage}
              name={product.name}
              price={product.price}
              rating={product.rating}
              className="max-w-xs"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
