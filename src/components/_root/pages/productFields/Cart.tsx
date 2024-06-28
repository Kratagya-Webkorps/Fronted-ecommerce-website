import { useSelector } from "react-redux";
import useCartFetch from "../../../../hooks/useCartFetch";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../../../../redux/interfaces/interfaces";
import { Link } from "react-router-dom";

const Cart = () => {
  const loginDetails = useSelector((state: any) => state.loginForm);
  const username = loginDetails.username;
  const userRole = loginDetails.role;
  const token = Cookies.get("token");

  const [cartProducts, setCartProducts] = useState<
    { product: Product; quantity: number }[]
  >([]);
  const [subtotal, setSubtotal] = useState<number>(0); // State for subtotal
  const [error, setError] = useState<string | null>(null);

  const baseURL =
    userRole === "admin"
      ? process.env.REACT_APP_ADMIN_PORT
      : process.env.REACT_APP_USER_PORT;

  const { data: cartData } = useCartFetch({ username });

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

          setCartProducts(resolvedProducts);

          // Calculate subtotal
          const subtotalValue = resolvedProducts.reduce(
            (accumulator, product) => {
              return accumulator + product.product.price * product.quantity;
            },
            0
          );

          setSubtotal(subtotalValue);
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
            <th className="p-2 text-left">Quantity</th>
            <th className="p-2 text-left">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((product) => (
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
              <td className="p-2">{product.quantity}</td>
              <td className="p-2">
                {product.product.price * product.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border p-5">
        <div className="flex justify-between mb-3">
          <span>Subtotal:</span>
          <span>{subtotal}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>{subtotal}</span>
        </div>
        <button className="bg-red-500 text-white w-full mt-5 py-3 rounded-md">
          Process to checkout
        </button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Cart;
