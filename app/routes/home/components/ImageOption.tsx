import clsx from "clsx";

interface ImageOptionProps {
  src: string;
  alt: string;
  onSelect: () => void;
  position: "left" | "right" | "center";
  selected?: boolean;
  isSelectedImage?: boolean;
  direction?: "left" | "right";
  animationPhase: "idle" | "sliding" | "paused" | "transitioning";
}

export function ImageOption({
  src,
  alt,
  onSelect,
  position,
  selected = false,
  isSelectedImage = false,
  direction = "left",
  animationPhase,
}: ImageOptionProps) {
  return (
    <div
      className={clsx(
        "transition-all",
        position === "center" ? "w-1/3" : "w-1/3",
        // Initial state
        animationPhase === "idle" && "transform-none opacity-100",

        // Sliding animation
        animationPhase === "sliding" && [
          "duration-500",
          // Move selected image in the opposite direction of click
          isSelectedImage && direction === "left" && "translate-x-1/3",
          isSelectedImage && direction === "right" && "-translate-x-1/3",
          // Fade out non-selected image
          !isSelectedImage && selected && "opacity-0 duration-200",
        ],

        // Center stage
        animationPhase === "paused" &&
          isSelectedImage &&
          "transform-none scale-110",

        // Transition to new images
        animationPhase === "transitioning" && "opacity-0 duration-200",
      )}
    >
      <img
        src={src}
        alt={alt}
        className={clsx(
          "w-full h-auto rounded-lg shadow-md",
          animationPhase === "idle" &&
            "cursor-pointer hover:shadow-lg hover:scale-105 transition-all",
        )}
        onClick={animationPhase === "idle" ? onSelect : undefined}
      />
    </div>
  );
}
