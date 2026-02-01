// src/data/carsStore.ts
import { cars, type Car } from "./cars"

const KEY = "adminCars.v1"

function read(): Car[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]")
  } catch {
    return []
  }
}

function write(list: Car[]) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function getAdminCars(): Car[] {
  return read()
}

export function addAdminCar(car: Car) {
  write([car, ...read()])
  window.dispatchEvent(new Event("carsStoreUpdated"))
}

export function deleteAdminCar(id: string) {
  write(read().filter((c) => c.id !== id))
  window.dispatchEvent(new Event("carsStoreUpdated"))
}

export function getAllCars(): Car[] {
  return [...read(), ...cars]
}
