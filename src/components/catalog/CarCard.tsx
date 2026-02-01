import { Link } from "react-router-dom"
import type { Car } from "../../data/cars"

export function CarCard({ car }: { car: Car }) {
  const img = car.images?.[0]

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-white/20">
      {/* IMAGE — фикс пропорции, не “вытягивает” */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {img ? (
          <img src={img} alt={car.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-white/5" />
        )}

        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
            {car.country}
          </span>
          {car.subtitle ? (
            <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
              {car.subtitle}
            </span>
          ) : null}
        </div>
      </div>

      {/* CONTENT — flex, чтобы низ был ровный */}
      <div className="flex flex-col p-5">
        <div className="text-base font-bold leading-snug text-white line-clamp-2 min-h-[44px]">
          {car.title}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">
            Год: <b className="text-white">{car.year}</b>
          </span>
          <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">
            Пробег:{" "}
            <b className="text-white">{car.mileageKm.toLocaleString("ru-RU")} км</b>
          </span>
        </div>

        <div className="mt-4">
          <div className="text-[11px] text-white/50">Под ключ в РФ</div>
          <div className="mt-1 text-lg font-extrabold text-white">
            {car.priceRub.toLocaleString("ru-RU")} ₽
          </div>

          <Link
            to={`/catalog/${car.id}`}
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-brand-blue to-brand-accent px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-accent/20 transition hover:opacity-95"
          >
            Подробнее →
          </Link>
        </div>

        {/* ОДИНАКОВАЯ высота под доставку */}
        <div className="mt-3 min-h-[18px] text-xs text-white/60">
          {car.deliveryDays ? (
            <>
              Доставка: <span className="text-white">{car.deliveryDays} дней</span>
            </>
          ) : (
            <span className="opacity-0">placeholder</span>
          )}
        </div>
      </div>
    </div>
  )
}
