import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ProductFormData } from "../../../../redux/interfaces/interfaces";

const ADMIN_PORT = process.env.REACT_APP_ADMIN_PORT;

const AddProducts: React.FC = () => {


  const initialFormData: ProductFormData = {
    name: "",
    description: "",
    productImage: null,
    price: "",
    stock: "",
    category: "",
    owner: "",
  };

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [imageError, setImageError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        setImageError("Please upload a valid image file (JPEG, PNG, GIF)");
        setFormData((prevData) => ({ ...prevData, productImage: null }));
      } else {
        setImageError("");
        setFormData((prevData) => ({ ...prevData, productImage: file }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.stock) newErrors.stock = "Stock is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.owner) newErrors.owner = "Owner is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Set loading state to true

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSend.append(key, value as Blob | string);
      }
    });

    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `${ADMIN_PORT}/create`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setFormData(initialFormData); // Reset form after successful submission
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false); // Set loading state to false after submission
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Product</h1>
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
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
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
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              name="productImage"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              onChange={handleFileChange}
              accept="image/*"
            />
            {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
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
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
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
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock}</p>
            )}
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
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
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
            />
            {errors.owner && (
              <p className="text-red-500 text-sm">{errors.owner}</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white p-2 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
