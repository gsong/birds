import type { Route } from "./+types/home";

import { useState, useEffect, useRef } from "react";
import { redirect, useFetcher } from "react-router";
import { motion, AnimatePresence } from "motion/react";

export const loader = async () => {
  const maxId = 500;
  const randomInt1 = Math.floor(Math.random() * maxId) + 1;
  const randomInt2 = Math.floor(Math.random() * maxId) + 1;

  return [
    `https://picsum.photos/id/${randomInt1}/800`,
    `https://picsum.photos/id/${randomInt2}/800`,
  ];
};

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const selectedImage = formData.get("selected");
  console.log("Selected image:", selectedImage);
  return undefined;
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const [image1, image2] = loaderData;
  const { selected, handleSelect, handleAnimationComplete } = useImageSelection(
    image1,
    image2,
  );

  return (
    <div className="flex justify-around items-center h-screen bg-gray-100">
      <AnimatePresence>
        {(!selected || selected === "image1") && (
          <motion.div
            key={image1}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.2 }, x: { duration: 0.5 } }}
            onLayoutAnimationComplete={() => {
              if (selected === "image1") {
                handleAnimationComplete();
              }
            }}
            className="w-1/3"
          >
            <img
              src={image1}
              alt="Option 1"
              className="w-full h-auto cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow"
              onClick={() => handleSelect("image1")}
            />
          </motion.div>
        )}
        {(!selected || selected === "image2") && (
          <motion.div
            key={image2}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.2 }, x: { duration: 0.5 } }}
            onLayoutAnimationComplete={() => {
              if (selected === "image2") {
                handleAnimationComplete();
              }
            }}
            className="w-1/3"
          >
            <img
              src={image2}
              alt="Option 2"
              className="w-full h-auto cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow"
              onClick={() => handleSelect("image2")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function useImageSelection(image1: string, image2: string) {
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
  }, [selected, animationComplete, fetcher]);

  return { selected, handleSelect, handleAnimationComplete };
}

function useAnimationState() {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return { animationComplete, handleAnimationComplete, setAnimationComplete };
}
