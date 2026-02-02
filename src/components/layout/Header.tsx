import { NavLink } from "react-router-dom"
import { PhoneCall, Send, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

import logo from "../../assets/logo.png"

const linkBase =
  "text-sm font-medium tracking-wide transition-colors hover:text-brand-light/90"
const linkActive = "text-brand-light"

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null)
  const [h, setH] = useState(0)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  // высота хэдера -> для spacer
  useLayoutEffect(() => {
    const el = headerRef.current
    if (!el) return

    const update = () => setH(el.getBoundingClientRect().height)
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])


  {/* deploy refresh */}
  // прогресс скролла
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop
      const scrollHeight = doc.scrollHeight - doc.clientHeight
      const p = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      setProgress(p)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Esc + lock scroll
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)

    const prev = document.body.style.overflow
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = prev || ""

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = prev
    }
  }, [open])

  const nav = [
    { to: "/", label: "Главная" },
    { to: "/catalog", label: "Каталог" },
    { to: "/contacts", label: "Контакты" },
    { to: "/about", label: "О компании" },
    { to: "/calculator", label: "Калькулятор" },
  ]

  return (
    <>
      {/* ✅ spacer чтобы контент НЕ залезал под fixed header */}
      <div style={{ height: h }} />

      <motion.header
        ref={headerRef}
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.05,
        }}
        style={{ willChange: "transform" }}
        className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-brand-dark/70 backdrop-blur"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:py-4">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl transition hover:opacity-90"
          >
            <img
              src={logo}
              alt="International Trading"
              className="h-12 w-12 object-contain lg:h-16 lg:w-16"
              draggable={false}
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
                INTERNATIONAL
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                TRADING
              </div>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : "text-white/75"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-3">
            <a
              href="tel:+79181606585"
              className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/90 transition hover:bg-white/10 lg:flex xl:px-4 xl:py-2 xl:text-sm xl:rounded-xl"
            >
              <PhoneCall size={16} />
              +7 (918) 160-65-85
            </a>

            <a
              href="https://t.me/International_trading_rus"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-gradient-to-r from-brand-blue to-brand-accent px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-brand-accent/20 transition hover:opacity-95 lg:inline-flex xl:px-4 xl:py-2 xl:text-sm xl:rounded-xl"
            >
              <Send size={16} />
              Telegram
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/90 transition hover:bg-white/10 lg:hidden"
              aria-label="Открыть меню"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {/* ✅ progress bar */}
        <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-white/10">
          <div
            className="h-full origin-left bg-brand-accent"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </motion.header>

      {/* MOBILE MENU (как у тебя) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Закрыть меню"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed inset-x-3 top-3 z-[70] rounded-3xl border border-white/10 bg-brand-dark/95 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.7)] backdrop-blur"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white/90">Меню</div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/90 hover:bg-white/10"
                  aria-label="Закрыть"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-4 grid gap-2 text-center">
                {nav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      [
                        "rounded-xl border px-4 py-3 text-sm font-semibold transition",
                        isActive
                          ? "border-brand-accent/40 bg-white/10 text-white"
                          : "border-white/10 bg-white/5 text-white/90 hover:bg-white/10",
                      ].join(" ")
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-4 grid gap-2 text-center">
                <a
                  href="tel:+79181606585"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90"
                >
                  <PhoneCall size={16} />
                  +7 (918) 160-65-85
                </a>

                <a
                  href="https://t.me/International_trading_rus"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-accent/20 transition hover:opacity-95"
                >
                  <Send size={16} />
                  Telegram
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
