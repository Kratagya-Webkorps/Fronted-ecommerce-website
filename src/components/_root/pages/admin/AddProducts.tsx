import React, { useState, ChangeEvent, FormEvent } from "react";
import { ProductFormData } from "../../../../redux/interfaces/interfaces";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

const AddProducts: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    productImage: "",
    price: "",
    stock: "",
    category: "",
    owner: "",
  });

  const [products, setProducts] = useState<ProductFormData[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          productImage: reader.result as string,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, description, productImage, price, stock, category, owner } =
      formData;

    const newProduct = {
      name,
      description,
      productImage,
      price,
      stock,
      category,
      owner,
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setFormData({
      name: "",
      description: "",
      productImage: "",
      price: "",
      stock: "",
      category: "",
      owner: "",
    });
    console.log(products);
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            name="productImage"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            onChange={handleImageChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Owner
          </label>
          <input
            type="text"
            name="owner"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.owner}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md"
        >
          Add Product
        </button>
      </form>

      {/* Display added products */}
      <div className=" mt-4">
        <h2 className="text-xl font-semibold mb-2">Added Products</h2>
        {products.map((product, index) => (
          <div key={index} className="border flex p-4 mb-4 rounded-md">
            <p>Name: {product.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Category: {product.category}</p>
            <p>Owner: {product.owner}</p>
            <img src={product.productImage} height={100} width={100} alt="mew"/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProducts;
