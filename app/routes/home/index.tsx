import type { Route } from "./+types/index";
import { useEffect, useState } from "react";
import { ImageOption } from "./components/ImageOption";
import { useImageSelection } from "./hooks/useImageSelection";
import clsx from "clsx";

export const loader = async () => {
  const maxId = 200;
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
  const { selected, handleSelect, direction, animationPhase } =
    useImageSelection(image1, image2);
  const [centerImage, setCenterImage] = useState<string | null>(null);

  // When an image is selected and we're in the paused phase, show it in the center
  useEffect(() => {
    if (animationPhase === "paused" && selected) {
      setCenterImage(selected === "image1" ? image1 : image2);
    } else if (animationPhase === "idle") {
      setCenterImage(null);
    }
  }, [animationPhase, selected, image1, image2]);

  return (
    <div className="h-screen bg-gray-100">
      <div
        className={clsx(
          "flex justify-around items-center w-full h-full",
          animationPhase === "paused" && "justify-center",
        )}
      >
        {animationPhase === "paused" && centerImage ? (
          <ImageOption
            key={centerImage}
            src={centerImage}
            alt="Selected Image"
            onSelect={() => {}}
            position="center"
            animationPhase={animationPhase}
            isSelectedImage={true}
          />
        ) : (
          <>
            <ImageOption
              key={image1}
              src={image1}
              alt="Option 1"
              onSelect={() => handleSelect("image1", "left")}
              position="left"
              selected={!!selected}
              isSelectedImage={selected === "image1"}
              direction={direction}
              animationPhase={animationPhase}
            />

            <ImageOption
              key={image2}
              src={image2}
              alt="Option 2"
              onSelect={() => handleSelect("image2", "right")}
              position="right"
              selected={!!selected}
              isSelectedImage={selected === "image2"}
              direction={direction}
              animationPhase={animationPhase}
            />
          </>
        )}
      </div>
    </div>
  );
}
