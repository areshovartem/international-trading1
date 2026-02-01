// src/pages/CarPage.tsx
import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { cars } from "../data/cars"

function fmt(n: number) {
  return n.toLocaleString("ru-RU")
}

export default function CarPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const car = useMemo(() => {
    const num = Number(id)
    return cars.find((c) => c.id === num)
  }, [id])

  const [active, setActive] = useState(0)

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === "Escape") setLightboxOpen(false)
      if (e.key === "ArrowRight") setLightboxIndex((i) => Math.min(i + 1, (car?.images.length ?? 1) - 1))
      if (e.key === "ArrowLeft") setLightboxIndex((i) => Math.max(i - 1, 0))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxOpen, car?.images.length])

  // simple form
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  if (!car) {
    return (
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-3 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white/70 sm:p-10">
          Авто не найдено.
          <div className="mt-4">
            <Link
              to="/catalog"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black"
            >
              Вернуться в каталог
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const images = car.images ?? []
  const mainSrc = images[active] ?? images[0]

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const subtitleChips = [
    car.subtitle,
    car.country === "Корея" ? "Корея" : car.country === "Китай" ? "Китай" : "Европа",
  ].filter(Boolean) as string[]

  return (
<section className="px-3 pb-10 pt-2 sm:px-4 lg:mx-auto lg:max-w-6xl lg:px-6">
      {/* Top row: back */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white/80 hover:bg-white/10"
        >
          ← Назад
        </button>

        <Link
          to="/catalog"
          className="hidden h-10 items-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white/70 hover:bg-white/10 sm:inline-flex"
        >
          В каталог
        </Link>
      </div>

<div
  className="
    rounded-2xl
    border border-white/10
    bg-white/[0.04]
    p-3
    sm:p-5
    lg:rounded-3xl
    max-sm:border-transparent
  "
>
        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.9fr] lg:gap-6">
          {/* LEFT: gallery */}
          <div>
            <button
              type="button"
              onClick={() => openLightbox(active)}
              className="group relative block w-full overflow-hidden rounded-3xl border border-white/10 bg-black/20"
              aria-label="Открыть фото на весь экран"
            >
              <img src={mainSrc} alt={car.title} className="aspect-[4/3] w-full object-cover" draggable={false} />

              {/* hint overlay */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute bottom-4 right-4 rounded-xl border border-white/20 bg-black/50 px-3 py-2 text-xs font-semibold text-white">
                  Нажмите, чтобы открыть
                </div>
              </div>
            </button>

            {/* thumbs */}
            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:grid-cols-5 sm:gap-3">
                {images.slice(0, 10).map((src, i) => {
                  const isActive = i === active
                  return (
                    <button
                      key={src + i}
                      type="button"
                      onClick={() => setActive(i)}
                      className={[
                        "overflow-hidden rounded-2xl border bg-white/5 transition",
                        isActive ? "border-white/40" : "border-white/10 hover:border-white/25",
                      ].join(" ")}
                      aria-label={`Фото ${i + 1}`}
                    >
                      <img src={src} alt="" className="aspect-[4/3] w-full object-cover" draggable={false} />
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* RIGHT: info + contacts + form */}
          <div className="text-white">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
<h1 className="text-[22px] font-extrabold tracking-tight sm:text-[28px]">{car.title}</h1>

              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                {subtitleChips.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 space-y-2 text-white/85 sm:mt-4">
              <Row label="Год" value={String(car.year)} />
              <Row label="Пробег" value={`${fmt(car.mileageKm)} км`} />
              <Row label="Под ключ в РФ" value={`${fmt(car.priceRub)} ₽`} strong />
              {typeof car.deliveryDays === "number" ? <Row label="Доставка до РФ" value={`${car.deliveryDays} дней`} /> : null}
            </div>

            {/* contacts */}
            {car.contacts?.length ? (
              <div className="mt-4 space-y-3 sm:mt-5">
                {car.contacts.map((c) => (
                  <div key={c.tg + c.phone} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-extrabold">{c.tg}</div>
                    <div className="mt-1 text-white/90">{c.phone}</div>
                    {c.label ? <div className="mt-2 text-xs text-white/50">{c.label}</div> : null}
                  </div>
                ))}
              </div>
            ) : null}

            {/* note */}
            {car.note ? (
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                {car.note}
              </div>
            ) : null}

            {/* form */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-extrabold text-white">Оставить заявку / Забронировать</div>
              <div className="mt-1 text-xs text-white/55">Мы свяжемся с вами и уточним детали по авто.</div>

              <form
                className="mt-4 grid gap-3"
                onSubmit={(e) => {
                  e.preventDefault()
                  alert(`Заявка отправлена!\nИмя: ${name}\nТелефон: ${phone}`)
                  setName("")
                  setPhone("")
                }}
              >
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Имя"
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none focus:border-brand-blue"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Телефон"
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none focus:border-brand-blue"
                />

                <button type="submit" className="h-11 rounded-xl bg-white px-5 text-sm font-extrabold text-black hover:opacity-95">
                  Отправить
                </button>

                <div className="text-[11px] text-white/45">Нажимая «Отправить», вы соглашаетесь с политикой конфиденциальности.</div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center px-4 py-6">
          <button
            type="button"
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={() => setLightboxOpen(false)}
            aria-label="Закрыть"
          />

          <div className="relative z-[1] w-full max-w-6xl">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-white/90">
                {car.title} • Фото {lightboxIndex + 1}/{images.length}
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/15"
              >
                Закрыть ✕
              </button>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_40px_140px_rgba(0,0,0,0.8)]">
              <img src={images[lightboxIndex]} alt="" className="max-h-[80vh] w-full object-contain" draggable={false} />

              {/* nav */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-between">
                <div className="pointer-events-auto p-3">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((i) => Math.max(i - 1, 0))}
                    disabled={lightboxIndex === 0}
                    className="h-11 w-11 rounded-full border border-white/15 bg-white/10 text-white/80 hover:bg-white/15 disabled:opacity-30"
                    aria-label="Предыдущее фото"
                  >
                    ‹
                  </button>
                </div>
                <div className="pointer-events-auto p-3">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((i) => Math.min(i + 1, images.length - 1))}
                    disabled={lightboxIndex === images.length - 1}
                    className="h-11 w-11 rounded-full border border-white/15 bg-white/10 text-white/80 hover:bg-white/15 disabled:opacity-30"
                    aria-label="Следующее фото"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>

            {/* thumbs inside lightbox */}
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className={[
                      "shrink-0 overflow-hidden rounded-xl border bg-white/5",
                      i === lightboxIndex ? "border-white/40" : "border-white/10 hover:border-white/25",
                    ].join(" ")}
                    aria-label={`Выбрать фото ${i + 1}`}
                  >
                    <img src={src} alt="" className="h-16 w-24 object-cover" draggable={false} />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-2 text-xs text-white/45">Esc — закрыть • ← → листать</div>
          </div>
        </div>
      )}
    </section>
  )
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-1">
      <div className="text-sm text-white/60">{label}:</div>

      <div
        className={[
          "text-right tabular-nums whitespace-nowrap",
          strong ? "text-base font-extrabold text-white" : "text-sm font-semibold text-white/90",
        ].join(" ")}
      >
        {value}
      </div>
    </div>
  )
}
