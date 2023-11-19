import { useState, useEffect } from "react";

type response<T> = {
  data: T[] | null;
  error: Error | null;
  loading: boolean;
};

export const useFetch = <T>(url: string): response<T> => {
  const [data, setData] = useState<T[] | null>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    try {
      const responseData = await fetch(url);
      if (!responseData.ok) {
        throw new Error("Fetch Error!");
      }
      const data = await responseData.json();
      setData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        console.log("Unknown error!");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading };
};
