// src/components/catalog/CarListItem.tsx
import { Link } from "react-router-dom"
import type { Car } from "../../data/cars"
import { useMemo, useState } from "react"

function HoverPreview({ images, alt }: { images: string[]; alt: string }) {
  const imgs = useMemo(() => (images ?? []).filter(Boolean).slice(0, 5), [images])
  const [idx, setIdx] = useState(0)

  const current = imgs[idx] ?? imgs[0]

return (
  <div
    className="absolute inset-0"
    onMouseLeave={() => setIdx(0)}
  >
    <img
      src={current}
      alt={alt}
      className="h-full w-full object-cover"
      draggable={false}
    />

      {/* зоны наведения только на md+, чтобы мобилка не ломалась */}
      {imgs.length > 1 ? (
        <div
          className="absolute inset-0 hidden md:grid"
          style={{ gridTemplateColumns: `repeat(${imgs.length}, 1fr)` }}
        >
          {imgs.map((_, i) => (
            <div key={i} onMouseEnter={() => setIdx(i)} className="h-full" />
          ))}
        </div>
      ) : null}

      {/* тонкие индикаторы снизу */}
      {imgs.length > 1 ? (
        <div className="absolute inset-x-3 bottom-3 hidden md:flex gap-1.5">
          {imgs.map((_, i) => (
            <div
              key={i}
              className={[
                "h-[2px] flex-1 rounded-full",
                i === idx ? "bg-white/80" : "bg-white/25",
              ].join(" ")}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}


function fmt(n: number) {
  return n.toLocaleString("ru-RU")
}


export function CarListItem({ car }: { car: Car }) {

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition hover:border-white/20">
      <div className="grid gap-4 md:grid-cols-[260px_1fr]">
        {/* left: image */}
{/* left: image */}
<div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 aspect-[16/10]">
  <HoverPreview images={car.images ?? []} alt={car.title} />
</div>


        {/* right: content */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-lg font-extrabold text-white">
                {car.brand ? `${car.brand} ` : ""}
                {car.model ? car.model : car.title}
              </div>

              <div className="mt-1 text-sm text-white/60">
                {car.generation ? <span>{car.generation} • </span> : null}
                <span>{car.body ?? "—"}</span>
                {" • "}
                <span>{car.transmission ?? "—"}</span>
                {" • "}
                <span>{car.fuel ?? "—"}</span>
                {" • "}
                <span>{car.drive ?? "—"}</span>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/80">
                  {car.country}
                </span>
                {car.subtitle ? (
                  <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/80">
                    {car.subtitle}
                  </span>
                ) : null}
                {car.condition ? (
                  <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/80">
                    {car.condition}
                  </span>
                ) : null}
              </div>
            </div>

            {/* price (слева) */}
            <div className="text-left">
              <div className="text-xs text-white/50">Под ключ в РФ</div>
              <div className="mt-1 flex min-w-[200px] justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-emerald-400/20 to-emerald-400/5 px-7 py-3 text-lg font-extrabold text-white">
  {fmt(car.priceRub)} ₽
</div>


              <div className="mt-2 text-xs text-white/60">
                {car.year} • {fmt(car.mileageKm)} км
                {car.deliveryDays ? <> • доставка {car.deliveryDays} дн.</> : null}
              </div>
            </div>
          </div>

          {/* actions */}
          <div className="mt-auto grid grid-cols-1 items-end gap-3 md:grid-cols-[1fr_auto]">
            <div className="text-xs text-white/60 line-clamp-2">
              {car.note ? car.note : "Актуальность уточняйте у менеджера."}
            </div>

            {/* кнопки справа */}
            <div className="justify-self-start md:justify-self-end flex items-center gap-3">
  {/* Подробнее */}
  <Link
    to={`/catalog/${car.id}`}
    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-accent/20 transition hover:opacity-95"
  >
    Подробнее <span aria-hidden>→</span>
  </Link>

  {/* Telegram */}
  <a
    href="https://t.me/avazhunchoo" // 👈 свой username
    target="_blank"
    rel="noreferrer"
    aria-label="Telegram"
    title="Telegram"
    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/90 transition hover:bg-white/10 [-webkit-tap-highlight-color:transparent]"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.993 15.674 9.82 20.2c.53 0 .76-.228 1.04-.503l2.496-2.382 5.175 3.787c.949.523 1.62.248 1.856-.873L23.9 4.84c.29-1.36-.515-1.894-1.44-1.55L2.61 10.97c-1.342.522-1.322 1.27-.244 1.604l5.07 1.58 11.77-7.43c.555-.367 1.06-.164.644.203L9.993 15.674Z" />
    </svg>
  </a>

  {/* Позвонить */}
  <a
    href="tel:+79181606585" // 👈 номер
    aria-label="Позвонить"
    title="Позвонить"
    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/90 transition hover:bg-white/10 [-webkit-tap-highlight-color:transparent]"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2Z" />
    </svg>
  </a>
</div>

          </div>
        </div>
      </div>
    </div>
  )
}
