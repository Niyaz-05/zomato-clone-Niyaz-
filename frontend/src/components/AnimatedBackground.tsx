import { motion } from "framer-motion"

const gradients = [
  {
    className: "top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-rose-500/30",
    duration: 16,
    delay: 0,
  },
  {
    className: "bottom-[-20%] right-[-10%] w-[45rem] h-[45rem] bg-orange-400/25",
    duration: 20,
    delay: 2,
  },
  {
    className: "top-[20%] right-[20%] w-[30rem] h-[30rem] bg-purple-500/20",
    duration: 18,
    delay: 1,
  },
]

export const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.15),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(251,146,60,0.15),_transparent_60%)]" />

      {gradients.map((gradient, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${gradient.className}`}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{
            duration: gradient.duration,
            repeat: Infinity,
            delay: gradient.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 opacity-[0.15] [background-size:160px_160px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] dark:opacity-[0.08]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white dark:via-slate-900/30 dark:to-slate-950" />
    </div>
  )
}

