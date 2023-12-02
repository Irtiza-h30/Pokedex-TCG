import { useCallback, useState } from "react";

const useFetchData = <T,>(initialState: T) => {
  const [response, setResponse] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback((url: string) => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((res: T) => setResponse(res))
      .finally(() => setIsLoading(false));
  }, []);

  return { response, isLoading, fetchData };
};

export default useFetchData;
