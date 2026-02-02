import Hero from "../components/home/Hero"
import AboutBlock from "../components/home/AboutBlock"
import Steps from "../components/home/Steps"
import VideosCarousel from "../components/home/VideosCarousel"

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />

      <AboutBlock />

      {/* Как мы работаем */}
      <Steps />

      {/* ✅ ВОТ ТУТ СРАЗУ ПОСЛЕ Steps */}
      <VideosCarousel
        items={[
          { title: "Как мы выкупаем авто", youtubeId: "Slyp-IMGkB4" },
          { title: "Доставка и логистика", youtubeId: "BBrkqsytbSA" },
          { title: "Осмотр и проверка", youtubeId: "FN0zu2VpIwY" },
        ]}
      />
    </div>
  )
}
