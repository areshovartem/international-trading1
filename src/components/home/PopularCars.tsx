import { Link } from "react-router-dom"
import { cars } from "../../data/cars"

export default function PopularCars() {
  const popular = cars.slice(0, 3) // первые 3 как “популярные”

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-3xl font-semibold">Популярные авто</h2>
        <Link to="/catalog" className="text-sm text-white/60 hover:text-white">
          Смотреть весь каталог →
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {popular.map((c) => (
          <div
            key={c.id}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={c.images[0]}
                alt={c.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6">
              <div className="text-lg font-semibold">{c.title}</div>

              <div className="mt-3 space-y-1 text-sm text-white/70">
                <div>
                  Экспортёр: <span className="text-white/90">{c.country}</span>
                </div>
                <div>
                  Стоимость:{" "}
                  <span className="text-brand-light">
                    {c.priceRub.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              </div>

              <Link
                to={`/catalog/${c.id}`}
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent px-5 py-3 text-sm font-semibold shadow-lg shadow-brand-accent/20 transition hover:opacity-95"
              >
                Открыть →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
