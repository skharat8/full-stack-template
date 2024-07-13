import { useState } from "react";

function useToggle({
  initialValue = false,
  onToggle = () => {},
}): [boolean, () => void] {
  const [on, setOn] = useState(initialValue);

  function toggle() {
    setOn((prevOn) => !prevOn);
    onToggle();
  }

  return [on, toggle];
}

export default useToggle;
