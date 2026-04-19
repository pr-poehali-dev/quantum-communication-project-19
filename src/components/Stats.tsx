import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 150, suffix: "+", label: "реализованных объектов" },
  { value: 2025 - 2011, suffix: "", label: "лет на рынке" },
  { value: 60, suffix: " м", label: "максимальный пролёт" },
  { value: 100, suffix: "%", label: "собственное производство" },
]

function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])
  return count
}

function StatItem({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(value, 1800, active)
  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl font-medium tracking-tight mb-2">
        {count}{suffix}
      </div>
      <div className="text-muted-foreground text-sm uppercase tracking-[0.2em]">{label}</div>
    </div>
  )
}

export function Stats() {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 border-y border-border bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}
