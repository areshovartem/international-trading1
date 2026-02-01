// src/pages/Calculator.tsx
import { useMemo, useState, type ReactNode } from "react"

import Reveal from "../components/Reveal"
import { Stagger, StaggerItem } from "../components/Stagger"

function cx(...s: (string | false | undefined)[]) {
  return s.filter(Boolean).join(" ")
}

type Currency = "RUB" | "USD" | "EUR" | "KRW" | "CNY"
type AgeGroup = "lt3" | "3to5" | "gt5"
type UtilMode = "benefit" | "table" | "custom"

function fmt(n: number) {
  return n.toLocaleString("ru-RU")
}

function clampNum(v: string, fallback = 0) {
  const x = Number(String(v).replace(",", ".").trim())
  return Number.isFinite(x) ? x : fallback
}

const UTIL_BASE = 20000

type UtilRow = { hpMax: number; kLt3: number; kGt3: number }
type UtilBand = { ccMax: number; rows: UtilRow[] }

const UTIL_TABLE_2026: UtilBand[] = [
  {
    ccMax: 1000,
    rows: [
      { hpMax: 160, kLt3: 0.17, kGt3: 0.26 },
      { hpMax: 190, kLt3: 15.36, kGt3: 28.43 },
      { hpMax: 220, kLt3: 15.84, kGt3: 29.28 },
      { hpMax: 250, kLt3: 16.2, kGt3: 30.12 },
      { hpMax: 9999, kLt3: 17.28, kGt3: 30.12 },
    ],
  },
  {
    ccMax: 2000,
    rows: [
      { hpMax: 160, kLt3: 0.17, kGt3: 0.26 },
      { hpMax: 190, kLt3: 45.0, kGt3: 74.64 },
      { hpMax: 220, kLt3: 47.64, kGt3: 79.2 },
      { hpMax: 250, kLt3: 50.52, kGt3: 83.88 },
      { hpMax: 280, kLt3: 57.12, kGt3: 91.92 },
      { hpMax: 310, kLt3: 64.56, kGt3: 100.56 },
      { hpMax: 340, kLt3: 72.96, kGt3: 110.16 },
      { hpMax: 370, kLt3: 83.16, kGt3: 120.6 },
      { hpMax: 400, kLt3: 94.8, kGt3: 132.0 },
      { hpMax: 430, kLt3: 108.0, kGt3: 144.6 },
      { hpMax: 460, kLt3: 123.24, kGt3: 158.4 },
      { hpMax: 500, kLt3: 140.4, kGt3: 173.4 },
      { hpMax: 9999, kLt3: 160.08, kGt3: 189.84 },
    ],
  },
  {
    ccMax: 3000,
    rows: [
      { hpMax: 160, kLt3: 0.17, kGt3: 0.26 },
      { hpMax: 190, kLt3: 115.34, kGt3: 172.8 },
      { hpMax: 220, kLt3: 118.2, kGt3: 175.08 },
      { hpMax: 250, kLt3: 120.12, kGt3: 177.6 },
      { hpMax: 280, kLt3: 126.0, kGt3: 183.0 },
      { hpMax: 310, kLt3: 132.24, kGt3: 189.36 },
      { hpMax: 340, kLt3: 138.6, kGt3: 195.6 },
      { hpMax: 370, kLt3: 145.08, kGt3: 201.84 },
      { hpMax: 400, kLt3: 151.68, kGt3: 208.08 },
      { hpMax: 430, kLt3: 158.4, kGt3: 214.2 },
      { hpMax: 460, kLt3: 159.48, kGt3: 216.36 },
      { hpMax: 500, kLt3: 165.84, kGt3: 222.36 },
      { hpMax: 9999, kLt3: 172.44, kGt3: 228.6 },
    ],
  },
  {
    ccMax: 3500,
    rows: [
      { hpMax: 160, kLt3: 129.2, kGt3: 197.81 },
      { hpMax: 190, kLt3: 131.76, kGt3: 200.04 },
      { hpMax: 220, kLt3: 134.4, kGt3: 202.2 },
      { hpMax: 250, kLt3: 137.16, kGt3: 204.36 },
      { hpMax: 280, kLt3: 140.52, kGt3: 207.24 },
      { hpMax: 310, kLt3: 144.0, kGt3: 212.4 },
      { hpMax: 340, kLt3: 151.92, kGt3: 217.8 },
      { hpMax: 370, kLt3: 160.32, kGt3: 224.28 },
      { hpMax: 400, kLt3: 169.2, kGt3: 231.0 },
      { hpMax: 430, kLt3: 178.44, kGt3: 237.96 },
      { hpMax: 460, kLt3: 188.28, kGt3: 245.04 },
      { hpMax: 500, kLt3: 198.6, kGt3: 252.48 },
      { hpMax: 9999, kLt3: 209.52, kGt3: 260.04 },
    ],
  },
  {
    ccMax: 999999,
    rows: [
      { hpMax: 160, kLt3: 164.53, kGt3: 216.29 },
      { hpMax: 190, kLt3: 167.28, kGt3: 219.48 },
      { hpMax: 220, kLt3: 170.16, kGt3: 222.84 },
      { hpMax: 250, kLt3: 173.04, kGt3: 226.2 },
      { hpMax: 280, kLt3: 176.52, kGt3: 231.36 },
      { hpMax: 310, kLt3: 180.0, kGt3: 236.64 },
      { hpMax: 340, kLt3: 186.36, kGt3: 249.6 },
      { hpMax: 370, kLt3: 192.88, kGt3: 263.4 },
      { hpMax: 400, kLt3: 199.68, kGt3: 277.92 },
      { hpMax: 430, kLt3: 206.64, kGt3: 293.16 },
      { hpMax: 460, kLt3: 213.84, kGt3: 309.36 },
      { hpMax: 500, kLt3: 221.28, kGt3: 326.4 },
      { hpMax: 9999, kLt3: 229.08, kGt3: 344.28 },
    ],
  },
]

function calcUtilRub2026(params: { cc: number; hp: number; age: AgeGroup }) {
  const { cc, hp, age } = params
  if (!cc || !hp) return 0

  const band =
    UTIL_TABLE_2026.find((b) => cc <= b.ccMax) ??
    UTIL_TABLE_2026[UTIL_TABLE_2026.length - 1]
  const row = band.rows.find((r) => hp <= r.hpMax) ?? band.rows[band.rows.length - 1]

  const isLt3 = age === "lt3"
  const k = isLt3 ? row.kLt3 : row.kGt3
  return Math.round(UTIL_BASE * k)
}

export default function Calculator() {
  // ---- INPUTS (пустые по умолчанию)
  const [price, setPrice] = useState("")
  const [currency, setCurrency] = useState<Currency>("RUB")

  const [age, setAge] = useState<AgeGroup>("3to5")
  const [engineCc, setEngineCc] = useState("")
  const [powerHp, setPowerHp] = useState("")

  const [rates, setRates] = useState({
    USD: 92,
    EUR: 100,
    KRW: 0.07,
    CNY: 13,
  })

  const [utilMode, setUtilMode] = useState<UtilMode>("benefit")
  const [utilCustom, setUtilCustom] = useState("")

  const [customsFeeRub, setCustomsFeeRub] = useState("")
  const [extraRub, setExtraRub] = useState("")

  const calc = useMemo(() => {
    const priceNum = clampNum(price, NaN)
    const cc = Math.max(0, Math.floor(clampNum(engineCc, 0)))
    const hp = Math.max(0, Math.floor(clampNum(powerHp, 0)))

    const hasPrice = Number.isFinite(priceNum) && priceNum > 0
    const hasEngine = cc > 0
    const hasHp = hp > 0

    const toRub = (amount: number, cur: Currency) => {
      if (cur === "RUB") return amount
      if (cur === "USD") return amount * rates.USD
      if (cur === "EUR") return amount * rates.EUR
      if (cur === "KRW") return amount * rates.KRW
      if (cur === "CNY") return amount * rates.CNY
      return amount
    }

    const priceRub = hasPrice ? toRub(priceNum, currency) : 0
    const priceEur = rates.EUR > 0 ? priceRub / rates.EUR : 0

    function dutyForLt3(priceEurLocal: number, ccLocal: number) {
      let percent = 0.48
      let minPerCc = 3.5

      if (priceEurLocal <= 8500) {
        percent = 0.54
        minPerCc = 2.5
      } else if (priceEurLocal <= 16700) {
        percent = 0.48
        minPerCc = 3.5
      } else if (priceEurLocal <= 42300) {
        percent = 0.48
        minPerCc = 5.5
      } else if (priceEurLocal <= 84500) {
        percent = 0.48
        minPerCc = 7.5
      } else if (priceEurLocal <= 169000) {
        percent = 0.48
        minPerCc = 15
      } else {
        percent = 0.48
        minPerCc = 20
      }

      const byPercent = priceEurLocal * percent
      const byMin = ccLocal * minPerCc
      return Math.max(byPercent, byMin)
    }

    function perCcRate_3to5(ccLocal: number) {
      if (ccLocal <= 1000) return 1.5
      if (ccLocal <= 1500) return 1.7
      if (ccLocal <= 1800) return 2.5
      if (ccLocal <= 2300) return 2.7
      if (ccLocal <= 3000) return 3.0
      return 3.6
    }

    function perCcRate_gt5(ccLocal: number) {
      if (ccLocal <= 1000) return 3.0
      if (ccLocal <= 1500) return 3.2
      if (ccLocal <= 1800) return 3.5
      if (ccLocal <= 2300) return 4.8
      if (ccLocal <= 3000) return 5.0
      return 5.7
    }

    let dutyEur = 0
    if (hasPrice && hasEngine) {
      if (age === "lt3") dutyEur = dutyForLt3(priceEur, cc)
      else if (age === "3to5") dutyEur = cc * perCcRate_3to5(cc)
      else dutyEur = cc * perCcRate_gt5(cc)
    }

    const dutyRub = dutyEur * (rates.EUR || 0)

    const benefitEligible = hasHp && hasEngine && hp <= 160 && cc <= 3000

    let utilRub = 0
    if (utilMode === "custom") {
      utilRub = clampNum(utilCustom, 0)
    } else if (utilMode === "benefit") {
      utilRub = benefitEligible ? (age === "lt3" ? 3400 : 5200) : 0
    } else {
      utilRub = hasHp && hasEngine ? calcUtilRub2026({ cc, hp, age }) : 0
    }

    const feeRub = clampNum(customsFeeRub, 0)
    const extra = clampNum(extraRub, 0)

    const totalRub = priceRub + dutyRub + utilRub + feeRub + extra

    const ready = hasPrice && hasEngine && hasHp

    return {
      ready,
      priceRub,
      priceEur,
      dutyEur,
      dutyRub,
      utilRub,
      benefitEligible,
      feeRub,
      extra,
      totalRub,
      cc,
      hp,
    }
  }, [
    price,
    currency,
    engineCc,
    powerHp,
    age,
    rates,
    utilMode,
    utilCustom,
    customsFeeRub,
    extraRub,
  ])

  return (
    <section className="space-y-10">
      {/* HERO */}
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
          <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
            <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-blue/25 blur-3xl" />
            <div className="absolute -right-40 -bottom-40 h-[520px] w-[520px] rounded-full bg-brand-accent/20 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px]" />
          </div>

<div className="relative p-4 md:p-6 text-center">
            <Reveal delay={0.03}>
<div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/70 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Расчёт ориентировочный • финально подтверждается брокером
              </div>
            </Reveal>

            <Reveal delay={0.06}>
<h1 className="mt-4 text-[28px] font-extrabold tracking-tight text-white md:text-4xl">
                Калькулятор растаможки
              </h1>
            </Reveal>

            <Reveal delay={0.09}>
<p className="mx-auto mt-2 max-w-3xl text-[13px] leading-relaxed text-white/60">
                Введите цену, возраст, объём и мощность — и получите ориентир: цена + пошлина + утиль + сборы + доп.
                расходы.
              </p>
            </Reveal>
          </div>
        </div>
      </Reveal>

      {/* MAIN GRID */}
      <Stagger className="grid gap-6 lg:grid-cols-[1fr_420px]" delay={0.04}>
        {/* LEFT: inputs */}
        <StaggerItem>
<div className="rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-6">
            <Reveal>
<div className="text-center">
  <div className="text-lg font-extrabold text-white">Параметры авто</div>
<div className="mt-1 text-[11px] sm:text-xs text-white/55">
    Легковой автомобиль (ДВС). Для электро/гибрида/юрлица формулы отличаются.
  </div>
</div>

            </Reveal>

            <Stagger className="mt-6 grid gap-4 md:grid-cols-2" delay={0.05}>
              <StaggerItem>
                <Field label="Цена авто">
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={inputCls}
                    placeholder="Напр. 2500000"
                  />
                </Field>
              </StaggerItem>

              <StaggerItem>
                <Field label="Валюта цены">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as Currency)}
                    className={inputCls}
                  >
                    <option value="RUB">₽ RUB</option>
                    <option value="USD">$ USD</option>
                    <option value="EUR">€ EUR</option>
                    <option value="KRW">₩ KRW</option>
                    <option value="CNY">¥ CNY</option>
                  </select>
                </Field>
              </StaggerItem>

              <StaggerItem className="md:col-span-2">
                <Field label="Возраст авто">
                  <div className="grid grid-cols-3 gap-2">
                    <Tab active={age === "lt3"} onClick={() => setAge("lt3")}>
                      Младше 3
                    </Tab>
                    <Tab active={age === "3to5"} onClick={() => setAge("3to5")}>
                      3–5 лет
                    </Tab>
                    <Tab active={age === "gt5"} onClick={() => setAge("gt5")}>
                      Старше 5
                    </Tab>
                  </div>
                </Field>
              </StaggerItem>

              <StaggerItem>
                <Field label="Объём двигателя (см³)">
                  <input
                    value={engineCc}
                    onChange={(e) => setEngineCc(e.target.value)}
                    className={inputCls}
                    placeholder="Напр. 1998"
                  />
                </Field>
              </StaggerItem>

              <StaggerItem>
                <Field label="Мощность (л.с.)">
                  <input
                    value={powerHp}
                    onChange={(e) => setPowerHp(e.target.value)}
                    className={inputCls}
                    placeholder="Напр. 150"
                  />
                </Field>
              </StaggerItem>

              <StaggerItem className="md:col-span-2">
                <Field label="Доп. расходы (логистика/услуги), ₽">
                  <input
                    value={extraRub}
                    onChange={(e) => setExtraRub(e.target.value)}
                    className={inputCls}
                    placeholder="Напр. 0"
                  />
                </Field>
              </StaggerItem>
            </Stagger>

            <Reveal delay={0.04}>
<div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-4">
                <div className="text-center text-sm font-semibold text-white">Курсы валют</div>
<div className="mt-1 text-center text-xs text-white/55">Укажите, сколько ₽ стоит 1 единица валюты.</div>


                <Stagger className="mt-4 grid gap-3 sm:grid-cols-2" delay={0.04}>
                  <StaggerItem>
                    <SmallField label="USD → RUB">
                      <input
                        value={String(rates.USD)}
                        onChange={(e) =>
                          setRates((p) => ({ ...p, USD: clampNum(e.target.value, p.USD) }))
                        }
                        className={inputCls}
                      />
                    </SmallField>
                  </StaggerItem>
                  <StaggerItem>
                    <SmallField label="EUR → RUB">
                      <input
                        value={String(rates.EUR)}
                        onChange={(e) =>
                          setRates((p) => ({ ...p, EUR: clampNum(e.target.value, p.EUR) }))
                        }
                        className={inputCls}
                      />
                    </SmallField>
                  </StaggerItem>
                  <StaggerItem>
                    <SmallField label="KRW → RUB">
                      <input
                        value={String(rates.KRW)}
                        onChange={(e) =>
                          setRates((p) => ({ ...p, KRW: clampNum(e.target.value, p.KRW) }))
                        }
                        className={inputCls}
                      />
                    </SmallField>
                  </StaggerItem>
                  <StaggerItem>
                    <SmallField label="CNY → RUB">
                      <input
                        value={String(rates.CNY)}
                        onChange={(e) =>
                          setRates((p) => ({ ...p, CNY: clampNum(e.target.value, p.CNY) }))
                        }
                        className={inputCls}
                      />
                    </SmallField>
                  </StaggerItem>
                </Stagger>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
<div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-4 text-center">
                <div className="text-sm font-semibold text-white">Утильсбор</div>
                <div className="mt-1 text-xs text-white/55">
                  “Льготный” ориентир обычно применим для личного пользования при ≤160 л.с. и ≤3000 см³. Если мощность
                  больше — используйте “по таблице” или “вручную”.
                </div>

<Stagger className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2" delay={0.02}>
                  <StaggerItem>
                    <Tab active={utilMode === "benefit"} onClick={() => setUtilMode("benefit")}>
                      Льготный
                    </Tab>
                  </StaggerItem>
                  <StaggerItem>
                    <Tab active={utilMode === "table"} onClick={() => setUtilMode("table")}>
                      По таблице
                    </Tab>
                  </StaggerItem>
                  <StaggerItem>
                    <Tab active={utilMode === "custom"} onClick={() => setUtilMode("custom")}>
                      Вручную
                    </Tab>
                  </StaggerItem>
                </Stagger>

                {utilMode === "custom" ? (
                  <Reveal delay={0.03}>
                    <div className="mt-4">
                      <SmallField label="Утильсбор, ₽">
                        <input
                          value={utilCustom}
                          onChange={(e) => setUtilCustom(e.target.value)}
className={cx(inputCls, "text-center")}
                          placeholder="Напр. 3400"
                        />
                      </SmallField>
                    </div>
                  </Reveal>
                ) : utilMode === "benefit" ? (
                  <Reveal delay={0.03}>
                    <div className="mt-4">
                      {!calc.benefitEligible ? (
                        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-xs text-amber-100/90">
                          Льготный утиль не подходит по введённым данным (нужно ≤160 л.с. и ≤3000 см³). Выберите “По
                          таблице” или “Вручную”.
                        </div>
                      ) : (
                        <div className="text-sm text-white/80">
                          Поставим ориентир:{" "}
                          <span className="font-semibold text-white">
                            {age === "lt3" ? "3 400 ₽" : "5 200 ₽"}
                          </span>
                        </div>
                      )}
                    </div>
                  </Reveal>
                ) : (
                  <Reveal delay={0.03}>
                    <div className="mt-4 text-sm text-white/80">
                      По таблице:{" "}
                      <span className="font-semibold text-white">
                        {calc.utilRub ? `${fmt(Math.round(calc.utilRub))} ₽` : "0 ₽"}
                      </span>
                      <div className="mt-1 text-[11px] text-white/50">
                        Формула: 20 000 ₽ × коэффициент (по мощности/объёму/возрасту).
                      </div>
                    </div>
                  </Reveal>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.06}>
<div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-4 text-center">
                <div className="text-sm font-semibold text-white">Сборы</div>
                <div className="mt-1 text-xs text-white/55">
                  Если не уверены — оставьте 0 и уточним при оформлении.
                </div>

<Stagger className="mt-4 grid gap-3 sm:grid-cols-2 items-stretch" delay={0.03}>
  {/* LEFT */}
  <StaggerItem className="h-full">
    <div className="h-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <SmallField label="Сбор за операции, ₽">
        <input
          value={customsFeeRub}
          onChange={(e) => setCustomsFeeRub(e.target.value)}
          className={inputCls}
          placeholder="0"
        />
      </SmallField>
    </div>
  </StaggerItem>

  {/* RIGHT */}
  <StaggerItem className="h-full">
    <div className="h-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-center justify-center text-center text-xs text-white/60">
      Некоторые сборы зависят от режима и категории. Это поле — вручную.
    </div>
  </StaggerItem>
</Stagger>

              </div>
            </Reveal>
          </div>
        </StaggerItem>

        {/* RIGHT: results */}
        <StaggerItem>
<div className="h-fit rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-6 text-center">
            <Reveal>
<div className="text-center text-lg font-extrabold text-white">Итог</div>
<div className="mt-1 text-center text-xs text-white/55">
  Формула: цена + пошлина + утиль + сборы + доп. расходы.
</div>
            </Reveal>

            {!calc.ready ? (
              <Reveal delay={0.05}>
<div className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-4 text-center">
                  <div className="text-xs text-white/55">Заполните параметры</div>
                  <div className="mt-2 text-sm text-white/75">
                    Введите <b>цену</b>, <b>объём</b> и <b>мощность</b>, чтобы получить расчёт.
                  </div>
                  <div className="mt-3 text-3xl font-extrabold tracking-tight text-white">0 ₽</div>
                </div>
              </Reveal>
            ) : (
              <Stagger className="mt-6 space-y-3" delay={0.04}>
                <StaggerItem>
                  <Line label="Цена авто (в ₽)" value={`${fmt(Math.round(calc.priceRub))} ₽`} />
                </StaggerItem>

                <StaggerItem>
                  <Line
                    label="Пошлина (в €)"
                    value={`${fmt(Math.round(calc.dutyEur))} €`}
                    hint={
                      age === "lt3"
                        ? "До 3 лет: max(% от стоимости, минимум €/см³)"
                        : age === "3to5"
                        ? "3–5 лет: €/см³ по объёму"
                        : "Старше 5: €/см³ по объёму"
                    }
                  />
                </StaggerItem>

                <StaggerItem>
                  <Line label="Пошлина (в ₽)" value={`${fmt(Math.round(calc.dutyRub))} ₽`} />
                </StaggerItem>

                <StaggerItem>
                  <Line label="Утильсбор" value={`${fmt(Math.round(calc.utilRub))} ₽`} />
                </StaggerItem>

                <StaggerItem>
                  <Line label="Сборы" value={`${fmt(Math.round(calc.feeRub))} ₽`} />
                </StaggerItem>

                <StaggerItem>
                  <Line label="Доп. расходы" value={`${fmt(Math.round(calc.extra))} ₽`} />
                </StaggerItem>

                <StaggerItem>
                  <div className="my-4 h-px w-full bg-white/10" />
                </StaggerItem>

                <StaggerItem>
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="text-xs text-white/55">Итого (ориентир)</div>
                    <div className="mt-2 text-3xl font-extrabold tracking-tight text-white">
                      {fmt(Math.round(calc.totalRub))} ₽
                    </div>

                    <div className="mt-3 text-xs text-white/55">
                      Ввод: {calc.cc} см³ • {calc.hp} л.с. •{" "}
                      {age === "lt3" ? "младше 3" : age === "3to5" ? "3–5 лет" : "старше 5"} • Цена ≈{" "}
                      {fmt(Math.round(calc.priceEur))} €
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-white/55">
                    ⚠️ Ориентир. Финально зависит от подтверждённой таможенной стоимости и применимого режима.
                    <br />
                    ℹ️ Транспортный налог (ежегодный) сюда не входит — он зависит от региона.
                  </div>
                </StaggerItem>
              </Stagger>
            )}
          </div>
        </StaggerItem>
      </Stagger>

      <FAQ />
    </section>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-center">
      <div className="text-xs text-white/55">{label}</div>
      <div className="mt-2">{children}</div>
    </label>
  )
}

function SmallField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-center">
      <div className="text-[11px] text-white/50">{label}</div>
      <div className="mt-2">{children}</div>
    </label>
  )
}




function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "w-full h-9 sm:h-10 rounded-2xl border px-2 sm:px-3 text-[10px] sm:text-xs font-semibold text-center leading-none transition",
        active
          ? "border-brand-blue/40 bg-brand-blue/20 text-white"
          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
      )}
    >
      {children}
    </button>
  )
}


function Line({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div>
        <div className="text-xs text-white/55">{label}</div>
        {hint ? <div className="mt-1 text-[11px] text-white/40">{hint}</div> : null}
      </div>
      <div className="text-sm font-semibold text-white">{value}</div>
    </div>
  )
}

function FAQ() {
  const items = [
    {
      q: "Почему итог сначала 0 ₽?",
      a: "Чтобы не было “магических” цифр. Пока не введёшь цену/параметры — расчёт не выполняется.",
    },
    {
      q: "Почему льготный утиль иногда = 0?",
      a: "Потому что льгота обычно применима при личном пользовании и ограничениях, включая ≤160 л.с. и ≤3000 см³. Если условия не подходят — выбирай “По таблице” или “Вручную”.",
    },
    {
      q: "Это точный расчёт?",
      a: "Нет, это ориентир. Финально зависит от подтверждённой таможенной стоимости, документов, нюансов авто и режима оформления.",
    },
  ]

  const [open, setOpen] = useState<number>(0)

  return (
    <section className="space-y-4">
      <Reveal>
<div className="text-center text-2xl font-extrabold tracking-tight text-white">Вопросы и ответы</div>

      </Reveal>

      <Stagger className="space-y-3" delay={0.05}>
        {items.map((it, i) => {
          const isOpen = open === i
          return (
            <StaggerItem key={it.q} y={12}>
              <div className="rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
<div className="text-sm font-semibold text-white">{it.q}</div>
                  <div
                    className={cx(
  "grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-transparent text-white/60 transition",
  isOpen && "rotate-180"
)}


                  >
                    ⌄
                  </div>
                </button>

                {isOpen ? (
<div className="px-5 pb-5 text-sm leading-relaxed text-white/65">{it.a}</div>
                ) : null}
              </div>
            </StaggerItem>
          )
        })}
      </Stagger>
    </section>
  )
}
const inputCls =
  "h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-center text-sm text-white placeholder:text-white/35 outline-none transition focus:border-brand-blue"
