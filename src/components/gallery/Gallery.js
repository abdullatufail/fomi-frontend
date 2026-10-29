import { Sparkles } from "lucide-react";
import GenerationRow from "./GenerationRow";
import LoadingRow from "./LoadingRow";

function EmptyGallery() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line px-6 py-24 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-blush text-clay">
        <Sparkles size={22} />
      </span>
      <h2 className="mt-4 text-base font-semibold">Nothing here yet</h2>
      <p className="mt-1 max-w-xs text-sm text-muted">Describe an idea on the left and your generations will show up here.</p>
    </div>
  );
}

export default function Gallery({ generations, pendingRequest, onOpenImage, onReuse }) {
  if (!generations.length && !pendingRequest) {
    return <EmptyGallery />;
  }

  return (
    <div className="flex flex-col gap-6 xl:gap-6">
      {pendingRequest && <LoadingRow request={pendingRequest} />}

      {generations.map((generation, index) => (
        <GenerationRow key={generation.id} generation={generation} onOpenImage={onOpenImage} onReuse={onReuse} isFirst={index === 0} />
      ))}
    </div>
  );
}
