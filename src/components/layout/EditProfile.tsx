import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputField from "../utils/InputField";

const EditProfile: React.FC = () => {
  const userData = useSelector((state: any) => state.loginForm);
  const { username, role, email } = userData;
  const [formData, setFormData] = useState({
    Username: username,
    role: role,
    email: email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-red-500 text-xl font-semibold mb-4">My Account</h2>
      <form>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <InputField
            type="text"
            placeholder="UserName"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <InputField
            type="text"
            placeholder=""
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            email
          </label>
          <InputField
            type="text"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
