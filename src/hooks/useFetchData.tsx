import { useCallback, useState } from "react";

const useFetchData = <T extends { data: unknown }>(initialState: T) => {
  const [response, setResponse] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = useCallback((url: string) => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((res: T) => setResponse(res))
      .finally(() => setIsLoading(false));
  }, []);

  const loadMoreData = useCallback((url: string) => {
    setIsFetching(true);
    fetch(url)
      .then((res) => res.json())
      .then((res: T) => {
        setResponse((prev) => {
          if (Array.isArray(prev.data) && Array.isArray(res.data)) {
            return {
              ...res,
              data: [...prev.data, ...res.data],
            };
          }
          return { ...res };
        });
      })
      .finally(() => setIsFetching(false));
  }, []);

  return { response, isLoading, fetchData, isFetching, loadMoreData };
};

export default useFetchData;
