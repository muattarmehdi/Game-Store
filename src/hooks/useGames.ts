import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
}

export interface FetchGames {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<FetchGames>("/games", { signal: controller.signal })
      .then((response) => setGames(response.data.results))
      .catch((err) => {
        if (err as CanceledError<FetchGames>) return;
        setError(err.message);
      });
    return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;
