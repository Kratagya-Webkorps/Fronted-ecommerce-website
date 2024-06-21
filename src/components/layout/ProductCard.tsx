import React, { useState } from "react";
import { ProductCardProps } from "../../redux/interfaces/interfaces";
import { FiStar } from "react-icons/fi";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  rating,
  className = "",
}) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <FiStar
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-500" : "text-gray-300"
        }`}
      />
    ));

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  return (
    <div className={`border p-4 rounded-lg shadow-md w-54 h-70 ${className}`}>
      <img src={image} alt="Product" className="w-full h-40 object-cover mb-4" />
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="mb-2">
            <span className="text-lg font-semibold">{name}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold flex">
              <HiOutlineCurrencyRupee className="w-6 h-6" />
              {price}
            </span>
            <div className="flex">{stars}</div>
          </div>
          <div className="flex">
            {isFavourite ? (
              <FaHeart onClick={toggleFavourite} className="cursor-pointer" />
            ) : (
              <FaRegHeart onClick={toggleFavourite} className="cursor-pointer" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
