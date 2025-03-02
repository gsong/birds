import { useState, useEffect, useRef } from "react";
import { useFetcher } from "react-router";

import { useAnimationState } from "./useAnimationState";

export function useImageSelection(image1: string, image2: string) {
  const [selected, setSelected] = useState<string>();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fetcher = useFetcher();
  const { animationComplete, setAnimationComplete, handleAnimationComplete } =
    useAnimationState();

  // Reset selection when new images are loaded
  useEffect(() => {
    setSelected(undefined);
    setAnimationComplete(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [image1, image2]);

  const handleSelect = (option: string) => {
    setSelected(option);
    setAnimationComplete(false);
  };

  // Handle submission after animation completes and delay
  useEffect(() => {
    if (selected && animationComplete) {
      timerRef.current = setTimeout(() => {
        fetcher.submit({ selected }, { method: "post" });
      }, 500); // 500ms delay after animation is complete

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [selected, animationComplete]);

  return { selected, handleSelect, handleAnimationComplete };
}
