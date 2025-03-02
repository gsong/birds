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
  // Determine which animation class to apply based on state and position
  const animationClass = exitAnimation
    ? "animate-fadeOut opacity-0 transition-opacity duration-200"
    : isSelected
      ? position === "left"
        ? "animate-slide-left-to-center"
        : "animate-slide-right-to-center"
      : "animate-fadeIn opacity-100 transition-opacity duration-200";

  return (
    <div
      onAnimationEnd={() => isSelected && onAnimationComplete()}
      className={`w-1/3 ${animationClass}`}
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
