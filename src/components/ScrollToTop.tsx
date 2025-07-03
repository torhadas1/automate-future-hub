import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top when navigating to different routes
    // Don't scroll when navigating to sections within the same page
    if (!pathname.includes("#")) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;