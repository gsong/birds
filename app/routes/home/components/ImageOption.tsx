interface ImageOptionProps {
  src: string;
  alt: string;
  onSelect: () => void;
}

export function ImageOption({ src, alt, onSelect }: ImageOptionProps) {
  return (
    <div className="w-1/3">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto cursor-pointer rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
        onClick={onSelect}
      />
    </div>
  );
}
