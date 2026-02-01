import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import CarPage from "./pages/CarPage"
import Contacts from "./pages/Contacts"
import Calculator from "./pages/Calculator"
import ScrollToTop from "./components/ScrollToTop"
import About from "./pages/About"
import AdminCars from "./pages/AdminCars"



export default function App() {
  return (
    <BrowserRouter>
      {/* 👇 ВОТ ЭТА СТРОКА ОБЯЗАТЕЛЬНА */}
      <ScrollToTop />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CarPage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminCars />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

<Route
  path="*"
  element={
    <div className="mx-auto max-w-6xl px-6 py-10 text-white/70">
      Страница не найдена
    </div>
  }
/>
