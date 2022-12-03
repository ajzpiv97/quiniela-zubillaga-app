import { useEffect, useState } from "react";

interface windowSizeI {
  width: string | number;
  height: string | number;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<windowSizeI>({
    width: "",
    height: "",
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
