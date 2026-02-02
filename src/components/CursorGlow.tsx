import { useEffect, useRef } from "react"

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null)

  const target = useRef({ x: 0, y: 0 })   // куда надо
  const current = useRef({ x: 0, y: 0 })  // где сейчас
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const speed = 0.12 // ← ВАЖНО: плавность (0.06–0.15 идеально)

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * speed
      current.current.y += (target.current.y - current.current.y) * speed

      el.style.transform = `translate3d(
        ${current.current.x - 160}px,
        ${current.current.y - 160}px,
        0
      )`

      raf.current = requestAnimationFrame(animate)
    }

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY

      if (!raf.current) {
        raf.current = requestAnimationFrame(animate)
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[320px] w-[320px] rounded-full blur-3xl"
      style={{
        opacity: 0.55,
        background:
          "radial-gradient(circle at center, rgba(96,165,250,0.35) 0%, rgba(34,211,238,0.18) 35%, rgba(0,0,0,0) 70%)",
      }}
    />
  )
}
