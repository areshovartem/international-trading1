import { useEffect, useState } from "react"
import { HashRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import CarPage from "./pages/CarPage"
import Contacts from "./pages/Contacts"
import Calculator from "./pages/Calculator"
import ScrollToTop from "./components/ScrollToTop"
import About from "./pages/About"
import AdminCars from "./pages/AdminCars"
import CursorGlow from "./components/CursorGlow"
import LoadingScreen from "./components/LoadingScreen"




export function useAppVh() {
  useEffect(() => {
    const set = () => {
  const vv = window.visualViewport;
  const h = vv ? vv.height : window.innerHeight;
  document.documentElement.style.setProperty("--app-vh", `${h}px`);
};

set();
window.addEventListener("resize", set);
window.addEventListener("orientationchange", set);
window.visualViewport?.addEventListener("resize", set);
window.visualViewport?.addEventListener("scroll", set);

return () => {
  window.removeEventListener("resize", set);
  window.removeEventListener("orientationchange", set);
  window.visualViewport?.removeEventListener("resize", set);
  window.visualViewport?.removeEventListener("scroll", set);
};

  }, []);
}


export default function App() {

  useAppVh();

  const [visible, setVisible] = useState(true)
const [mounted, setMounted] = useState(true)

useEffect(() => {
  const MIN_MS = 1500
  const FADE_MS = 900

  const t1 = setTimeout(() => setVisible(false), MIN_MS)
  const t2 = setTimeout(() => setMounted(false), MIN_MS + FADE_MS)

  return () => {
    clearTimeout(t1)
    clearTimeout(t2)
  }
}, [])

  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const MIN_MS = 1500 // <-- тут меняй время (мс)

    const t = setTimeout(() => setShowLoader(false), MIN_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <HashRouter>
{mounted && <LoadingScreen visible={visible} />}

      <ScrollToTop />
      <CursorGlow />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CarPage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminCars />} />
          <Route
            path="*"
            element={
              <div className="mx-auto max-w-6xl px-6 py-10 text-white/70">
                Страница не найдена
              </div>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  )
}
