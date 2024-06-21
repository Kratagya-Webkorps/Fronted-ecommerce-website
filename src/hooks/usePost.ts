import { useState, useCallback } from "react";
import axios from "axios";

export default function usePost(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const makeRequest = useCallback(
    async (requestData: any) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(url, requestData);
        setData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
      setIsLoading(false);
    },
    [url]
  );

  return { makeRequest, data, isLoading, error };
}
