import type { Route } from "./+types/index";

import { ImageOption } from "./components/ImageOption";
import { useImageSelection } from "./hooks/useImageSelection";

import "./styles.css";

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
  const { selected, handleSelect, handleAnimationComplete } = useImageSelection(
    image1,
    image2,
  );

  return (
    <div className="h-screen bg-gray-100">
      <div className="flex justify-around items-center w-full h-full">
        {(!selected || selected === "image1") && (
          <ImageOption
            key={image1}
            src={image1}
            alt="Option 1"
            isSelected={selected === "image1"}
            onSelect={() => handleSelect("image1")}
            onAnimationComplete={handleAnimationComplete}
            exitAnimation={selected ? selected !== "image1" : false}
            position="left"
          />
        )}
        {(!selected || selected === "image2") && (
          <ImageOption
            key={image2}
            src={image2}
            alt="Option 2"
            isSelected={selected === "image2"}
            onSelect={() => handleSelect("image2")}
            onAnimationComplete={handleAnimationComplete}
            exitAnimation={selected ? selected !== "image2" : false}
            position="right"
          />
        )}
      </div>
    </div>
  );
}
