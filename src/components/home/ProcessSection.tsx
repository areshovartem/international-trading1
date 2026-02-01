import Reveal from "../Reveal"
import { Stagger, StaggerItem } from "../Stagger"

export default function ProcessSection() {
  return (
    <Reveal>
      <section className="mt-24 space-y-16">
        {/* TOP TEXT BLOCK */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-4 text-sm font-semibold tracking-widest text-brand-accent">
              INTERNATIONAL TRADING
            </div>

            <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
              Надёжная доставка авто
              <br />
              из Кореи и Китая
            </h2>
          </div>

          <p className="text-white/70 leading-relaxed">
            Мы сопровождаем сделку на всех этапах: от подбора и проверки автомобиля
            до его выкупа, логистики и оформления документов в РФ. Работаем
            напрямую с проверенными поставщиками и аукционами.
          </p>
        </div>

        {/* STEPS CARDS */}
        <Stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" delay={0.06}>
          <StaggerItem>
            <StepCard number="01" text="Подбор автомобиля под ваш бюджет и требования" />
          </StaggerItem>

          <StaggerItem>
            <StepCard
              number="02"
              text="Полная проверка истории, состояния и документов"
              active
            />
          </StaggerItem>

          <StaggerItem>
            <StepCard number="03" text="Выкуп авто и организация доставки в РФ" />
          </StaggerItem>

          <StaggerItem>
            <StepCard number="04" text="Таможенное оформление и передача владельцу" />
          </StaggerItem>
        </Stagger>
      </section>
    </Reveal>
  )
}

function StepCard({
  number,
  text,
  active = false,
}: {
  number: string
  text: string
  active?: boolean
}) {
  return (
    <div
      className={[
        "rounded-3xl p-6 transition",
        active
          ? "bg-brand-accent text-white shadow-xl"
          : "bg-white/5 text-white border border-white/10",
      ].join(" ")}
    >
      <div className="text-3xl font-extrabold opacity-70">{number}</div>

      <p className="mt-4 text-sm leading-relaxed opacity-80">{text}</p>

      <div
        className={[
          "mt-6 h-1 w-12 rounded-full",
          active ? "bg-white" : "bg-brand-accent",
        ].join(" ")}
      />
    </div>
  )
}
