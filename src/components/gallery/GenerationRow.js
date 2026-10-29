import { memo } from "react";
import ImageCard from "./ImageCard";
import PromptCard from "./PromptCard";

function GenerationRow({ generation, onOpenImage, onReuse, isFirst }) {
  return (
    <article className="flex flex-col gap-3 xl:flex-row xl:gap-4">
      <PromptCard generation={generation} onReuse={onReuse} />

      <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-4 xl:gap-4">
        {generation.images.map((image, index) => (
          <ImageCard
            key={image.id}
            image={image}
            ratio={generation.ratio}
            priority={isFirst}
            onOpen={() => onOpenImage(generation.images, index)}
          />
        ))}
      </div>
    </article>
  );
}

export default memo(GenerationRow);
