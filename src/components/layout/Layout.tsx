import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Header />

<main className="mx-auto w-full max-w-6xl px-3 pt-4 pb-8 sm:px-4 md:px-10 md:pt-12">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
