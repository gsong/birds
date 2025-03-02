import { useState, useEffect } from "react";
import { useFetcher } from "react-router";

export function useImageSelection(image1: string, image2: string) {
  const [selected, setSelected] = useState<string>();
  const fetcher = useFetcher();

  // Reset selection when new images are loaded
  useEffect(() => {
    setSelected(undefined);
  }, [image1, image2]);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  useEffect(() => {
    if (selected) {
      fetcher.submit({ selected }, { method: "post" });
    }
  }, [selected]);

  return { selected, handleSelect };
}
