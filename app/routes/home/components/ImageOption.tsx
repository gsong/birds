import { useEffect, useRef } from "react";

interface ImageOptionProps {
  src: string;
  alt: string;
  isSelected: boolean;
  onSelect: () => void;
  onAnimationComplete: () => void;
  exitAnimation?: boolean;
  position: "left" | "right";
}

export function ImageOption({
  src,
  alt,
  isSelected,
  onSelect,
  onAnimationComplete,
  exitAnimation = false,
  position,
}: ImageOptionProps) {
  // Determine which animation class to apply
  const animationClass = exitAnimation
    ? "image-exit"
    : isSelected
      ? "image-selected"
      : "image-enter";

  // Add position class for slide direction
  const positionClass = `image-${position}`;

  return (
    <div
      onAnimationEnd={() => isSelected && onAnimationComplete()}
      className={`w-1/3 ${animationClass} ${positionClass}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto cursor-pointer rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
        onClick={onSelect}
      />
    </div>
  );
}
