// src/pages/Contacts.tsx
import { useMemo, useState } from "react"
import { Send, Phone, MessageCircle } from "lucide-react"

import Reveal from "../components/Reveal"
import { Stagger, StaggerItem } from "../components/Stagger"

function cx(...s: (string | false | undefined)[]) {
  return s.filter(Boolean).join(" ")
}

export default function Contacts() {
  const EMAIL = "info@international-trading.ru"

  const MANAGERS = [
    { tg: "@kazekodaily", phone: "+79181619393" },
    { tg: "@avazhunch00", phone: "+79181606585" },
    { tg: "@Daviduniversal", phone: "+79996325007" },
  ] as const

  const [form, setForm] = useState({
    name: "",
    phone: "",
    contact: "telegram" as "telegram" | "phone" | "whatsapp",
    message: "",
  })

  const canSend = useMemo(() => {
    return form.name.trim().length >= 2 && form.phone.trim().length >= 6
  }, [form.name, form.phone])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert("Заявка отправлена (демо). Подключим отправку на следующем шаге.")
    setForm({ name: "", phone: "", contact: "telegram", message: "" })
  }

  return (
    <section className="space-y-10">
      {/* HERO */}
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
          {/* фон/сетка */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
            <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-blue/25 blur-3xl" />
            <div className="absolute -right-40 -bottom-40 h-[520px] w-[520px] rounded-full bg-brand-accent/20 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px]" />
          </div>

<div className="relative grid gap-5 p-5 sm:p-6 md:grid-cols-[1.2fr_1fr] md:p-10">
            {/* LEFT */}
<div className="text-center md:text-left">
              <Reveal delay={0.03}>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/70 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  На связи ежедневно • ответим быстро
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                  Контакты
                </h1>
              </Reveal>

              <Reveal delay={0.09}>
<p className="mt-3 mx-auto max-w-[36rem] text-sm leading-relaxed text-white/60 md:mx-0">
                  Telegram, телефон, заявка — выберите удобный способ. Поможем подобрать авто,
                  посчитаем «под ключ» и расскажем про доставку.
                </p>
              </Reveal>

              {/* менеджеры */}
              <div className="mt-6">
                <Stagger className="space-y-3" delay={0.08}>
                  {MANAGERS.map((m, i) => {
                    const tgNick = m.tg.replace("@", "")
                    const wa = m.phone.replace("+", "")
                    return (
                      <StaggerItem key={m.tg} y={14}>
                        <div
                          className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4"

                        >
                          <div className="min-w-0">
                            <div className="text-[11px] text-white/50">Менеджер</div>
                            <div className="mt-1 truncate text-sm font-semibold text-white/90">{m.tg}</div>


                            <a
                              href={`tel:${m.phone}`}
                              className="mt-1 block text-base font-extrabold text-white hover:opacity-90 whitespace-nowrap">
                              {m.phone}
                            </a>
                          </div>

                          {/* кнопки */}
                          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap">

                            <a
                              href={`https://t.me/${tgNick}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-accent px-4 text-sm font-semibold text-white shadow-lg shadow-brand-accent/20 hover:opacity-95 sm:flex-none"
                            >
                              <Send size={16} />
                              Telegram
                            </a>

                            <a
                              className={btnIcon}
                              href={`tel:${m.phone}`}
                              title="Позвонить"
                              aria-label="Позвонить"
                            >
                              <Phone size={16} />
                            </a>

                            
                          </div>
                        </div>
                      </StaggerItem>
                    )
                  })}
                </Stagger>
              </div>

              {/* нижние плашки */}
              <Stagger className="mt-6 grid gap-3 sm:grid-cols-2" delay={0.06}>
                <StaggerItem>
                  <InfoPill label="E-mail" value={EMAIL} />
                </StaggerItem>
                <StaggerItem>
                  <InfoPill label="Режим" value="Ежедневно • отвечаем быстро" />
                </StaggerItem>
              </Stagger>
            </div>

            {/* RIGHT */}
            <Reveal delay={0.06}>
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-4 sm:p-7 backdrop-blur md:p-7">
                <div className="text-sm font-semibold text-white">Быстрая заявка</div>
                <div className="mt-1 text-xs text-white/55">
                  Оставьте контакты — менеджер напишет вам.
                </div>

                <form onSubmit={onSubmit} className="mt-5 space-y-4">
                  <Field label="Имя">
                    <input
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Иван"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Телефон / Telegram">
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="+7 ..."
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Удобнее связаться">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { k: "telegram", t: "Telegram" },
                        { k: "phone", t: "Звонок" },
                        { k: "whatsapp", t: "WhatsApp" },
                      ].map((x) => (
                        <button
                          key={x.k}
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, contact: x.k as any }))}
                          className={cx(
                            "h-10 rounded-2xl border text-xs font-semibold transition",
                            form.contact === x.k
                              ? "border-brand-blue/40 bg-brand-blue/20 text-white"
                              : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                          )}
                        >
                          {x.t}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Комментарий (опционально)">
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Например: нужен седан до 3 млн, доставка в Краснодар"
                      rows={4}
                      className={cx(inputCls, "resize-none")}
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={!canSend}
                    className={cx(
                      "w-full rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition",
                      canSend
                        ? "bg-gradient-to-r from-brand-blue to-brand-accent shadow-brand-accent/20 hover:opacity-95"
                        : "cursor-not-allowed bg-white/10 text-white/40 shadow-none"
                    )}
                  >
                    Отправить заявку →
                  </button>

                  <div className="text-[11px] leading-relaxed text-white/45">
                    Нажимая «Отправить», вы соглашаетесь на обработку данных для связи.
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </Reveal>

      {/* MAP */}
      <Reveal delay={0.05}>
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
            <div>
              <div className="text-sm font-semibold text-white">Карта</div>
              <div className="text-xs text-white/55">Краснодар (точка по согласованию)</div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/70">
              🧾 Документы • 🚚 Логистика • ✅ Проверка
            </div>
          </div>

          <div className="relative h-[380px] w-full">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=38.975313%2C45.035470&z=11"
              className="absolute inset-0 h-full w-full"
              frameBorder={0}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs text-white/55">{label}</div>
      <div className="mt-2">{children}</div>
    </label>
  )
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-[11px] text-white/50">{label}</div>
      <div className="mt-1 text-sm font-semibold text-white/90">{value}</div>
    </div>
  )
}

const inputCls =
  "h-10 sm:h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-brand-blue"

const btnIcon =
  "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white/90 hover:bg-white/10"
