import Hero from "../components/home/Hero"
import PopularCars from "../components/home/PopularCars"
import Steps from "../components/home/Steps"
import AboutBlock from "../components/home/AboutBlock"

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />

      <AboutBlock />
      <Steps />
    </div>
  )
}

