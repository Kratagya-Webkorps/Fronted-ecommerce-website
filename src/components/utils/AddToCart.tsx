import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import usePost from "../../hooks/usePost";
import {
  ADD_TO_CART,
  UPDATE_CART_ITEM_COUNT,
} from "../../redux/interfaces/interfaces";
import { fetchCartLength } from "../../hooks/fetchCartLength";

type AddToCartProps = {
  productId: string;
  stock: number;
  price: number;
};

const AddToCart: React.FC<AddToCartProps> = ({ productId, stock, price }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const loginDetails = useSelector((state: any) => state.loginForm);
  const cart = useSelector((state: any) => state.cart);
  const username = loginDetails.username;

  const token = Cookies.get("token");
  const userRole = loginDetails.role;

  const baseURL =
    userRole === "admin"
      ? process.env.REACT_APP_ADMIN_PORT
      : process.env.REACT_APP_USER_PORT;

  const {
    data,
    isLoading: isAddToCartLoading,
    makeRequest,
    error: addToCartError,
  } = usePost(`${baseURL}/add-to-cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const handleAddToCart = async () => {
    const item = {
      username: username,
      productId: productId,
      quantity: quantity,
    };
    try {
      await makeRequest(item);
      dispatch({
        type: ADD_TO_CART,
        payload: item,
      });

      console.log("Product added to cart successfully");
    } catch (err) {
      console.error("Error saving in cart:", err);
    }
  };

  const handleBuyNow = async () => {
    console.log(quantity * price);
  };

  const updateQuantity = (action: string) => () => {
    if (action === "increase" && quantity < stock) {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (data) {
            const count = fetchCartLength(username, cart);
      dispatch({
        type: UPDATE_CART_ITEM_COUNT,
        payload: {
          username: username,
          count: count,
        },
      })
    }
  }, [data]);

  return (
    <div>
      <div className="flex items-center space-x-4 mb-4">
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-pointer"
          onClick={updateQuantity("decrease")}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="text-xl">{quantity}</span>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-pointer"
          onClick={updateQuantity("increase")}
          disabled={quantity >= stock}
        >
          +
        </button>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-orange-500 text-white px-6 py-2 rounded-md"
          onClick={handleAddToCart}
          disabled={isAddToCartLoading}
        >
          {isAddToCartLoading ? "Adding..." : "Add to Cart"}
        </button>
        <button
          className="bg-orange-700 text-white px-6 py-2 rounded-md"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
      {addToCartError && <p className="text-red-500 mt-4">{addToCartError}</p>}
    </div>
  );
};

export default AddToCart;
