import { useState, useEffect } from "react";
import { useFetcher } from "react-router";

type AnimationPhase = "idle" | "sliding" | "paused" | "transitioning";
type Direction = "left" | "right";

export function useImageSelection(image1: string, image2: string) {
  const [selected, setSelected] = useState<string>();
  const [direction, setDirection] = useState<Direction>("left");
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>("idle");
  const fetcher = useFetcher();

  // Reset selection when new images are loaded
  useEffect(() => {
    setSelected(undefined);
    setAnimationPhase("idle");
  }, [image1, image2]);

  const handleSelect = (option: string, position: "left" | "right") => {
    setDirection(position);
    setSelected(option);
    setAnimationPhase("sliding");
    
    // After sliding animation completes, pause
    setTimeout(() => {
      setAnimationPhase("paused");
      
      // After pause, transition to new images
      setTimeout(() => {
        setAnimationPhase("transitioning");
        fetcher.submit({ selected: option }, { method: "post" });
      }, 500); // Pause duration
    }, 500); // Slide duration
  };

  return { 
    selected, 
    handleSelect, 
    direction, 
    animationPhase 
  };
}
