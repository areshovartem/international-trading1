// src/data/cars.ts

export type Car = {
  id: string
  title: string
  subtitle?: string
  country: "Корея" | "Китай" | "Европа"
  year: number
  mileageKm: number
  priceRub: number
  deliveryDays?: number
  note?: string
  contacts?: { tg: string; phone: string; label?: string }[]
  images: string[]

  brand?: string
  model?: string
  generation?: string
  body?: string
  transmission?: string
  fuel?: string
  drive?: string
  volumeL?: number
  condition?: "Новые" | "С пробегом"
}


// ======================
// BMW 320i (папка: src/assets/cars/bmw320i/  файлы: 1.jpg ... 7.jpg)
import bmw1 from "../assets/cars/bmw320i/1.jpg"
import bmw2 from "../assets/cars/bmw320i/2.jpg"
import bmw3 from "../assets/cars/bmw320i/3.jpg"
import bmw4 from "../assets/cars/bmw320i/4.jpg"
import bmw5 from "../assets/cars/bmw320i/5.jpg"
import bmw6 from "../assets/cars/bmw320i/6.jpg"
import bmw7 from "../assets/cars/bmw320i/7.jpg"

// Audi A3 (папка: src/assets/cars/audia3/  файлы: audi1.jpg ... audi7.jpg)
import audi1 from "../assets/cars/audia3/audi1.jpg"
import audi2 from "../assets/cars/audia3/audi2.jpg"
import audi3 from "../assets/cars/audia3/audi3.jpg"
import audi4 from "../assets/cars/audia3/audi4.jpg"
import audi5 from "../assets/cars/audia3/audi5.jpg"
import audi6 from "../assets/cars/audia3/audi6.jpg"
import audi7 from "../assets/cars/audia3/audi7.jpg"

// Kia K5 (папка: src/assets/cars/kia/  файлы: k1.jpg ... k10.jpg)
import k1 from "../assets/cars/kia/k1.jpg"
import k2 from "../assets/cars/kia/k2.jpg"
import k3 from "../assets/cars/kia/k3.jpg"
import k4 from "../assets/cars/kia/k4.jpg"
import k5 from "../assets/cars/kia/k5.jpg"
import k6 from "../assets/cars/kia/k6.jpg"
import k7 from "../assets/cars/kia/k7.jpg"
import k8 from "../assets/cars/kia/k8.jpg"
import k9 from "../assets/cars/kia/k9.jpg"
import k10 from "../assets/cars/kia/k10.jpg"

// ======================
// Volkswagen Jetta (папка: src/assets/cars/jetta/  файлы: jetta1.jpg ... jetta10.jpg)
import jetta1 from "../assets/cars/jetta/jetta1.jpg"
import jetta2 from "../assets/cars/jetta/jetta2.jpg"
import jetta3 from "../assets/cars/jetta/jetta3.jpg"
import jetta4 from "../assets/cars/jetta/jetta4.jpg"
import jetta5 from "../assets/cars/jetta/jetta5.jpg"
import jetta6 from "../assets/cars/jetta/jetta6.jpg"
import jetta7 from "../assets/cars/jetta/jetta7.jpg"
import jetta8 from "../assets/cars/jetta/jetta8.jpg"
import jetta9 from "../assets/cars/jetta/jetta9.jpg"
import jetta10 from "../assets/cars/jetta/jetta10.jpg"

// Skoda (папка: src/assets/cars/skoda/  файлы: skoda1.jpg ... skoda10.jpg)
import skoda1 from "../assets/cars/skoda/skoda1.jpg"
import skoda2 from "../assets/cars/skoda/skoda2.jpg"
import skoda3 from "../assets/cars/skoda/skoda3.jpg"
import skoda4 from "../assets/cars/skoda/skoda4.jpg"
import skoda5 from "../assets/cars/skoda/skoda5.jpg"
import skoda6 from "../assets/cars/skoda/skoda6.jpg"
import skoda7 from "../assets/cars/skoda/skoda7.jpg"
import skoda8 from "../assets/cars/skoda/skoda8.jpg"
import skoda9 from "../assets/cars/skoda/skoda9.jpg"
import skoda10 from "../assets/cars/skoda/skoda10.jpg"

// BMW 520i (папка: src/assets/cars/bmw520i/  файлы: 520i1.jpg ... 520i7.jpg)
import bmw520i1 from "../assets/cars/bmw520i/520i1.jpg"
import bmw520i2 from "../assets/cars/bmw520i/520i2.jpg"
import bmw520i3 from "../assets/cars/bmw520i/520i3.jpg"
import bmw520i4 from "../assets/cars/bmw520i/520i4.jpg"
import bmw520i5 from "../assets/cars/bmw520i/520i5.jpg"
import bmw520i6 from "../assets/cars/bmw520i/520i6.jpg"
import bmw520i7 from "../assets/cars/bmw520i/520i7.jpg"

// Hyundai (папка: src/assets/cars/hyundai/  файлы: hyundai1.jpg ... hyundai7.jpg)
import hyundai1 from "../assets/cars/hyundai/hyundai1.jpg"
import hyundai2 from "../assets/cars/hyundai/hyundai2.jpg"
import hyundai3 from "../assets/cars/hyundai/hyundai3.jpg"
import hyundai4 from "../assets/cars/hyundai/hyundai4.jpg"
import hyundai5 from "../assets/cars/hyundai/hyundai5.jpg"
import hyundai6 from "../assets/cars/hyundai/hyundai6.jpg"
import hyundai7 from "../assets/cars/hyundai/hyundai7.jpg"

// BMW 320d (папка: src/assets/cars/bmw320d/  файлы: bmw320d1.jpg ... bmw320d7.jpg)
import bmw320d1 from "../assets/cars/bmw320d/bmw320d1.jpg"
import bmw320d2 from "../assets/cars/bmw320d/bmw320d2.jpg"
import bmw320d3 from "../assets/cars/bmw320d/bmw320d3.jpg"
import bmw320d4 from "../assets/cars/bmw320d/bmw320d4.jpg"
import bmw320d5 from "../assets/cars/bmw320d/bmw320d5.jpg"
import bmw320d6 from "../assets/cars/bmw320d/bmw320d6.jpg"
import bmw320d7 from "../assets/cars/bmw320d/bmw320d7.jpg"

// Mercedes CLE200 (папка: src/assets/cars/cle200/  файлы: cle200_1.jpg ... cle200_10.jpg)
import cle1 from "../assets/cars/cle200/cle200_1.jpg"
import cle2 from "../assets/cars/cle200/cle200_2.jpg"
import cle3 from "../assets/cars/cle200/cle200_3.jpg"
import cle4 from "../assets/cars/cle200/cle200_4.jpg"
import cle5 from "../assets/cars/cle200/cle200_5.jpg"
import cle6 from "../assets/cars/cle200/cle200_6.jpg"
import cle7 from "../assets/cars/cle200/cle200_7.jpg"
import cle8 from "../assets/cars/cle200/cle200_8.jpg"
import cle9 from "../assets/cars/cle200/cle200_9.jpg"
import cle10 from "../assets/cars/cle200/cle200_10.jpg"

// Porsche (папка: src/assets/cars/porsche/  файлы: porsche1.jpg ... porsche8.jpg)
import porsche1 from "../assets/cars/porsche/porsche1.jpg"
import porsche2 from "../assets/cars/porsche/porsche2.jpg"
import porsche3 from "../assets/cars/porsche/porsche3.jpg"
import porsche4 from "../assets/cars/porsche/porsche4.jpg"
import porsche5 from "../assets/cars/porsche/porsche5.jpg"
import porsche6 from "../assets/cars/porsche/porsche6.jpg"
import porsche7 from "../assets/cars/porsche/porsche7.jpg"
import porsche8 from "../assets/cars/porsche/porsche8.jpg"

// Audi S3 (папка: src/assets/cars/audis3/  файлы: audis3_1.jpg ... audis3_8.jpg)
import s3_1 from "../assets/cars/audis3/audis3_1.jpg"
import s3_2 from "../assets/cars/audis3/audis3_2.jpg"
import s3_3 from "../assets/cars/audis3/audis3_3.jpg"
import s3_4 from "../assets/cars/audis3/audis3_4.jpg"
import s3_5 from "../assets/cars/audis3/audis3_5.jpg"
import s3_6 from "../assets/cars/audis3/audis3_6.jpg"
import s3_7 from "../assets/cars/audis3/audis3_7.jpg"
import s3_8 from "../assets/cars/audis3/audis3_8.jpg"

// Volkswagen (папка: src/assets/cars/volkswagen/  файлы: vol1.jpg ... vol9.jpg)
import vol1 from "../assets/cars/volkswagen/vol1.jpg"
import vol2 from "../assets/cars/volkswagen/vol2.jpg"
import vol3 from "../assets/cars/volkswagen/vol3.jpg"
import vol4 from "../assets/cars/volkswagen/vol4.jpg"
import vol5 from "../assets/cars/volkswagen/vol5.jpg"
import vol6 from "../assets/cars/volkswagen/vol6.jpg"
import vol7 from "../assets/cars/volkswagen/vol7.jpg"
import vol8 from "../assets/cars/volkswagen/vol8.jpg"
import vol9 from "../assets/cars/volkswagen/vol9.jpg"

// ======================

export const cars: Car[] = [
  // ======= ТВОИ 3 ТЕКУЩИЕ =======
  {
    id: "1",
    title: "BMW 320i (156 л.с.)",
    subtitle: "Из Китая",
    country: "Китай",
    year: 2022,
    mileageKm: 59000,
    priceRub: 2800000,
    deliveryDays: 55,
    note: "Цены могут меняться из-за курса. Актуальность уточняйте на момент обращения.",
    contacts: [
      { tg: "@kazekodaily", phone: "+7 918 161-93-93", label: "Пишите менеджеру" },
      { tg: "@avazhunch00", phone: "+7 918 160-65-85", label: "Пишите менеджеру" },
    ],
    images: [bmw1, bmw2, bmw3, bmw4, bmw5, bmw6, bmw7],
    brand: "BMW",
    model: "320i",
    body: "Седан",
    transmission: "Автомат",
    fuel: "Бензин",
    drive: "Задний",
    condition: "С пробегом",
    volumeL: 2.0,
  },
  {
    id: "2",
    title: "Audi A3 Sedan (150 л.с.)",
    subtitle: "Из Китая",
    country: "Китай",
    year: 2021,
    mileageKm: 40000,
    priceRub: 2190000,
    note: "Доставка до вашего города просчитывается индивидуально.",
    contacts: [
      { tg: "@kazekodaily", phone: "+7 918 161-93-93", label: "Пишите менеджеру" },
      { tg: "@avazhunch00", phone: "+7 918 160-65-85", label: "Пишите менеджеру" },
    ],
    images: [audi1, audi2, audi3, audi4, audi5, audi6, audi7],
    brand: "Audi",
    model: "A3",
    generation: "Sedan",
    body: "Седан",
    transmission: "Автомат",
    fuel: "Бензин",
    drive: "Передний",
    condition: "С пробегом",
    volumeL: 1.4,
  },
  {
    id: "3",
    title: "Kia K5 Signature (180 лс)",
    subtitle: "Без окрасов",
    country: "Корея",
    year: 2024,
    mileageKm: 33000,
    priceRub: 4140000,
    deliveryDays: 35,
    note: "Из-за волатильности курса цены могут меняться — актуальность уточняйте у менеджера на момент обращения.",
    contacts: [{ tg: "@gorbenko_stas", phone: "+7 999 638-79-29", label: "Пишите менеджеру" }],
    images: [k1, k2, k3, k4, k5, k6, k7, k8, k9, k10],
    brand: "Kia",
    model: "K5",
    body: "Седан",
    transmission: "Автомат",
    fuel: "Бензин",
    drive: "Передний",
    condition: "С пробегом",
    volumeL: 2.0,
  },

  // ======= +10 НОВЫХ =======

  {
    id: "4",
    title: "Volkswagen Jetta (150 л.с.)",
    subtitle: "Немецкая сборка",
    country: "Китай",
    year: 2020,
    mileageKm: 64000,
    priceRub: 2060000,
    deliveryDays: 35,
    note: "Из-за волатильности курса цены могут меняться — актуальность уточняйте на момент обращения.",
    contacts: [{ tg: "@gorbenko_stas", phone: "+7 999 638-79-29", label: "Пишите менеджеру" }],
    images: [jetta1, jetta2, jetta3, jetta4, jetta5, jetta6, jetta7, jetta8, jetta9, jetta10],
    brand: "Volkswagen",
    model: "Jetta",
    body: "Седан",
    transmission: "Автомат",
    fuel: "Бензин",
    drive: "Передний",
    condition: "С пробегом",
    volumeL: 1.4,
  },

  {
    id: "5",
    title: "Skoda Kodiaq (186 л.с.)",
    subtitle: "С пробегом",
    country: "Китай",
    year: 2024,
    mileageKm: 20000,
    priceRub: 3490000,
    deliveryDays: 55,
    note: "Срок поставки в Москву — 55 дней. Актуальность уточняйте у менеджера.",
    contacts: [{ tg: "@Daviduniversal", phone: "+7 999 632-50-07", label: "Пишите менеджеру" }],
    images: [skoda1, skoda2, skoda3, skoda4, skoda5, skoda6, skoda7, skoda8, skoda9, skoda10],
    brand: "Skoda",
    model: "Kodiaq",
    body: "Кроссовер",
    transmission: "Автомат",
    fuel: "Бензин",
    drive: "Полный",
    condition: "С пробегом",
    volumeL: 2.0,
  },

  {
    id: "7",
    title: "BMW 520i M Sport (190 л.с.)",
    subtitle: "Из Кореи",
    country: "Корея",
    year: 2024,
    mileageKm: 22000,
    priceRub: 5440000,
    deliveryDays: 40,
    note: "Из-за волатильности курса цены могут меняться — актуальность уточняйте на момент обращения.",
    contacts: [
      { tg: "@kazekodaily", phone: "+7 918 161-93-93", label: "Пишите менеджеру" },
      { tg: "@avazhunch00", phone: "+7 918 160-65-85", label: "Пишите менеджеру" },
    ],
    images: [bmw520i1, bmw520i2, bmw520i3, bmw520i4, bmw520i5, bmw520i6, bmw520i7],
    brand: "BMW",
    model: "520i",
    generation: "M Sport",
    body: "Седан",
    transmission: "Автомат",
    fuel: "Бензин",
    drive: "Задний",
    condition: "С пробегом",
    volumeL: 2.0,
  },

  {
    id: "8",
    title: "Hyundai Tucson 1.6 Diesel",
    subtitle: "Из Южной Кореи",
    country: "Корея",
    year: 2020,
    mileageKm: 75000,
    priceRub: 1880000,
    deliveryDays: 35,
    note: "Доставка до вашего города рассчитывается индивидуально.",
    contacts: [
      { tg: "@kazekodaily", phone: "+7 918 161-93-93", label: "Пишите менеджеру" },
      { tg: "@avazhunch00", phone: "+7 918 160-65-85", label: "Пишите менеджеру" },
    ],
    images: [hyundai1, hyundai2, hyundai3, hyundai4, hyundai5, hyundai6, hyundai7],
    brand: "Hyundai",
    model: "Tucson",
    body: "Кроссовер",
    transmission: "Автомат",
    fuel: "Дизель",
    drive: "Полный",
    condition: "С пробегом",
    volumeL: 1.6,
  },

  {
    id: "9",
    title: "BMW 320d M Sport",
    subtitle: "Из Южной Кореи",
    country: "Корея",
    year: 2025,
    mileageKm: 19000,
    priceRub: 4850000,
    deliveryDays: 35,
    note: "Из-за волатильности курса цены могут меняться — актуальность уточняйте на момент обращения.",
    contacts: [
      { tg: "@kazekodaily", phone: "+7 918 161-93-93", label: "Пишите менеджеру" },
      { tg: "@avazhunch00", phone: "+7 918 160-65-85", label: "Пишите менеджеру" },
    ],
    images: [bmw320d1, bmw320d2, bmw320d3, bmw320d4, bmw320d5, bmw320d6, bmw320d7],
    brand: "BMW",
    model: "320d",
    generation: "M Sport",
    body: "Седан",
    transmission: "Автомат",
    fuel: "Дизель",
    drive: "Задний",
    condition: "С пробегом",
    volumeL: 2.0,
  },

  {
    id: "10",
    title: "Mercedes CLE 200 (204 лс)",
    subtitle: "Новый авто",
    country: "Корея",
    year: 2025,
    mileageKm: 4000,
    priceRub: 6180000,
    deliveryDays: 45,
    note: "Цены могут меняться из-за курса. Актуальность уточняйте у менеджера на момент обращения.",
    contacts: [{ tg: "@gorbenko_stas", phone: "+7 999 638-79-29", label: "Пишите менеджеру" }],
    images: [cle1, cle2, cle3, cle4, cle5, cle6, cle7, cle8, cle9, cle10],
    brand: "Mercedes",
    model: "CLE 200",
    body: "Купе",
    transmission: "Автомат",
    fuel: "Бензин",
    drive: "Задний",
    condition: "Новые",
    volumeL: 2.0,
  },

  {
    id: "11",
    title: "Porsche 992 4 GTS",
    subtitle: "Полный привод",
    country: "Европа",
    year: 2022,
    mileageKm: 7500,
    priceRub: 16880000,
    deliveryDays: 35,
    note: "Из-за волатильности курса цены могут меняться — актуальность уточняйте на момент обращения.",
    contacts: [
      { tg: "@kazekodaily", phone: "+7 918 161-93-93", label: "Пишите менеджеру" },
      { tg: "@avazhunch00", phone: "+7 918 160-65-85", label: "Пишите менеджеру" },
    ],
    images: [porsche1, porsche2, porsche3, porsche4, porsche5, porsche6, porsche7, porsche8],
    brand: "Porsche",
    model: "911 (992) 4 GTS",
    body: "Купе",
    transmission: "Робот",
    fuel: "Бензин",
    drive: "Полный",
    condition: "С пробегом",
    volumeL: 3.0,
  },

  {
    id: "12",
    title: "Audi S3 Quattro (310 лс)",
    subtitle: "Без ДТП",
    country: "Корея",
    year: 2022,
    mileageKm: 3000,
    priceRub: 5920000,
    deliveryDays: 35,
    note: "Из-за волатильности курса цены могут меняться — актуальность уточняйте на момент обращения.",
    contacts: [{ tg: "@gorbenko_stas", phone: "+7 999 638-79-29", label: "Пишите менеджеру" }],
    images: [s3_1, s3_2, s3_3, s3_4, s3_5, s3_6, s3_7, s3_8],
    brand: "Audi",
    model: "S3",
    generation: "Quattro",
    body: "Седан",
    transmission: "Робот",
    fuel: "Бензин",
    drive: "Полный",
    condition: "С пробегом",
    volumeL: 2.0,
  },

  {
    id: "13",
    title: "Volkswagen Tharu (150 л.с.)",
    subtitle: "Без ДТП и окрасов",
    country: "Китай",
    year: 2021,
    mileageKm: 40000,
    priceRub: 1760000,
    deliveryDays: 55,
    note: "Срок поставки в Москву — 55 дней. Актуальность уточняйте у менеджера.",
    contacts: [{ tg: "@Daviduniversal", phone: "+7 999 632-50-07", label: "Пишите менеджеру" }],
    images: [vol1, vol2, vol3, vol4, vol5, vol6, vol7, vol8, vol9],
    brand: "Volkswagen",
    model: "Tharu",
    body: "Кроссовер",
    transmission: "Автомат",
    fuel: "Бензин",
    drive: "Передний",
    condition: "С пробегом",
    volumeL: 1.4,
  },
]
