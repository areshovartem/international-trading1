// src/pages/Catalog.tsx
import { useEffect, useMemo, useRef, useState } from "react"

// стало:
import { type Car } from "../data/cars"
import { getAllCars } from "../data/carsStore"

import { CarListItem } from "../components/catalog/CarListItem"

import Reveal from "../components/Reveal"
import { Stagger, StaggerItem } from "../components/Stagger"
import { createPortal } from "react-dom"
import { ALL_BRANDS } from "../data/brands"


type SortKey = "default" | "price_asc" | "price_desc" | "year_desc" | "mileage_asc"

function uniq(arr: (string | undefined)[]) {
  return Array.from(new Set(arr.filter(Boolean) as string[]))
}

type Filters = {
  q: string
  country: "" | Car["country"]
  minPrice: number | ""
  maxPrice: number | ""
  minYear: number | ""
  maxYear: number | ""
  minMileage: number | ""
  maxMileage: number | ""

  condition: "" | NonNullable<Car["condition"]>
  brand: string
  model: string
  body: string
  transmission: string
  fuel: string
  drive: string
  minVol: number | ""
  maxVol: number | ""
    onlyNew: boolean
  onlyDiscount: boolean
  onlyPromo: boolean


}

const emptyFilters: Filters = {
  q: "",
  country: "",
  minPrice: "",
  maxPrice: "",
  minYear: "",
  maxYear: "",
  minMileage: "",
  maxMileage: "",

  condition: "",
  brand: "",
  model: "",
  body: "",
  transmission: "",
  fuel: "",
  drive: "",
  minVol: "",
  maxVol: "",
    onlyNew: false,
  onlyDiscount: false,
  onlyPromo: false,


}


export function fmtNum(v: number | string | ""): string {
  const n =
    typeof v === "number"
      ? v
      : typeof v === "string"
      ? Number(v.replace(/\s/g, ""))
      : NaN

  if (!Number.isFinite(n)) return "" // 👈 если буквы / пусто / мусор

  return n.toLocaleString("ru-RU") // 200 000 / 1 680 000
}


export default function Catalog() {
  const [draft, setDraft] = useState<Filters>(emptyFilters)
  const [applied, setApplied] = useState<Filters>(emptyFilters)
  const [sort, setSort] = useState<SortKey>("default")

const [filtersOpen, setFiltersOpen] = useState(false)
const [carsList, setCarsList] = useState<Car[]>([])

useEffect(() => {
  setCarsList(getAllCars())
}, [])


const options = useMemo(() => {
  return {
    brands: ALL_BRANDS,

    models: uniq(carsList.map((c) => c.model)),
    bodies: uniq(carsList.map((c) => c.body)),
    transmissions: uniq(carsList.map((c) => c.transmission)),
    fuels: uniq(carsList.map((c) => c.fuel)),
    drives: uniq(carsList.map((c) => c.drive)),
  }
}, [carsList])

const stats = useMemo(() => {
  if (!carsList.length) {
    return { minP: 0, maxP: 0, minY: 0, maxY: 0, minM: 0, maxM: 0, minV: 0, maxV: 0 }
  }

  const prices = carsList.map((c) => c.priceRub)
  const years = carsList.map((c) => c.year)
  const miles = carsList.map((c) => c.mileageKm)
  const vols = carsList.map((c) => c.volumeL).filter(Boolean) as number[]

  return {
    minP: Math.min(...prices),
    maxP: Math.max(...prices),
    minY: Math.min(...years),
    maxY: Math.max(...years),
    minM: Math.min(...miles),
    maxM: Math.max(...miles),
    minV: vols.length ? Math.min(...vols) : 0,
    maxV: vols.length ? Math.max(...vols) : 0,
  }
}, [carsList])

function filterCars(f: Filters) {
  const qq = f.q.trim().toLowerCase()

  return carsList.filter((c) => {
    const okOnlyNew = !f.onlyNew || c.condition === "Новые"
const okDiscount = !f.onlyDiscount || Boolean((c as any).discount)
const okPromo = !f.onlyPromo || Boolean((c as any).promo)


    const okQ =
      !qq ||
      c.title.toLowerCase().includes(qq) ||
      (c.subtitle ?? "").toLowerCase().includes(qq) ||
      (c.brand ?? "").toLowerCase().includes(qq) ||
      (c.model ?? "").toLowerCase().includes(qq)

    const okCountry = !f.country || c.country === f.country
    const okPrice =
      (f.minPrice === "" || c.priceRub >= f.minPrice) &&
      (f.maxPrice === "" || c.priceRub <= f.maxPrice)
    const okYear =
      (f.minYear === "" || c.year >= f.minYear) &&
      (f.maxYear === "" || c.year <= f.maxYear)
    const okMileage =
      (f.minMileage === "" || c.mileageKm >= f.minMileage) &&
      (f.maxMileage === "" || c.mileageKm <= f.maxMileage)

    const okCond = !f.condition || c.condition === f.condition
    const okBrand = !f.brand || c.brand === f.brand
    const okModel = !f.model || c.model === f.model
    const okBody = !f.body || c.body === f.body
    const okTr = !f.transmission || c.transmission === f.transmission
    const okFuel = !f.fuel || c.fuel === f.fuel
    const okDrive = !f.drive || c.drive === f.drive
    const okVol =
      (f.minVol === "" || (c.volumeL ?? -1) >= f.minVol) &&
      (f.maxVol === "" || (c.volumeL ?? 999) <= f.maxVol)

    return (
      okQ &&
      okCountry &&
      okPrice &&
      okYear &&
      okMileage &&
      okCond &&
      okBrand &&
      okModel &&
      okBody &&
      okTr &&
      okFuel &&
      okDrive &&
      okVol
        && okOnlyNew
  && okDiscount
  && okPromo

    )
  })
}

const previewCount = useMemo(() => filterCars(draft).length, [draft, carsList])

const filtered = useMemo(() => {
  let list = filterCars(applied)

  list = [...list]
  switch (sort) {
    case "price_asc":
      list.sort((a, b) => a.priceRub - b.priceRub)
      break
    case "price_desc":
      list.sort((a, b) => b.priceRub - a.priceRub)
      break
    case "year_desc":
      list.sort((a, b) => b.year - a.year)
      break
    case "mileage_asc":
      list.sort((a, b) => a.mileageKm - b.mileageKm)
      break
    default:
      break
  }

  return list
}, [applied, sort, carsList])


  function applyFilters() {
  setApplied(draft)
  setFiltersOpen(false)
}

  function reset() {
    setDraft(emptyFilters)
    setApplied(emptyFilters)
    setSort("default")
  }

  return (
    <section className="space-y-3">
      {/* title */}
      <Reveal>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Каталог автомобилей
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-sm text-white/60 md:mx-0 md:max-w-none">
  Реальные предложения • Фото • {"Под\u00A0ключ"} • Контроль на каждом этапе
</p>

          </div>

{/* right controls */}
<div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center md:w-auto md:justify-end">
  <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 sm:mx-0">
    Найдено: <span className="text-white">{filtered.length}</span>
  </div>

  <SortSelect sort={sort} setSort={setSort} />
</div>

        </div>
      </Reveal>


<div className="lg:hidden">
  <button
    type="button"
    onClick={() => setFiltersOpen((v) => !v)}
    className="flex h-11 w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white/85 [-webkit-tap-highlight-color:transparent]"
  >
    <span>Фильтры</span>
    <span className={["text-white/60 transition", filtersOpen ? "rotate-180" : ""].join(" ")}>
      ▾
    </span>
  </button>
</div>




      {/* FILTER PANEL */}
      {/* FILTER PANEL */}
<div className={filtersOpen ? "block" : "hidden lg:block"}>
  <Reveal delay={0.04}>
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

          {/* tabs + actions */}
          <Stagger className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" delay={0.02}>

            <StaggerItem>
<div className="grid w-full grid-cols-3 gap-1 rounded-2xl border border-white/10 bg-white/5 p-1">
  {(["", "Новые", "С пробегом"] as const).map((v) => {
    const active = draft.condition === v
    return (
      <button
        key={v || "all"}
        type="button"
        onClick={() => setDraft((s) => ({ ...s, condition: v as any }))}
className={[
  "h-10 w-full rounded-2xl px-2 text-xs font-semibold",
  "whitespace-nowrap text-center",
  "transition-none [-webkit-tap-highlight-color:transparent]",
  draft.condition === v
    ? "bg-white/10 text-white"
    : "text-white/70 hover:bg-white/10",
].join(" ")}

      >
        {v ? v : "Все"}
      </button>
    )
  })}
</div>

            </StaggerItem>

            <StaggerItem>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10"
                >
                  Сбросить
                </button>

                <button
                  type="button"
                  onClick={applyFilters}
                  className="rounded-2xl bg-white px-5 py-2.5 text-sm font-extrabold text-black"
                >
                  Показать: {previewCount}
                </button>
              </div>
            </StaggerItem>
          </Stagger>

          {/* grid */}
          <Stagger className="mt-5 grid gap-3 lg:grid-cols-12" delay={0.05}>
            <StaggerItem className="lg:col-span-4">
              <input
                value={draft.q}
                onChange={(e) => setDraft((s) => ({ ...s, q: e.target.value }))}
                placeholder="Поиск: BMW, Audi, K5..."
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none focus:border-brand-blue"
              />
            </StaggerItem>

            <StaggerItem className="lg:col-span-2">
              <FancySelect
                value={draft.brand}
                onChange={(v) => setDraft((s) => ({ ...s, brand: v }))}
                placeholder="Марка"
                options={options.brands}
              />
            </StaggerItem>

            <StaggerItem className="lg:col-span-2">
              <FancySelect
                value={draft.model}
                onChange={(v) => setDraft((s) => ({ ...s, model: v }))}
                placeholder="Модель"
                options={options.models}
              />
            </StaggerItem>



            <StaggerItem className="lg:col-span-2">
              <FancySelect
                value={draft.country}
                onChange={(v) => setDraft((s) => ({ ...s, country: v as any }))}
                placeholder="Страна"
                options={["Китай", "Корея", "Европа"]}
              />
            </StaggerItem>

            <StaggerItem className="lg:col-span-2">
              <FancySelect
                value={draft.body}
                onChange={(v) => setDraft((s) => ({ ...s, body: v }))}
                placeholder="Кузов"
                options={options.bodies}
              />
            </StaggerItem>

            <StaggerItem className="lg:col-span-2">
              <FancySelect
                value={draft.transmission}
                onChange={(v) => setDraft((s) => ({ ...s, transmission: v }))}
                placeholder="Коробка"
                options={options.transmissions}
              />
            </StaggerItem>

            <StaggerItem className="lg:col-span-2">
              <FancySelect
                value={draft.fuel}
                onChange={(v) => setDraft((s) => ({ ...s, fuel: v }))}
                placeholder="Двигатель"
                options={options.fuels}
              />
            </StaggerItem>

            <StaggerItem className="lg:col-span-2">
              <FancySelect
                value={draft.drive}
                onChange={(v) => setDraft((s) => ({ ...s, drive: v }))}
                placeholder="Привод"
                options={options.drives}
              />
            </StaggerItem>

            

<StaggerItem className="lg:col-span-6">
<div className="
  grid h-12 grid-cols-3 items-center
  rounded-2xl border border-white/10 bg-white/5 px-4
">
  {/* Только новые */}
  <label className="flex items-center justify-center gap-3 text-sm text-white/85 whitespace-nowrap cursor-pointer">
    <input
      type="checkbox"
      checked={draft.onlyNew}
      onChange={(e) =>
        setDraft((s) => ({ ...s, onlyNew: e.target.checked }))
      }
      className="peer hidden"
    />
    <span className="h-5 w-5 rounded-md border border-white/25 flex items-center justify-center peer-checked:bg-white peer-checked:border-white">
      <span className="h-2.5 w-2.5 rounded-sm bg-black opacity-0 peer-checked:opacity-100" />
    </span>
    Только новые
  </label>

  {/* Со скидкой */}
  <label className="flex items-center justify-center gap-3 text-sm text-white/85 whitespace-nowrap cursor-pointer">
    <input
      type="checkbox"
      checked={draft.onlyDiscount}
      onChange={(e) =>
        setDraft((s) => ({ ...s, onlyDiscount: e.target.checked }))
      }
      className="peer hidden"
    />
    <span className="h-5 w-5 rounded-md border border-white/25 flex items-center justify-center peer-checked:bg-white peer-checked:border-white">
      <span className="h-2.5 w-2.5 rounded-sm bg-black opacity-0 peer-checked:opacity-100" />
    </span>
    Со скидкой
  </label>

  {/* Акции */}
  <label className="flex items-center justify-center gap-3 text-sm text-white/85 whitespace-nowrap cursor-pointer">
    <input
      type="checkbox"
      checked={draft.onlyPromo}
      onChange={(e) =>
        setDraft((s) => ({ ...s, onlyPromo: e.target.checked }))
      }
      className="peer hidden"
    />
    <span className="h-5 w-5 rounded-md border border-white/25 flex items-center justify-center peer-checked:bg-white peer-checked:border-white">
      <span className="h-2.5 w-2.5 rounded-sm bg-black opacity-0 peer-checked:opacity-100" />
    </span>
    Акции
  </label>
</div>

</StaggerItem>

<StaggerItem className="lg:col-span-4">
  <RangeField
    leftPlaceholder={`Цена от (${fmtNum(stats.minP)})`}
    rightPlaceholder={`до (${fmtNum(stats.maxP)})`}
    leftValue={draft.minPrice}
    rightValue={draft.maxPrice}
    onLeftChange={(v) => setDraft((s) => ({ ...s, minPrice: v }))}
    onRightChange={(v) => setDraft((s) => ({ ...s, maxPrice: v }))}
  />
</StaggerItem>



            <StaggerItem className="lg:col-span-4">
              <RangeField
                leftPlaceholder={`Год от (${stats.minY})`}
                rightPlaceholder={`до (${stats.maxY})`}
                leftValue={draft.minYear}
                rightValue={draft.maxYear}
                onLeftChange={(v) => setDraft((s) => ({ ...s, minYear: v }))}
                onRightChange={(v) => setDraft((s) => ({ ...s, maxYear: v }))}
              />
            </StaggerItem>

            <StaggerItem className="lg:col-span-4">
              <RangeField
                leftPlaceholder="Пробег от, км"
                rightPlaceholder="до"
                leftValue={draft.minMileage}
                rightValue={draft.maxMileage}
                onLeftChange={(v) => setDraft((s) => ({ ...s, minMileage: v }))}
                onRightChange={(v) => setDraft((s) => ({ ...s, maxMileage: v }))}
              />
            </StaggerItem>

          </Stagger>
        </div>
      </Reveal>
      </div>


      {/* LIST */}
      <div className="space-y-4">
        {filtered.length ? (
          <>
          {filtered.map((car, i) => (
            <Reveal
              key={car.id}
              y={16}
              delay={i < 6 ? 0.08 + i * 0.04 : 0} // 👈 первые видимые — с задержкой
            >
              <CarListItem car={car} />
            </Reveal>
          ))}

          </>
        ) : (
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white/70">
              Ничего не найдено — попробуйте ослабить фильтры.
            </div>
          </Reveal>
          
        )}
      </div>
    </section>
  )
}


/* helpers */


function FancySelect({
  
  value,
  onChange,
  placeholder,
  options,
  className,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  options: string[]
  className?: string
}) {
  const disabled = !options.length
  const [open, setOpen] = useState(false)
const menuRef = useRef<HTMLDivElement | null>(null)

  const wrapRef = useRef<HTMLDivElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const [pos, setPos] = useState<{ left: number; top: number; width: number } | null>(null)

  const currentLabel = value || placeholder

  // считаем позицию кнопки -> куда ставить дропдаун в body
  const syncPos = () => {
    const el = btnRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos({
      left: r.left,
      top: r.bottom + 8, // отступ вниз
      width: r.width,
    })
  }

  useEffect(() => {
    if (!open) return
    syncPos()

    const onScroll = () => syncPos()
    const onResize = () => syncPos()

    window.addEventListener("scroll", onScroll, true)
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("scroll", onScroll, true)
      window.removeEventListener("resize", onResize)
    }
  }, [open])

useEffect(() => {
  const onDown = (e: MouseEvent) => {
    const w = wrapRef.current
    const m = menuRef.current
    const t = e.target as Node

    if (w?.contains(t)) return
    if (m?.contains(t)) return

    setOpen(false)
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false)
  }

  document.addEventListener("mousedown", onDown)
  window.addEventListener("keydown", onKey)

  return () => {
    document.removeEventListener("mousedown", onDown)
    window.removeEventListener("keydown", onKey)
  }
}, [])


  return (
    <div ref={wrapRef} className={["relative", className].filter(Boolean).join(" ")}>
      <button
        ref={btnRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
className={[
  "flex h-12 w-full items-center justify-between gap-3",
  "rounded-2xl border border-white/10 bg-white/5 px-4",
  "text-sm outline-none backdrop-blur",
  // ❌ убираем любые transition и active эффекты
  "active:translate-y-0 active:scale-100",
  disabled ? "opacity-50" : "",
].join(" ")}

      >
        <span className={["truncate", value ? "text-white/85" : "text-white/45"].join(" ")}>
          {currentLabel}
        </span>

        <span className={["shrink-0 text-white/60 transition", open ? "rotate-180" : ""].join(" ")}>
          ▾
        </span>
      </button>

      {open && !disabled && pos
        ? createPortal(
            <div
              ref={menuRef}   // 👈 ВАЖНО

              style={{
                position: "fixed",
                left: pos.left,
                top: pos.top,
                width: pos.width,
                zIndex: 999999,
              }}
              className="
                rounded-2xl border border-white/15
                bg-[#0E1424]
                shadow-[0_20px_60px_rgba(0,0,0,0.85)]
              "
            >
              <div className="max-h-72 overflow-auto p-1.5">
                {/* reset */}
                <button
                  type="button"
                  onClick={() => {
                    onChange("")
                    setOpen(false)
                  }}
                  className={[
                    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition",
                    value === "" ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/10",
                  ].join(" ")}
                >
                  <span className="w-4 shrink-0 text-white/70">{value === "" ? "✓" : ""}</span>
                  <span className="truncate">{placeholder}</span>
                </button>

                <div className="my-1 h-px bg-white/10" />

                {options.map((opt) => {
                  const active = opt === value
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        onChange(opt)
                        setOpen(false)
                      }}
                      className={[
                        "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition",
                        active ? "bg-brand-blue/20 text-white" : "text-white/80 hover:bg-white/10",
                      ].join(" ")}
                    >
                      <span className="w-4 shrink-0 text-white/70">{active ? "✓" : ""}</span>
                      <span className="truncate">{opt}</span>
                    </button>
                  )
                })}
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  )
}


function parseNumInput(s: string): number | "" {
  const v = s.replace(/[^\d]/g, "") // оставляем только цифры
  if (!v) return ""
  const n = Number(v)
  return Number.isFinite(n) ? n : ""
}

function RangeField({
  className,
  leftPlaceholder,
  rightPlaceholder,
  leftValue,
  rightValue,
  onLeftChange,
  onRightChange,
}: {
  className?: string
  leftPlaceholder: string
  rightPlaceholder: string
  leftValue: number | ""
  rightValue: number | ""
  onLeftChange: (v: number | "") => void
  onRightChange: (v: number | "") => void
}) {
  return (
    <div className={className}>
      <div className="flex h-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <input
         value={leftValue === "" ? "" : fmtNum(leftValue)}
onChange={(e) => {
  const raw = e.target.value.replace(/[^\d]/g, "") // убрали пробелы и всё лишнее
  onLeftChange(raw ? Number(raw) : "")
}}



          placeholder={leftPlaceholder}
          className="w-1/2 bg-transparent px-4 text-sm text-white placeholder:text-white/35 outline-none focus:ring-0"
          inputMode="numeric"
        />
        <div className="w-px bg-white/10" />
        <input
          value={rightValue === "" ? "" : fmtNum(rightValue)}
onChange={(e) => {
  const raw = e.target.value.replace(/[^\d]/g, "")
  onRightChange(raw ? Number(raw) : "")
}}


          placeholder={rightPlaceholder}
          className="w-1/2 bg-transparent px-4 text-sm text-white placeholder:text-white/35 outline-none focus:ring-0"
          inputMode="numeric"
        />
      </div>
    </div>
  )
}


function SortSelect({
  sort,
  setSort,
}: {
  sort: SortKey
  setSort: (v: SortKey) => void
}) {
  const items = useMemo(
    () =>
      [
        { value: "default", label: "Сортировка: по умолчанию" },
        { value: "price_asc", label: "Цена: по возрастанию" },
        { value: "price_desc", label: "Цена: по убыванию" },
        { value: "year_desc", label: "Год: сначала новые" },
        { value: "mileage_asc", label: "Пробег: по возрастанию" },
      ] as const,
    []
  )

  const current = items.find((i) => i.value === sort) ?? items[0]
const menuRef = useRef<HTMLDivElement | null>(null)

  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const [pos, setPos] = useState<{ left: number; top: number; width: number } | null>(null)

  const syncPos = () => {
    const el = btnRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos({
      left: r.left,
      top: r.bottom + 8,
      width: r.width,
    })
  }

  useEffect(() => {
    if (!open) return
    syncPos()

    const onScroll = () => syncPos()
    const onResize = () => syncPos()

    window.addEventListener("scroll", onScroll, true)
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("scroll", onScroll, true)
      window.removeEventListener("resize", onResize)
    }
  }, [open])

useEffect(() => {
  const onDown = (e: MouseEvent) => {
    const w = wrapRef.current
    const m = menuRef.current
    const t = e.target as Node

    // клик по кнопке/обертке — ок
    if (w?.contains(t)) return
    // клик по меню (portal) — тоже ок
    if (m?.contains(t)) return

    setOpen(false)
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false)
  }

  document.addEventListener("mousedown", onDown)
  window.addEventListener("keydown", onKey)

  return () => {
    document.removeEventListener("mousedown", onDown)
    window.removeEventListener("keydown", onKey)
  }
}, [])


  return (
    <div ref={wrapRef} className="relative w-full sm:w-[320px]">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
className="
  flex h-11 w-full items-center justify-between gap-3
  rounded-full border border-white/10 bg-white/5
  px-5 text-sm font-semibold text-white/85
  outline-none
"


      >
        <span className="truncate">{current.label}</span>
        <span className={["shrink-0 text-white/60 transition", open ? "rotate-180" : ""].join(" ")}>
          ▾
        </span>
      </button>

      {open && pos
        ? createPortal(
            <div
                    ref={menuRef} // ✅ ВАЖНО

              style={{
                position: "fixed",
                left: pos.left,
                top: pos.top,
                width: pos.width,
                zIndex: 999999,
              }}
              className="
                overflow-hidden rounded-2xl border border-white/15
                bg-[#0E1424]
                shadow-[0_20px_60px_rgba(0,0,0,0.85)]
              "
            >
              <div className="max-h-72 overflow-auto p-1.5">
                {items.map((it) => {
                  const active = it.value === sort
                  return (
                    <button
                      key={it.value}
                      type="button"
                      onClick={() => {
                        setSort(it.value)
                        setOpen(false)
                      }}
                      className={[
                        "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition",
                        active ? "bg-brand-blue/20 text-white" : "text-white/80 hover:bg-white/10",
                      ].join(" ")}
                    >
                      <span className="w-4 shrink-0 text-white/70">{active ? "✓" : ""}</span>
                      <span className="truncate">{it.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  )
}
