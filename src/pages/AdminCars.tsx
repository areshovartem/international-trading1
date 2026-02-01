    // src/pages/AdminCars.tsx
    import { useEffect, useMemo, useState } from "react"
    import type { Car } from "../data/cars"
    import Reveal from "../components/Reveal"
import { addAdminCar, deleteAdminCar, getAdminCars } from "../data/carsStore"

    function num(v: string, fallback = 0) {
    const x = Number(String(v).replace(",", ".").trim())
    return Number.isFinite(x) ? x : fallback
    }

    function uid() {
    return `a_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
    }

    const inputCls =
    "h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none focus:border-brand-blue"

    const labelCls = "text-xs text-white/55"
    const cardCls =
    "rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"

    type Draft = {
    title: string
    subtitle: string
    note: string
    country: Car["country"]
    condition: NonNullable<Car["condition"]> | ""
    brand: string
    model: string
    generation: string
    body: string
    transmission: string
    fuel: string
    drive: string
    year: string
    mileageKm: string
    volumeL: string
    deliveryDays: string
    priceRub: string
    images: string[]
    imgUrl: string
    }

    const empty: Draft = {
    title: "",
    subtitle: "",
    note: "",
    country: "Корея",
    condition: "",
    brand: "",
    model: "",
    generation: "",
    body: "",
    transmission: "",
    fuel: "",
    drive: "",
    year: "",
    mileageKm: "",
    volumeL: "",
    deliveryDays: "",
    priceRub: "",
    images: [],
    imgUrl: "",
    }

    export default function AdminCars() {
    const [draft, setDraft] = useState<Draft>(empty)
    const [adminCars, setAdminCars] = useState<Car[]>([])
    const [msg, setMsg] = useState<string>("")

    useEffect(() => {
        setAdminCars(getAdminCars())
    }, [])

    const canSave = useMemo(() => {
        return (
        draft.priceRub.trim() !== "" &&
        draft.year.trim() !== "" &&
        draft.mileageKm.trim() !== "" &&
        (draft.title.trim() !== "" || (draft.brand.trim() !== "" && draft.model.trim() !== "")) &&
        draft.images.length > 0
        )
    }, [draft])

    function set<K extends keyof Draft>(k: K, v: Draft[K]) {
        setDraft((p) => ({ ...p, [k]: v }))
    }

    function addUrlImage() {
        const u = draft.imgUrl.trim()
        if (!u) return
        setDraft((p) => ({ ...p, images: [...p.images, u], imgUrl: "" }))
    }

    async function onPickFiles(files: FileList | null) {
        if (!files?.length) return

        const toBase64 = (f: File) =>
        new Promise<string>((resolve, reject) => {
            const r = new FileReader()
            r.onload = () => resolve(String(r.result))
            r.onerror = reject
            r.readAsDataURL(f)
        })

        const arr: string[] = []
        for (const f of Array.from(files)) {
        // можно ограничить размер, если надо
        const b64 = await toBase64(f)
        arr.push(b64)
        }

        setDraft((p) => ({ ...p, images: [...p.images, ...arr] }))
    }

    function removeImage(i: number) {
        setDraft((p) => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }))
    }

    function saveCar() {
        setMsg("")
        if (!canSave) {
        setMsg("Заполни обязательные поля и добавь хотя бы 1 фото.")
        return
        }

        const car: Car = {
        id: uid(),
        title: draft.title.trim() || `${draft.brand.trim()} ${draft.model.trim()}`.trim(),
        subtitle: draft.subtitle.trim() || undefined,
        note: draft.note.trim() || undefined,

        country: draft.country,
        condition: (draft.condition || undefined) as any,

        brand: draft.brand.trim() || undefined,
        model: draft.model.trim() || undefined,
        generation: draft.generation.trim() || undefined,

        body: draft.body.trim() || undefined,
        transmission: draft.transmission.trim() || undefined,
        fuel: draft.fuel.trim() || undefined,
        drive: draft.drive.trim() || undefined,

        year: Math.max(1900, Math.floor(num(draft.year, 0))),
        mileageKm: Math.max(0, Math.floor(num(draft.mileageKm, 0))),
        volumeL: draft.volumeL.trim() ? Math.max(0, num(draft.volumeL, 0)) : undefined,
        deliveryDays: draft.deliveryDays.trim()
            ? Math.max(0, Math.floor(num(draft.deliveryDays, 0)))
            : undefined,

        priceRub: Math.max(0, Math.floor(num(draft.priceRub, 0))),
        images: draft.images,
        }

        addAdminCar(car)
        const next = [car, ...adminCars]
        setAdminCars(next)

        setDraft(empty)
        setMsg("Сохранено ✅ Теперь авто появится в каталоге.")
    }

    function removeCar(id: string) {
        deleteAdminCar(id)
        setAdminCars((p) => p.filter((c) => c.id !== id))
    }

    return (
        <section className="space-y-6">
        <Reveal>
            <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Админка • Каталог</h1>
            <p className="mt-2 text-sm text-white/60">
                Добавляй авто (фото, описание, цена и т.д.). Сейчас хранение — localStorage.
            </p>
            </div>
        </Reveal>

        {/* FORM */}
        <div className={cardCls}>
            <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-3">
                <div>
                <div className={labelCls}>Название (или оставь пустым — соберём из Марка+Модель)</div>
                <input value={draft.title} onChange={(e) => set("title", e.target.value)} className={inputCls} />
                </div>

                <div>
                <div className={labelCls}>Подзаголовок (optional)</div>
                <input value={draft.subtitle} onChange={(e) => set("subtitle", e.target.value)} className={inputCls} />
                </div>

                <div>
                <div className={labelCls}>Заметка (optional)</div>
                <input value={draft.note} onChange={(e) => set("note", e.target.value)} className={inputCls} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                <div>
                    <div className={labelCls}>Страна</div>
                    <select
                    value={draft.country}
                    onChange={(e) => set("country", e.target.value as any)}
                    className={inputCls}
                    >
                    <option value="Корея">Корея</option>
                    <option value="Китай">Китай</option>
                    <option value="Европа">Европа</option>
                    </select>
                </div>

                <div>
                    <div className={labelCls}>Состояние</div>
                    <select
                    value={draft.condition}
                    onChange={(e) => set("condition", e.target.value as any)}
                    className={inputCls}
                    >
                    <option value="">—</option>
                    <option value="Новые">Новые</option>
                    <option value="С пробегом">С пробегом</option>
                    </select>
                </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                <div>
                    <div className={labelCls}>Марка</div>
                    <input value={draft.brand} onChange={(e) => set("brand", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <div className={labelCls}>Модель</div>
                    <input value={draft.model} onChange={(e) => set("model", e.target.value)} className={inputCls} />
                </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                <div>
                    <div className={labelCls}>Поколение</div>
                    <input
                    value={draft.generation}
                    onChange={(e) => set("generation", e.target.value)}
                    className={inputCls}
                    />
                </div>
                <div>
                    <div className={labelCls}>Кузов</div>
                    <input value={draft.body} onChange={(e) => set("body", e.target.value)} className={inputCls} />
                </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                <div>
                    <div className={labelCls}>Коробка</div>
                    <input
                    value={draft.transmission}
                    onChange={(e) => set("transmission", e.target.value)}
                    className={inputCls}
                    />
                </div>
                <div>
                    <div className={labelCls}>Топливо</div>
                    <input value={draft.fuel} onChange={(e) => set("fuel", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <div className={labelCls}>Привод</div>
                    <input value={draft.drive} onChange={(e) => set("drive", e.target.value)} className={inputCls} />
                </div>
                </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                <div>
                    <div className={labelCls}>Цена (₽) *</div>
                    <input
                    value={draft.priceRub}
                    onChange={(e) => set("priceRub", e.target.value)}
                    className={inputCls}
                    inputMode="numeric"
                    placeholder="Напр. 2500000"
                    />
                </div>
                <div>
                    <div className={labelCls}>Год *</div>
                    <input
                    value={draft.year}
                    onChange={(e) => set("year", e.target.value)}
                    className={inputCls}
                    inputMode="numeric"
                    placeholder="Напр. 2021"
                    />
                </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                <div>
                    <div className={labelCls}>Пробег (км) *</div>
                    <input
                    value={draft.mileageKm}
                    onChange={(e) => set("mileageKm", e.target.value)}
                    className={inputCls}
                    inputMode="numeric"
                    placeholder="Напр. 35000"
                    />
                </div>
                <div>
                    <div className={labelCls}>Объём (л)</div>
                    <input
                    value={draft.volumeL}
                    onChange={(e) => set("volumeL", e.target.value)}
                    className={inputCls}
                    inputMode="decimal"
                    placeholder="Напр. 2.0"
                    />
                </div>
                <div>
                    <div className={labelCls}>Доставка (дн.)</div>
                    <input
                    value={draft.deliveryDays}
                    onChange={(e) => set("deliveryDays", e.target.value)}
                    className={inputCls}
                    inputMode="numeric"
                    placeholder="Напр. 14"
                    />
                </div>
                </div>

                {/* IMAGES */}
                <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">Фотографии *</div>
                <div className="mt-1 text-xs text-white/55">
                    Можно добавлять ссылками или файлами (файл сохранится как base64).
                </div>

                <div className="mt-3 flex gap-2">
                    <input
                    value={draft.imgUrl}
                    onChange={(e) => set("imgUrl", e.target.value)}
                    className={inputCls}
                    placeholder="Вставь URL картинки и нажми Добавить"
                    />
                    <button
                    type="button"
                    onClick={addUrlImage}
                    className="shrink-0 rounded-2xl bg-white px-4 text-sm font-extrabold text-black"
                    >
                    Добавить
                    </button>
                </div>

                <div className="mt-3">
                    <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => onPickFiles(e.target.files)}
                    className="block w-full text-sm text-white/70 file:mr-3 file:rounded-xl file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-white/15"
                    />
                </div>

                {draft.images.length ? (
                    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {draft.images.map((src, i) => (
                        <div key={src + i} className="relative overflow-hidden rounded-2xl border border-white/10">
                        <img src={src} className="h-24 w-full object-cover" />
                        <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute right-2 top-2 rounded-xl border border-white/10 bg-black/50 px-2 py-1 text-xs text-white/90"
                        >
                            ✕
                        </button>
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className="mt-3 text-xs text-white/50">Добавь хотя бы 1 фото.</div>
                )}
                </div>

                <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={saveCar}
                    disabled={!canSave}
                    className={[
                    "h-11 rounded-2xl px-5 text-sm font-extrabold",
                    canSave ? "bg-white text-black" : "bg-white/10 text-white/40",
                    ].join(" ")}
                >
                    Сохранить авто
                </button>

                {msg ? <div className="text-sm text-white/70">{msg}</div> : null}
                </div>
            </div>
            </div>
        </div>

        {/* LIST */}
        <div className={cardCls}>
            <div className="flex items-end justify-between gap-3">
            <div>
                <div className="text-lg font-extrabold text-white">Добавленные авто</div>
                <div className="mt-1 text-xs text-white/55">Это то, что лежит в localStorage.</div>
            </div>
            <div className="text-sm text-white/70">Всего: {adminCars.length}</div>
            </div>

            <div className="mt-4 space-y-3">
            {adminCars.length ? (
                adminCars.map((c) => (
                <div key={c.id} className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                    <div className="h-14 w-20 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        {c.images?.[0] ? <img src={c.images[0]} className="h-full w-full object-cover" /> : null}
                    </div>
                    <div>
                        <div className="font-semibold text-white">
                        {(c.brand ? `${c.brand} ` : "") + (c.model ?? c.title)}
                        </div>
                        <div className="text-xs text-white/55">
                        {c.year} • {c.mileageKm.toLocaleString("ru-RU")} км • {c.priceRub.toLocaleString("ru-RU")} ₽
                        </div>
                    </div>
                    </div>

                    <button
                    type="button"
                    onClick={() => removeCar(c.id)}
                    className="h-10 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white/80 hover:bg-white/10"
                    >
                    Удалить
                    </button>
                </div>
                ))
            ) : (
                <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-center text-white/60">
                Пока пусто.
                </div>
            )}
            </div>
        </div>
        </section>
    )
    }
