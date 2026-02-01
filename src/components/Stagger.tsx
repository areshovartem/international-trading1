import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function Stagger({
  children,
  className,
  once = true,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  once?: boolean
  delay?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  y = 14,
}: {
  children: React.ReactNode
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(6px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
