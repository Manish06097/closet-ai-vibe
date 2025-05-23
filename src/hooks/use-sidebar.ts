
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);
  const toggleSidebar = () => setIsOpen(prev => !prev);

  // Close sidebar when transitioning from mobile to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return {
    isOpen,
    isMobile,
    openSidebar,
    closeSidebar,
    toggleSidebar
  };
};
