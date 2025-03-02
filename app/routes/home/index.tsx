import type { Route } from "./+types/index";

import { ImageOption } from "./components/ImageOption";
import { useImageSelection } from "./hooks/useImageSelection";

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
  const { selected, handleSelect } = useImageSelection(image1, image2);

  return (
    <div className="h-screen bg-gray-100">
      <div className="flex justify-around items-center w-full h-full">
        <ImageOption
          src={image1}
          alt="Option 1"
          onSelect={() => handleSelect("image1")}
        />

        <ImageOption
          src={image2}
          alt="Option 2"
          onSelect={() => handleSelect("image2")}
        />
      </div>
    </div>
  );
}
