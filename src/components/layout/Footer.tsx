import { NavLink } from "react-router-dom"
import { PhoneCall, Send } from "lucide-react"
import logo from "../../assets/logo.png"

import Reveal from "../Reveal"
import { Stagger, StaggerItem } from "../Stagger"

const nav = [
  { to: "/", label: "Главная" },
  { to: "/catalog", label: "Каталог" },
  { to: "/contacts", label: "Контакты" },
  { to: "/about", label: "О компании" },
  { to: "/calculator", label: "Калькулятор" },
]

const btnH = "h-11"

const navBtnBase =
  `inline-flex ${btnH} w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/10 hover:text-white`

const navBtnActive = "border-brand-blue/40 bg-white/10 text-white"

const pillBtn =
  `inline-flex ${btnH} w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white/90 transition hover:bg-white/10`

const tgBtn =
  `inline-flex ${btnH} w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent px-5 text-sm font-semibold text-white shadow-lg shadow-brand-accent/20 transition hover:opacity-95`

const iconBtn =
  `grid ${btnH} w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white`

export default function Footer() {
  return (
    <Reveal y={20}>
      <footer className="mt-16 border-t border-white/10 bg-black/20">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-10">
          {/* TOP */}
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            {/* LEFT */}
            <div className="flex flex-col gap-6">
              {/* LOGO (центр на мобилке) */}
              <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-center md:text-left">
                <img
                  src={logo}
                  alt="International Trading"
                  className="h-16 w-16 object-contain"
                />
                <div className="leading-tight">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
                    INTERNATIONAL
                  </div>
                  <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                    TRADING
                  </div>
                </div>
              </div>

              {/* CONTACT BUTTONS (аккуратная сетка на мобилке) */}
              <div className="grid gap-3 sm:grid-cols-2 md:flex md:flex-wrap md:items-center">
                <a href="tel:+79181606585" className={pillBtn}>
                  <PhoneCall size={16} />
                  +7 (918) 160-65-85
                </a>

                <a
                  href="https://t.me/International_trading_rus"
                  target="_blank"
                  rel="noreferrer"
                  className={tgBtn}
                >
                  <Send size={16} />
                  Telegram
                </a>


              </div>
            </div>

            {/* RIGHT NAV (сеткой на мобилке) */}
            <nav className="grid gap-3 sm:grid-cols-2 md:flex md:flex-wrap md:justify-end">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `${navBtnBase} md:w-auto ${isActive ? navBtnActive : ""}`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* DIVIDER */}
          <div className="mt-8 h-px w-full bg-white/10" />

          {/* BOTTOM */}
          <div className="mt-6 flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div className="max-w-3xl text-xs leading-relaxed text-white/45">
              Сведения о ценах на продукцию на сайте носят информационный характер.
              Указанные цены могут отличаться от действительных. Характеристики и
              оборудование автомобилей могут различаться в зависимости от модели и
              комплектации. Фактическую информацию уточняйте у менеджера.
              <div className="mt-3 text-white/35">
                © {new Date().getFullYear()} INTERNATIONAL TRADING. Все права защищены.
              </div>
            </div>

            {/* SOCIALS (центр на мобилке) */}
            <Stagger
              className="flex items-center justify-center gap-3 md:justify-end"
              delay={0.05}
            >
              <StaggerItem>
                <a
                  href="https://www.instagram.com/avazhuncho/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className={iconBtn}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                    <path
                      d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M17.5 6.5h.01"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
              </StaggerItem>

             <StaggerItem> <a href="https://www.youtube.com/@AvazbekYunusov1" target="_blank" rel="noreferrer" aria-label="YouTube" className={iconBtn} > <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none"> <path d="M10 15.5V8.5l6 3.5-6 3.5Z" fill="currentColor" /> <path d="M21 12s0-3.2-.4-4.6a2.8 2.8 0 0 0-2-2C16.8 5 12 5 12 5s-4.8 0-6.6.4a2.8 2.8 0 0 0-2 2C3 8.8 3 12 3 12s0 3.2.4 4.6a2.8 2.8 0 0 0 2 2C7.2 19 12 19 12 19s4.8 0 6.6-.4a2.8 2.8 0 0 0 2-2c.4-1.4.4-4.6.4-4.6Z" stroke="currentColor" strokeWidth="2" /> </svg> </a> </StaggerItem>

              <StaggerItem>
                <a
                  href="https://t.me/International_trading_rus"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                  className={iconBtn}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                    <path
                      d="M21 4 3.6 11.3c-1.2.5-1.2 1.7-.2 2l4.3 1.4 1.6 4.8c.3.9 1.1.9 1.7.3l2.4-2.4 4.6 3.4c.8.6 1.5.3 1.7-.8L22 5.2c.3-1.4-.6-2-1.8-1.2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </a>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </footer>
    </Reveal>
  )
}
