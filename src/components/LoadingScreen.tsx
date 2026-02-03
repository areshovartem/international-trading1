import React from "react"
import { createPortal } from "react-dom"

export default function LoadingScreen({ visible }: { visible: boolean }) {
  return createPortal(
    <div
      className={[
        "fixed left-0 top-0 z-[99999] flex items-center justify-center bg-[#070B14]",
        "w-[100vw]",
        "transition-all duration-700 ease-out",
        visible
          ? "opacity-100 scale-100 blur-0"
          : "opacity-0 scale-[1.12] blur-[14px] pointer-events-none",
      ].join(" ")}
      style={{
        // ключевое: высота от visualViewport через переменную
        height: "var(--app-vh, 100dvh)",
        transformOrigin: "50% 40%",
        // на всякий: чтобы вообще ничто не влияло
        margin: 0,
      }}
    >
      <div className="w-full px-6 text-center">
        <div className="select-none">
          <div className="font-extrabold text-white/95 drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            <span className="it-3d text-[clamp(18px,6vw,36px)] tracking-[0.30em] sm:tracking-[0.35em]">
              INTERNATIONAL
            </span>
          </div>

          <div className="mt-2 font-semibold text-white/70">
            <span className="it-3d-sub text-[clamp(11px,3vw,16px)] tracking-[0.50em] sm:tracking-[0.55em]">
              TRADING
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .it-3d{
          background: linear-gradient(180deg, #ffffff 0%, #cfe2ff 45%, #88b7ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow:
            0 1px 0 rgba(255,255,255,0.10),
            0 2px 0 rgba(0,0,0,0.25),
            0 6px 12px rgba(0,0,0,0.55),
            0 18px 35px rgba(0,0,0,0.65);
        }
        .it-3d-sub{
          text-shadow:
            0 2px 0 rgba(0,0,0,0.35),
            0 10px 25px rgba(0,0,0,0.65);
        }
      `}</style>
    </div>,
    document.body
  )
}
