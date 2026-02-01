import { motion, useInView } from "framer-motion"
import { useRef } from "react"

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
