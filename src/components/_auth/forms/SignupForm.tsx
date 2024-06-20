import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import image01 from "../../../images/image01.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SUBMIT_FORM } from "../../../redux/interfaces/interfaces";

interface FormData {
  name: string;
  userName: string;
  email: string;
  password: string;
}

interface InputFieldProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  required = false,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    className="w-full p-2 mb-4 border border-gray-300 rounded"
    required={required}
  />
);

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    },
    [setFormData]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;

      e.preventDefault();
      if (!validatePassword(formData.password)) {
        setError(
          "Password must be at least 8 characters long and include at least one letter, and one number."
        );
        return;
      }
      setError("");
      try {
        const response = await axios.post(`${SERVER_PORT}/signup`, {
          email: formData.email,
          name: formData.name,
          password: formData.password,
          username: formData.userName,
        });
        console.log(response);
        dispatch({
          type: SUBMIT_FORM,
          payload: {
            email: formData.email,
            name: formData.name,
            password: formData.password,
            username: formData.userName,
          },
        });
        navigate("/login")
      } catch (error) {
        console.log(error);
      }

      console.log("Form submitted:", formData);
    },
    [formData ,navigate, dispatch]
  );

  const validatePassword = (password: string) => {
    const regex = /^[a-zA-Z0-9@$!%*#?&]{3,30}$/;
    return regex.test(password);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row h-min">
      <div className="sm:w-1/2 hidden md:block justify-center items-center ">
        <img
          src={image01}
          alt="Shopping Cart and Smartphone"
          className="max-h-full max-w-full"
        />
      </div>
      <div className="flex w-full sm:w-1/2 items-center justify-center bg-gray-100">
        <form
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold mb-4">Create an account</h1>
          <p className="mb-4 text-gray-600">Enter your details below</p>
          <InputField
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputField
            type="text"
            placeholder="UserName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          <InputField
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-2 rounded mb-4"
          >
            Create Account
          </button>
          <p className="mt-4 text-gray-600">
            Already have an account?{" "}
            <Link className="text-red-600" to={"/login"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
