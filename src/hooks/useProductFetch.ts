import useGet from "./useGet";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

interface UseProductFetchProps {
  productId?: string;
}

const useProductFetch = ({ productId }: UseProductFetchProps) => {
  const loginDetails = useSelector((state: any) => state.loginForm);
  const userRole = loginDetails.role;
  const token = Cookies.get("token");

  // Determine the base URL based on user role
  const baseURL =
    userRole === "admin"
      ? process.env.REACT_APP_ADMIN_PORT
      : process.env.REACT_APP_USER_PORT;

  // Fetch data using useGet hook
  const { data, isLoading, makeRequest } = useGet(
    `${baseURL}/get-product/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );


  return { data, isLoading, makeRequest };
};

export default useProductFetch;
