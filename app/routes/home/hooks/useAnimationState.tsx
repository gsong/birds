import { useState } from "react";

export function useAnimationState() {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return { animationComplete, handleAnimationComplete, setAnimationComplete };
}
