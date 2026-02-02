// src/pages/About.tsx
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

import Reveal from "../components/Reveal"
import { Stagger, StaggerItem } from "../components/Stagger"
import React from "react"
import VideosCarousel from "../components/home/VideosCarousel"




function cx(...s: (string | false | undefined)[]) {
  return s.filter(Boolean).join(" ")
}

const Card = ({
  title,
  text,
  icon,
}: {
  title: string
  text: string
  icon: React.ReactNode
}) => (
  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
    <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-start md:text-left">
      <div className="text-white/90 text-lg leading-none">{icon}</div>

      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="mt-1 text-sm leading-relaxed text-white/60">{text}</div>
      </div>
    </div>
  </div>
)


const Stat = ({ n, t }: { n: string; t: string }) => (
  <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
    <div className="text-2xl font-extrabold tracking-tight text-white">{n}</div>
    <div className="mt-1 text-xs text-white/55">{t}</div>
  </div>
)

const Step = ({
  idx,
  title,
  text,
}: {
  idx: string
  title: string
  text: string
}) => (
<div className="relative h-full rounded-[26px] border border-white/10 bg-white/5 p-6">
    <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] font-semibold text-white/80">
        {idx}
      
    </div>

    <div className="text-sm font-semibold text-white">{title}</div>
    <div className="mt-2 text-sm leading-relaxed text-white/60">{text}</div>
  </div>
)


const FAQItem = ({ q, a }: { q: string; a: string }) => (
  <details className="group rounded-[22px] border border-white/10 bg-white/5 p-4 sm:p-5">
    <summary className="cursor-pointer list-none text-sm font-semibold text-white/90">
      <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
        <span>{q}</span>
        <span className="text-white/50 transition group-open:rotate-45">＋</span>
      </div>
    </summary>
    <div className="mt-3 text-sm leading-relaxed text-white/60 text-center sm:text-left">
      {a}
    </div>
  </details>
)

type ClientMedia =
  | { type: "image"; src: string; title: string }
  | { type: "video"; src: string; title: string; poster?: string }

const base = import.meta.env.BASE_URL

const clientsMedia: ClientMedia[] = [
  {
    type: "image",
    src: `${base}clients/1.jpg`,
    title: "Выдача авто — Владивосток",
  },
  {
    type: "image",
    src: `${base}clients/2.jpg`,
    title: "Клиент забрал авто — Москва",
  },
  {
    type: "video",
    src: `${base}clients/1.mp4`,
    poster: `${base}clients/1-poster.png`,
    title: "Видео выдачи — BMW",
  },
  {
    type: "image",
    src: `${base}clients/3.jpg`,
    title: "Выдача — Санкт-Петербург",
  },
  {
    type: "video",
    src: `${base}clients/2.mp4`,
    poster: `${base}clients/2-poster.png`,
    title: "Видео — получение авто",
  },
  {
    type: "image",
    src: `${base}clients/4.jpg`,
    title: "Клиент и авто — Китай",
  },
]


function ClientsBlock() {
  const [open, setOpen] = React.useState<null | ClientMedia>(null)

  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <>
      <Reveal>
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8 text-center md:text-left">
  <div className="flex flex-col items-center gap-3 md:flex-row md:items-end md:justify-between">

            <div>
              <div className="text-xs text-white/55">Реальные выдачи</div>
              <div className="mt-1 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                Наши клиенты
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
                Фото и видео с выдач автомобилей — показываем результат и реальные кейсы.
              </p>
            </div>

            <Link
              to="/contacts"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/10 hover:text-white"
            >
              Хочу так же →
            </Link>
          </div>

          <Stagger className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" delay={0.05}>

            {clientsMedia.map((m, i) => (
              <StaggerItem key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(m)}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 text-left transition hover:border-white/20 hover:bg-white/5"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    {m.type === "image" ? (
                      <img
                        src={m.src}
                        alt={m.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        draggable={false}
                      />
                    ) : (
                      <div className="relative h-full w-full">
                        <img
                          src={m.poster ?? "/clients/poster-fallback.jpg"}
                          alt={m.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          draggable={false}
                        />
                        <div className="absolute inset-0 grid place-items-center bg-black/25">
                          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-black shadow-lg">
                            ▶
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="text-sm font-semibold text-white">
                      {m.title}
                    </div>
                    <div className="mt-1 text-xs text-white/55">
                      {m.type === "video" ? "Видео" : "Фото"}
                    </div>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </Reveal>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-[9999] !m-0 flex items-center justify-center px-4 py-6">
          <button
            type="button"
            aria-label="Закрыть"
            onClick={() => setOpen(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-white/90">
                {open.title}
              </div>

              <button
                type="button"
                onClick={() => setOpen(null)}
                className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/15"
              >
                Закрыть ✕
              </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_40px_140px_rgba(0,0,0,0.8)]">
              {open.type === "image" ? (
                <img
                  src={open.src}
                  alt={open.title}
                  className="max-h-[75vh] w-full object-contain"
                  draggable={false}
                />
              ) : (
                <video
                  src={open.src}
                  className="max-h-[75vh] w-full bg-black"
                  controls
                  playsInline
                  poster={open.poster}
                />
              )}
            </div>

            <div className="mt-3 text-xs text-white/50">
              Нажмите <b>Esc</b> или кликните по фону, чтобы закрыть.
            </div>
          </div>
        </div>
      )}
    </>
  )
}


export default function About() {
  return (
    <section className="space-y-10">
      {/* HERO */}
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
          {/* фон */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
            <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-blue/25 blur-3xl" />
            <div className="absolute -right-40 -bottom-40 h-[520px] w-[520px] rounded-full bg-brand-accent/20 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px]" />
          </div>

          <div className="relative grid gap-6 p-5 sm:p-6 md:grid-cols-[1.2fr_1fr] md:gap-8 md:p-10">

            {/* left */}
<div className="text-center md:text-left">
              <Reveal delay={0.03}>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/70 backdrop-blur mx-auto md:mx-0">

                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Работаем ежедневно • отвечаем быстро
                </div>
              </Reveal>

              <Reveal delay={0.06}>
<h1 className="mt-5 text-center text-4xl font-extrabold tracking-tight text-white md:text-left md:text-5xl">
                  О компании
                </h1>
              </Reveal>

              <Reveal delay={0.09}>
<p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-white/60 md:mx-0 md:text-left">
                  INTERNATIONAL TRADING — помогаем привозить автомобили из Кореи и Китая «под ключ»:
                  подбор, проверка, доставка, таможня, оформление и передача в РФ.
                  Мы делаем процесс прозрачным и понятным — с контролем на каждом этапе.
                </p>
              </Reveal>

              <Stagger className="mt-6 grid gap-3 grid-cols-1 sm:grid-cols-3" delay={0.06}>

                <StaggerItem>
                  <Stat n="3–7" t="дней на подбор варианта" />
                </StaggerItem>
                <StaggerItem>
                  <Stat n="35–55" t="дней средняя доставка" />
                </StaggerItem>
                <StaggerItem>
                  <Stat n="100%" t="фото/видео контроль этапов" />
                </StaggerItem>
              </Stagger>

              <Stagger className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start" delay={0.05}>

                <StaggerItem>
                  <Link
                    to="/catalog"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-accent/20 transition hover:opacity-95"
                  >
                    Смотреть каталог →
                  </Link>
                </StaggerItem>

                <StaggerItem>
                  <Link
                    to="/contacts"
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/10 hover:text-white"
                  >
                    Связаться с нами
                  </Link>
                </StaggerItem>
              </Stagger>
            </div>

            {/* right */}
            <Reveal delay={0.06}>
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 sm:p-6 backdrop-blur md:p-7 text-center md:text-left">

                <div className="flex items-center justify-center gap-3 md:justify-start">

                  <img
                    src={logo}
                    alt="International Trading"
                    className="h-14 w-14 object-contain"
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

                <div className="mt-5 space-y-3 text-sm text-white/60">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-[11px] text-white/50">Фокус</div>
                    <div className="mt-1 text-sm font-semibold text-white/90">
                      Корея / Китай / Европа
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-[11px] text-white/50">Формат</div>
                    <div className="mt-1 text-sm font-semibold text-white/90">
                      Под ключ в РФ + индивидуальные расчёты
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-[11px] text-white/50">Принципы</div>
                    <div className="mt-1 text-sm font-semibold text-white/90">
                      Прозрачность • Контроль • Скорость
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] leading-relaxed text-white/45">
                    * Цены и сроки зависят от курса, наличия авто и маршрута доставки.
                    Актуальность подтверждаем перед сделкой.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Reveal>

      {/* WHY US */}
      <Stagger className="grid gap-4 md:grid-cols-3" delay={0.05}>
        <StaggerItem>
          <Card
            title="Проверка и прозрачность"
            text="Фото/видео отчёты, фиксация параметров, понятные условия и сопровождение на каждом шаге."
            icon={<span>✅</span>}
          />
        </StaggerItem>

        <StaggerItem>
          <Card
            title="Сроки и логистика"
            text="Оптимальные маршруты доставки и чёткое планирование: от подбора до выдачи в РФ."
            icon={<span>🚚</span>}
          />
        </StaggerItem>

        <StaggerItem>
          <Card
            title="Подбор под бюджет"
            text="Подбираем авто под ваши требования и деньги: комплектация, пробег, год, состояние."
            icon={<span>💳</span>}
          />
        </StaggerItem>
      </Stagger>

      {/* PROCESS */}
      <Reveal>
       <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8 text-center md:text-left">
  <div className="flex flex-col items-center gap-3 md:flex-row md:items-end md:justify-between">

            <div>
              <div className="text-xs text-white/55">Как это работает</div>
              <div className="mt-1 text-2xl font-extrabold tracking-tight text-white">
                Процесс “под ключ” — 6 шагов
              </div>
            </div>

            <Link
              to="/calculator"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/10 hover:text-white"
            >
              Открыть калькулятор →
            </Link>
          </div>

<Stagger className="mt-6 grid gap-3 md:grid-cols-2 [grid-auto-rows:1fr]" delay={0.06}>
            <StaggerItem>
              <Step
                idx="1"
                title="Заявка"
                text="Вы оставляете контакты и пожелания: бюджет, модель, год, пробег, комплектация."
              />
            </StaggerItem>
            <StaggerItem>
              <Step
                idx="2"
                title="Подбор"
                text="Предлагаем варианты, объясняем разницу, помогаем выбрать лучший по цене/состоянию."
              />
            </StaggerItem>
            <StaggerItem>
              <Step
                idx="3"
                title="Проверка"
                text="Проверяем авто, даём фото/видео и ключевые параметры перед подтверждением."
              />
            </StaggerItem>
            <StaggerItem>
              <Step
                idx="4"
                title="Покупка и оформление"
                text="Подготовка документов, организация покупки, контроль оплаты и оформления."
              />
            </StaggerItem>
            <StaggerItem>
              <Step
                idx="5"
                title="Доставка и таможня"
                text="Логистика, таможенные процедуры, сопровождение и информирование по статусам."
              />
            </StaggerItem>
            <StaggerItem>
              <Step
                idx="6"
                title="Выдача в РФ"
                text="Передача автомобиля, финальная проверка и закрытие сделки."
              />
            </StaggerItem>
          </Stagger>
        </div>
      </Reveal>


      {/* CLIENTS */}
      <ClientsBlock />


      {/* FAQ + CTA */}
      <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
         <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8 text-center md:text-left">

            <div className="text-xs text-white/55">FAQ</div>
            <div className="mt-1 text-2xl font-extrabold tracking-tight text-white">
              Частые вопросы
            </div>

            <Stagger className="mt-6 space-y-3" delay={0.05}>
              <StaggerItem>
                <FAQItem
                  q="Можно ли привезти авто под заказ, которого нет в каталоге?"
                  a="Да. Каталог — это примеры. Мы подбираем под ваш запрос и бюджет: отправляйте требования в контакты."
                />
              </StaggerItem>
              <StaggerItem>
                <FAQItem
                  q="От чего зависит срок доставки?"
                  a="От страны, логистики, наличия авто, загруженности портов и таможни. Мы заранее говорим ориентир и держим в курсе."
                />
              </StaggerItem>
              <StaggerItem>
                <FAQItem
                  q="Почему цены могут меняться?"
                  a="Из-за курса и рынка. Перед подтверждением сделки мы фиксируем актуальные цифры и согласовываем финальную стоимость."
                />
              </StaggerItem>
            </Stagger>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="rounded-[32px] border border-white/10 bg-black/20 p-5 sm:p-6 backdrop-blur md:p-8 text-center md:text-left">

            <div className="text-xs text-white/55">Готовы начать?</div>
            <div className="mt-1 text-2xl font-extrabold tracking-tight text-white">
              Получить подбор
            </div>

            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Напишите нам или оставьте заявку — предложим варианты под ваш бюджет и сроки.
            </p>

            <Stagger className="mt-5 grid gap-3" delay={0.05}>
              <StaggerItem>
                <Link
                  to="/contacts"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-accent/20 transition hover:opacity-95"
                >
                  Оставить заявку →
                </Link>
              </StaggerItem>

              <StaggerItem>
                <Link
                  to="/catalog"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/10 hover:text-white"
                >
                  Посмотреть каталог
                </Link>
              </StaggerItem>
            </Stagger>

            <div className="mt-5 text-[11px] leading-relaxed text-white/45">
              * Мы не обещаем “магические” сроки — даём реалистичный план и держим связь на каждом этапе.
            </div>
          </div>
        </Reveal>
      </div>
      

            {/* OUR VIDEOS */}
{/* OUR VIDEOS */}
<Reveal>
  <div className="mt-10">
    <VideosCarousel
      items={[
        { title: "Как мы выкупаем авто", youtubeId: "Slyp-IMGkB4" },
        { title: "Доставка и логистика", youtubeId: "BBrkqsytbSA" },
        { title: "Осмотр и проверка", youtubeId: "FN0zu2VpIwY" },
      ]}
    />
  </div>
</Reveal>


    </section>
  )
}
