import { useEffect, useState } from "react";

function getWindowSize() { //G
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

const useWindowSize = () => { //S
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResizeEvent = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener("resize", handleResizeEvent);
    return () => {
      return window.removeEventListener("resize", handleResizeEvent);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;