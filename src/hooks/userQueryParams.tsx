import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// Hook used to get specific query parameter values
// E.g: const {name} = useSearchParam()
const useQueryParams = () => {
  const [searchParams] = useSearchParams();

  const queryParams = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  return { ...queryParams };
};

export default useQueryParams;
