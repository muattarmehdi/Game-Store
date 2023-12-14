import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

interface FetchData<T> {
  count: number;
  results: T[];
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[] | null
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);
      apiClient
        .get<FetchData<T>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
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
    },
    deps ? [...deps] : []
  );
  return { data, error, loading };
};

export default useData;
