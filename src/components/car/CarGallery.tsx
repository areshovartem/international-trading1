import { useMemo, useState } from "react"

export default function CarGallery({ images }: { images: string[] }) {
  const safe = useMemo(() => images?.filter(Boolean) ?? [], [images])
  const [active, setActive] = useState(0)

  const main = safe[active] ?? safe[0]

  if (!safe.length) return null

  return (
    <div className="space-y-4">
      {/* BIG */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <img
          src={main}
          alt="Фото авто"
          className="h-[420px] w-full object-cover md:h-[520px]"
        />
      </div>

      {/* THUMBS */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {safe.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            className={[
              "shrink-0 overflow-hidden rounded-2xl border transition",
              i === active
                ? "border-brand-blue ring-2 ring-brand-blue/30"
                : "border-white/10 hover:border-white/25",
            ].join(" ")}
          >
            <img
              src={src}
              alt={`Фото ${i + 1}`}
              className="h-20 w-28 object-cover md:h-24 md:w-36"
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
