import { useMemo, useRef, useState } from "react"
import Reveal from "../Reveal"
import { Play } from "lucide-react"

type VideoItem = {
  title: string
  youtubeId: string
}

export default function VideosCarousel({ items }: { items: VideoItem[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState<VideoItem | null>(null)

  const canScroll = useMemo(() => items.length > 1, [items.length])

  const scrollByCards = (dir: -1 | 1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-card]")
    const w = card?.offsetWidth ?? 420
    el.scrollBy({ left: dir * (w + 16), behavior: "smooth" })
  }

  const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

  return (
    <section className="space-y-4">
      <Reveal>
        <div className="flex flex-col items-center gap-2 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <div className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              Наши видео
            </div>
            <div className="mt-1 text-sm text-white/60">
              Обзоры, выкупы, доставка, реальные кейсы.
            </div>
          </div>

          {canScroll ? (
            <div className="mt-3 flex items-center gap-2 md:mt-0">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                aria-label="Назад"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                aria-label="Вперёд"
              >
                ›
              </button>
            </div>
          ) : null}
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div
          ref={trackRef}
          className="
            flex gap-4 overflow-x-auto pb-2
            [scrollbar-width:none] [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
            snap-x snap-mandatory
          "
        >
          {items.map((v) => (
            <button
              key={v.youtubeId}
              type="button"
              onClick={() => setOpen(v)}
              data-card
              className="
                group relative
                w-[320px] shrink-0 sm:w-[420px]
                overflow-hidden rounded-3xl
                border border-white/10 bg-white/5
                snap-start
                text-left
              "
            >
              <div className="aspect-video w-full overflow-hidden bg-black/30">
                <img
                  src={thumb(v.youtubeId)}
                  alt={v.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  draggable={false}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-black shadow-lg">
                    <Play className="h-5 w-5 translate-x-[1px]" />
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="text-sm font-semibold text-white">{v.title}</div>
                <div className="mt-1 text-xs text-white/55">Нажмите для просмотра</div>
              </div>
            </button>
          ))}
        </div>
      </Reveal>

      {/* модалка */}
      {open && (
        <div className="fixed inset-0 z-[9999] !m-0 flex items-center justify-center px-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setOpen(null)}
            aria-label="Закрыть"
          />

          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-white/90">{open.title}</div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/15"
              >
                Закрыть ✕
              </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_40px_140px_rgba(0,0,0,0.8)]">
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${open.youtubeId}?autoplay=1&rel=0`}
                  title={open.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
