import React from "react";

const getIsMobile = () =>
  typeof window !== "undefined" && window.innerWidth <= 640;

export default function useWindowSize() {
  const [size, setSize] = React.useState<[number, number]>(() => [
    typeof window !== "undefined" ? window.innerWidth : 0,
    typeof window !== "undefined" ? window.innerHeight : 0,
  ]);
  const [isMobile, setIsMobile] = React.useState<boolean>(() => getIsMobile());

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
      setIsMobile(getIsMobile());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { size, isMobile };
}
