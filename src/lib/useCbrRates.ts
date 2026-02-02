import { useEffect, useState } from "react"

type Rates = {
  USD: number
  EUR: number
  CNY: number
  KRW: number
}

export function useCbrRates() {
  const [rates, setRates] = useState<Rates | null>(null)
  const [date, setDate] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((r) => r.json())
      .then((d) => {
        setRates({
          USD: d.Valute.USD.Value,
          EUR: d.Valute.EUR.Value,
          CNY: d.Valute.CNY.Value,
          KRW: d.Valute.KRW.Value / 1000, // ЦБ даёт за 1000 вон
        })
        setDate(d.Date.slice(0, 10))
        setLoading(false)
      })
      .catch(() => {
        setError("CBR fetch error")
        setLoading(false)
      })
  }, [])

  return { rates, date, loading, error }
}
