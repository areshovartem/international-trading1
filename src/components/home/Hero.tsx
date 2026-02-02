import { Link } from "react-router-dom"
import { useEffect, useMemo, useRef, useState } from "react"
import type { PointerEvent } from "react"

import Reveal from "../Reveal" // ⚠️ путь проверь
import { Stagger, StaggerItem } from "../Stagger" // ⚠️ путь проверь

import { cars } from "../../data/cars" // ⚠️ путь проверь
import carsImg from "../../assets/cars.png"
import carCardImg from "../../assets/porsche.jpg"
import promoVideo from "../../assets/video/promo.mp4"


import { Play } from "lucide-react"



function fmt(n: number) {
  try {
    return n.toLocaleString("ru-RU")
  } catch {
    return String(n)
  }
}

const heroBtn =
  "inline-flex items-center justify-center gap-2 \
   h-11 sm:h-14 \
   w-[240px] max-w-full sm:w-[260px] \
   rounded-xl \
   px-6 \
   text-sm font-semibold \
   whitespace-nowrap \
   transition"




export default function Hero() {
  const [openVideo, setOpenVideo] = useState(false)
  

  useEffect(() => {
    if (!openVideo) return

    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenVideo(false)
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [openVideo])

  // ✅ популярные авто — первые 6 из списка
  const popular = useMemo(() => cars.slice(0, 6), [])

  return (
    <section className="space-y-10">
      {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl">
          
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mt-[10px] text-4xl font-extrabold tracking-tight md:mt-0 md:text-6xl">
  <span className="block text-white">ДОСТАВКА АВТО</span>


              <span className="mt-2 block text-3xl md:text-5xl font-semibold text-brand-blue/100">
                ИЗ КОРЕИ И КИТАЯ
              </span>
            </h1>

            <p
            className="
              mx-auto mt-4 max-w-[34rem]
              text-sm text-white/70 leading-relaxed
              whitespace-normal break-words
            "
          >
Подбор • Проверка • Выкуп • Логистика • Оформление&nbsp;—&nbsp;под&nbsp;ключ&nbsp;до&nbsp;РФ
          </p>


<div className="mt-8 mx-auto grid w-full max-w-[520px] grid-cols-1 gap-3 justify-items-center
 sm:grid-cols-2 sm:gap-4">
 <Link
  to="/catalog"
  className={`${heroBtn} border border-white/15 bg-white/10 text-white/90 backdrop-blur hover:bg-white/15`}

>
  Выбрать авто
</Link>


<button
  type="button"
  onClick={() => setOpenVideo(true)}
  className={`${heroBtn}
    border border-white/20
    bg-white/10
    text-white
    hover:bg-white/15
  `}
>
  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shrink-0">
    <Play className="h-3 w-3 text-black translate-x-[1px]" />
  </span>

  Посмотрите наше видео
</button>



            </div>
          </div>
        </Reveal>
        

<Reveal delay={0.12} y={24}>
  <div className="mx-auto mt-10 max-w-5xl">
    <div className="rounded-3xl">
      <img
        src={carsImg}
        alt="Автомобили"
        className="
          mx-auto
          w-full
          h-auto
          object-contain
          select-none
          max-h-[230px]
          sm:max-h-[330px]
          md:max-h-[430px]
          lg:max-h-[470px]
        "
        draggable={false}
      />
    </div>
  </div>
</Reveal>



      </div>

      {/* 20+ / FORM */}
      <div className="grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.6fr]">
        <Reveal>
          <div
            className="
              relative h-full overflow-hidden
              rounded-3xl border border-white/10
              bg-white/5 p-7
              text-white backdrop-blur
              text-center lg:text-left
            "
          >
            <div className="text-sm text-slate-600">
              Найдём, проверим, выкупим, доставим и оформим авто за
            </div>

            <div className="mt-4 text-6xl font-extrabold tracking-tight text-[#3B82F6]">
              35
            </div>
            <div className="text-2xl font-extrabold">дней</div>

            <div className="mt-4 text-sm text-slate-600">
              Средний срок до получения авто (зависит от модели и логистики)
            </div>

            <div className="mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
              <img
                src={carCardImg}
                alt="Автомобиль"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          </div>
        </Reveal>

        

        <Reveal delay={0.08}>
<div
  className="
    rounded-3xl border border-white/10
    bg-white/5
    p-5 sm:p-8
    text-white backdrop-blur
    text-center lg:text-left
  "
>
          <div
            className="
              text-center lg:text-left
              text-2xl sm:text-3xl
              font-extrabold
              leading-snug
            "
          >
              Хотите узнать как за{" "}
              <span className="font-extrabold text-[#3B82F6]">3 недели</span>{" "}
              получить автомобиль вашей мечты!
            </div>

            <form className="mt-8 grid gap-4 md:grid-cols-3">
              <Input placeholder="Имя" />
              <Input placeholder="Телефон" />
              <Input placeholder="E-mail" />

              <div className="md:col-span-2">
                <Input placeholder="Марка / модель" />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 transition hover:bg-brand-accent"
              >
                Узнать
              </button>
            </form>

            <div className="mt-4 text-xs text-slate-500">
              Нажимая кнопку «Отправить», Вы подтверждаете своё согласие с политикой
              конфиденциальности.
            </div>
          </div>
        </Reveal>
      </div>

      {/* ✅ POPULAR (оставили) */}
      <Reveal>
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-3 sm:p-6 md:p-8">
<div className="flex flex-col items-center text-center gap-3 md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                Популярные авто
              </h2>
              <p className="mt-2 text-sm text-white/60">
                Несколько актуальных вариантов — полный список в каталоге.
              </p>
            </div>

<Link
  to="/catalog"
  className={`${heroBtn} border border-white/15 bg-white/10 text-white/90 backdrop-blur hover:bg-white/15`}

>
  В каталог →
</Link>

          </div>

<Stagger className="mt-6 grid w-full min-w-0 gap-4 md:grid-cols-3" delay={0.05}>
            {popular.map((c) => (
              <StaggerItem key={c.id}>
                <Link
  to={`/catalog/${c.id}`}
  className="group block w-full min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-black/20 transition hover:bg-white/5"
>

                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={c.images?.[0]}
                      alt={c.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      draggable={false}
                    />
                  </div>

                  <div className="p-5">
                    <div className="text-sm font-semibold text-white">{c.title}</div>
                    <div className="mt-1 text-xs text-white/55">
                      {c.country} • {c.year} • {fmt(c.mileageKm)} км
                    </div>

                   <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-2">
  <div className="text-base font-extrabold text-white tabular-nums whitespace-nowrap">
    {fmt(c.priceRub)}&nbsp;₽
  </div>

  <div className="justify-self-end rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 whitespace-nowrap">
    Подробнее&nbsp;→
  </div>
</div>

                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Reveal>

      {/* VIDEO MODAL */}
      {openVideo && (
        <div className="fixed inset-0 z-[9999] !m-0 !mt-0 flex items-center justify-center px-4 pt-0 pb-6">
          <button
            type="button"
            aria-label="Закрыть видео"
            onClick={() => setOpenVideo(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-white/90">
                Видео • International Trading
              </div>

              <button
                type="button"
                onClick={() => setOpenVideo(false)}
                className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/15"
              >
                Закрыть ✕
              </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_40px_140px_rgba(0,0,0,0.8)]">
              <PrettyVideo src={promoVideo} />

            </div>

            <div className="mt-3 text-xs text-white/50">
              Нажмите <b>Esc</b> или кликните по фону, чтобы закрыть.
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Input({ placeholder }: { placeholder: string }) {
  return (
    <input
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-brand-blue"
    />
  )
}

/* ------- твой видеоплеер ниже без изменений ------- */

function PrettyVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.9)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)
  const [bufferedEnd, setBufferedEnd] = useState(0)
  const [dragging, setDragging] = useState(false)

  const fmtT = (t: number) => {
    if (!Number.isFinite(t) || t <= 0) return "0:00"
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${String(s).padStart(2, "0")}`
  }

  const progress = duration ? (current / duration) * 100 : 0
  const buff = duration ? (bufferedEnd / duration) * 100 : 0

  const togglePlay = async () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      try {
        await v.play()
      } catch {}
    } else {
      v.pause()
    }
  }

  const seekToPct = (pct: number) => {
    const v = videoRef.current
    if (!v || !duration) return
    const p = Math.min(1, Math.max(0, pct))
    v.currentTime = p * duration
  }

  const onBarPointer = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = rect.width ? x / rect.width : 0
    seekToPct(pct)
  }

  const toggleFull = async () => {
    const el = wrapRef.current
    if (!el) return
    const doc = document as any
    if (!doc.fullscreenElement) {
      try {
        await el.requestFullscreen()
      } catch {}
    } else {
      try {
        await doc.exitFullscreen()
      } catch {}
    }
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const onLoaded = () => {
      setDuration(v.duration || 0)
      setReady(true)
    }
    const onTime = () => {
      if (!dragging) setCurrent(v.currentTime || 0)
      try {
        const b = v.buffered
        if (b && b.length) setBufferedEnd(b.end(b.length - 1))
      } catch {}
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)

    v.addEventListener("loadedmetadata", onLoaded)
    v.addEventListener("timeupdate", onTime)
    v.addEventListener("progress", onTime)
    v.addEventListener("play", onPlay)
    v.addEventListener("pause", onPause)

    setMuted(v.muted)
    setPlaying(!v.paused)

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded)
      v.removeEventListener("timeupdate", onTime)
      v.removeEventListener("progress", onTime)
      v.removeEventListener("play", onPlay)
      v.removeEventListener("pause", onPause)
    }
  }, [dragging])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.volume = Math.min(1, Math.max(0, volume))
  }, [volume])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = muted
  }, [muted])

  return (
    <div ref={wrapRef} className="relative aspect-video w-full bg-black">
      <video
        ref={videoRef}
        src={src}
        className="h-full w-full"
        playsInline
        autoPlay
        onClick={togglePlay}
      />

      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 grid place-items-center"
          aria-label="Play"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-black shadow-lg">
            ▶
          </span>
        </button>
      )}

      <div className="absolute inset-x-0 bottom-0 p-3">
        <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md">
          <div
            className="relative h-2 cursor-pointer"
            onPointerDown={(e) => {
              setDragging(true)
              ;(e.currentTarget as any).setPointerCapture?.(e.pointerId)
              onBarPointer(e)
            }}
            onPointerMove={(e) => {
              if (!dragging) return
              onBarPointer(e)
            }}
            onPointerUp={() => setDragging(false)}
          >
            <div className="absolute inset-0 rounded-2xl bg-white/10" />
            <div
              className="absolute left-0 top-0 h-2 rounded-2xl bg-white/20"
              style={{ width: `${buff}%` }}
            />
            <div
              className="absolute left-0 top-0 h-2 rounded-2xl bg-white/70"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-3 px-3 py-2 text-white">
            <button
              type="button"
              onClick={togglePlay}
              className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 hover:bg-white/15"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? "⏸" : "▶"}
            </button>

            <div className="text-xs tabular-nums text-white/80">
              {fmtT(current)} <span className="text-white/40">/</span>{" "}
              {ready ? fmtT(duration) : "—:—"}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 hover:bg-white/15"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted || volume === 0 ? "🔇" : "🔊"}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  const v = Number(e.target.value)
                  setVolume(v)
                  if (v > 0) setMuted(false)
                }}
                className="w-24 accent-white"
              />

              <button
                type="button"
                onClick={toggleFull}
                className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 hover:bg-white/15"
                aria-label="Fullscreen"
              >
                ⛶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlayIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="translate-x-[1px]"
      aria-hidden="true"
    >
      <path
        d="M8 5L19 12L8 19V5Z"
        stroke="black"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
