import { useEffect } from "react";

function useKeyPress(key: string, action: () => void) {
  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.code.toLowerCase() === key.toLowerCase()) action();
    }

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [key, action]);
}

export default useKeyPress;
