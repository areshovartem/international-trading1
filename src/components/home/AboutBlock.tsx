import Reveal from "../Reveal"

export default function AboutBlock() {
  return (
    <Reveal>
      <section
        className="
          rounded-3xl border border-white/10 bg-white/5 text-white backdrop-blur
          px-6 py-7
          sm:px-8 sm:py-8
          md:p-10
        "
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-10">
          <div className="text-center md:text-left">
            <div className="text-xs font-semibold tracking-wide text-brand-light sm:text-sm">
              INTERNATIONAL TRADING —
            </div>

            <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl md:text-5xl">
              Возим авто из Кореи и Китая{" "}
              <span className="text-brand-blue">под ключ</span>
            </h2>

            <p className="mx-auto mt-4 max-w-[32rem] text-sm text-white/70 leading-relaxed md:mx-0 md:text-base">
              Подбор • Проверка • Выкуп • Логистика • Таможня • Постановка на учёт —
              сопровождаем сделку от заявки до выдачи автомобиля в РФ.
            </p>

            <div className="mt-5 flex flex-col items-center gap-3 text-sm text-white/70 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
              {[
                "Прозрачные расчёты",
                "Фото/видео отчёты",
                "Договор",
                "Подбор под бюджет",
              ].map((t) => (
                <span
                  key={t}
                  className="
                    w-full max-w-[260px]
                    rounded-xl border border-white/10 bg-white/5
                    px-4 py-2 text-center
                    sm:w-auto sm:max-w-none
                  "
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center text-white/70 md:text-left">
            <p className="text-sm leading-relaxed md:text-base">
              Нам доверяют потому что мы не “обещаем”, а показываем процесс: от
              аукционного листа и проверки состояния до логистики и документов.
              Все этапы фиксируем, согласуем и держим связь 24/7.
            </p>

            <div className="mx-auto mt-5 h-px w-16 bg-brand-blue/60 md:mx-0" />

            <p className="mt-5 text-sm leading-relaxed md:text-base">
              Хотите подобрать авто? Оставьте заявку — подберём варианты под ваши
              требования и посчитаем стоимость “под ключ”.
            </p>
          </div>
        </div>
      </section>
    </Reveal>
  )
}
