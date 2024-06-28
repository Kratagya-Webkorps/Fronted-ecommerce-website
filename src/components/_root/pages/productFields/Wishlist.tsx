import React, { useEffect, useState } from "react";
import { Product } from "../../../../redux/interfaces/interfaces";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import useWishlistFetch from "../../../../hooks/useWishlistFetch";
import axios from "axios";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState<
    { product: Product; quantity: number }[]
  >([]);
  const loginDetails = useSelector((state: any) => state.loginForm);
  const username = loginDetails.username;
  const userRole = loginDetails.role;
  const token = Cookies.get("token");
  const [error, setError] = useState<string | null>(null);

  const baseURL =
    userRole === "admin"
      ? process.env.REACT_APP_ADMIN_PORT
      : process.env.REACT_APP_USER_PORT;

  const { data: cartData } = useWishlistFetch({ username });
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cartData) {
          const productPromises = cartData.products.map(async (item) => {
            const response = await axios.get(
              `${baseURL}/get-product/${item.productId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            return {
              product: response.data,
              quantity: item.quantity,
            };
          });

          const resolvedProducts = await Promise.all(productPromises);

          setWishlistProducts(resolvedProducts);

          // Calculate subtotal
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Error fetching product data");
      }
    };

    fetchData();
  }, [cartData, token, baseURL]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow-md">
      <div className="mb-5">
        <Link to="/" className="text-gray-600 hover:text-gray-800">
          Return To Shop
        </Link>
      </div>
      <table className="w-full mb-5 border-collapse border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Product</th>
            <th className="p-2 text-left">Price</th>
           
          </tr>
        </thead>
        <tbody>
          {wishlistProducts.map((product) => (
            <tr key={product.product._id} className="border-b">
              <td className="p-2 flex items-center">
                <img
                  src={product.product.productImage}
                  alt={product.product.name}
                  className="w-16 h-16 object-contain"
                />
                <span className="ml-3">{product.product.name}</span>
              </td>
              <td className="p-2">{product.product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Wishlist;
