import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import image01 from "../../../images/image01.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../../../redux/interfaces/interfaces";

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
  value,
  name,
  onChange,
  required = false,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    name={name}
    onChange={onChange}
    className="w-full p-2 mb-4 border border-gray-300 rounded"
    required={required}
  />
);

interface LoginFormProps {
  role: "user" | "admin";
}

const LoginForm: React.FC<LoginFormProps> = ({ role }) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
      const loginEndpoint = role === "admin" ? "/login-admin" : "/login";

      try {
        const response = await axios.post(`${SERVER_PORT}${loginEndpoint}`, {
          password: password,
          username: userName,
        });
        const { email, role, success, username } = response.data;

        if (success) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              userName: username,
              email: email,
              isLoggedIn: success,
              role: role,
            },
          });
          navigate("/");
        }
      } catch (error:any) {
        console.log(error);
        setError(`Login failed: ${error.response?.data?.message || error.message}`);
      }
    },
    [userName, password, role, navigate, dispatch]
  );

  return (
    <div className="flex mt-5 flex-col gap-3 sm:flex-row h-min">
      <div className="sm:w-1/2 hidden md:block justify-center items-center ">
        <img
          src={image01}
          alt="Shopping Cart and Smartphone"
          className="max-h-full max-w-full"
        />
      </div>
      <div className="flex w-full sm:w-1/2 items-center justify-center bg-gray-100">
        <form
          className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold mb-4">
            {role === "admin" ? "Admin Login" : "Login to your account"}
          </h1>
          <p className="mb-4 text-gray-600">Enter your details below</p>
          <InputField
            type="text"
            placeholder="UserName"
            name="username"
            value={userName}
            onChange={handleChange}
            required
          />
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-red-600 text-white p-2 rounded mb-4"
          >
            Login
          </button>
          <p className="mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link className="text-red-600" to="/signup">
              Signup
            </Link>
          </p>
          {role !== "admin" && (
            <p className="mt-4 text-gray-600">
              Want to login as admin?{" "}
              <Link className="text-red-600" to="/login-admin">
                Admin Login
              </Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
