import React, {  useState } from "react";
import { FiHeart, FiShoppingCart, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT_SUCCESS } from "../../redux/interfaces/interfaces";
import Cookies from "js-cookie";

const Navbar: React.FC = () => {
  const loginDetails = useSelector((state: any) => state.loginForm);
  const isLoggedIn = loginDetails.isLoggedIn;
  const userRole = loginDetails.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const logout = ()=>{
    Cookies.remove('token')
    navigate("/")

    dispatch({
      type:LOGOUT_SUCCESS
    })

  }

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl container mx-auto px-4 py-2 flex items-center justify-between">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-dark">
          Exclusive
        </span>

        <div className="flex gap-4 items-center">
          <input
            type="text"
            id="search-navbar"
            className="hidden md:block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
          />
          <FiSearch className="hidden md:block text-gray-700" size={30} />
          <FiHeart className="text-gray-700" size={30} />
          <FiShoppingCart className="text-gray-700" size={30} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
          </button>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1 absolute top-16 md:relative md:top-0 left-0 right-0 bg-white md:bg-transparent md:border-none dark:bg-gray-800 dark:border-gray-700 md:dark:bg-transparent md:dark:border-none md:dark:text-white md:flex-row md:p-0 md:mt-0 md:space-x-8 rtl:space-x-reverse`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:border-gray-700">
            <li>
              <Link
                to={"/"}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-dark md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/contact"}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-dark md:dark:hover:bg-transparent dark:border-gray-700"
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-dark md:dark:hover:bg-transparent dark:border-gray-700"
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-dark md:dark:hover:bg-transparent dark:border-gray-700"
                  to={"/signup"}
                  onClick={closeMenu}
                >
                  Signup
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-dark md:dark:hover:bg-transparent dark:border-gray-700"
                  to={"/profile"}
                  onClick={closeMenu}
                >
                  {userRole === "admin" ? "Admin" : "User"}
                </Link>
              </li>
            )}
            {isLoggedIn && userRole === "admin" && (
              <li>
                <Link
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-dark md:dark:hover:bg-transparent dark:border-gray-700"
                  to={"/addproducts"}
                  onClick={closeMenu}
                >
                  Add Products
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <p
                  className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-dark md:dark:hover:bg-transparent dark:border-gray-700"
                  
                  onClick={logout}
                >
                  Logout
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
