import Reveal from "../Reveal"

export default function Steps() {
  const steps = [
    {
      num: "01",
      title: "Заявка и подбор",
      text: "Собираем требования, бюджет, комплектацию. Подбираем варианты.",
    },
    {
      num: "02",
      title: "Проверка и выкуп",
      text: "Проверяем историю/состояние. Согласуем и выкупаем авто.",
    },
    {
      num: "03",
      title: "Логистика",
      text: "Доставка, порт, документы. Контроль на каждом этапе.",
    },
    {
      num: "04",
      title: "Оформление и выдача",
      text: "Таможня/оформление и получение авто в РФ.",
    },
  ]

  return (
    <Reveal>
      <section className="space-y-5 md:space-y-6">
        {/* Заголовок */}
        <h2 className="text-center text-2xl font-semibold md:text-left md:text-3xl">
          Как мы работаем
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="
                group relative
                rounded-3xl border border-white/10 bg-white/5
                px-5 py-6
                text-center
                shadow-lg transition
                hover:-translate-y-1
                hover:border-white/20
                hover:bg-gradient-to-br
                hover:from-brand-blue/40
                hover:to-brand-accent/20
                md:p-6 md:text-left
              "
            >
              {/* Номер */}
              <div className="text-3xl font-semibold text-brand-light transition group-hover:text-white md:text-4xl">
                {s.num}
              </div>

              {/* Заголовок */}
              <div className="mt-3 text-sm font-semibold md:text-base">
                {s.title}
              </div>

              {/* Текст */}
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                {s.text}
              </div>

              {/* Линия */}
              <div className="mx-auto mt-5 h-px w-12 bg-white/15 transition group-hover:bg-white/30 md:mx-0 md:w-16" />
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  )
}
