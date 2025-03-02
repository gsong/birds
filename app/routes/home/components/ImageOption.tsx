import { motion } from "motion/react";

interface ImageOptionProps {
  src: string;
  alt: string;
  isSelected: boolean;
  onSelect: () => void;
  onAnimationComplete: () => void;
}

export function ImageOption({
  src,
  alt,
  isSelected,
  onSelect,
  onAnimationComplete,
}: ImageOptionProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ opacity: { duration: 0.2 }, x: { duration: 0.5 } }}
      onLayoutAnimationComplete={() => isSelected && onAnimationComplete()}
      className="w-1/3"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto cursor-pointer rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
        onClick={onSelect}
      />
    </motion.div>
  );
}
