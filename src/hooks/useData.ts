import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface FetchData<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchData<T>>(endpoint, { signal: controller.signal })
      .then((response) => {
        setData(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err as CanceledError<FetchData<T>>) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);
  return { data, error, loading };
};

export default useData;
