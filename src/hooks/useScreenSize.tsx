import { useCallback, useEffect, useState } from "react";

// Hook used to get current viewport width
// E.g: const {width} = useScreenSize()
const useScreenSize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, [setWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  return {
    width,
  };
};

export default useScreenSize;
