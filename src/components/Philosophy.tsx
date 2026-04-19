import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Точность в каждом узле",
    description:
      "Проектируем с допуском до миллиметра. Каждое соединение, каждая балка рассчитаны так, чтобы служить десятилетиями без лишних затрат.",
  },
  {
    title: "От задачи до каркаса",
    description:
      "Берём на себя полный цикл: проектирование, производство и монтаж. Один подрядчик — единая ответственность на всех этапах.",
  },
  {
    title: "Скорость без компромиссов",
    description:
      "Собственное производство позволяет контролировать сроки. Металлоконструкции поставляем вовремя — строительный сезон не ждёт.",
  },
  {
    title: "Инженерная надёжность",
    description: "Все конструкции проходят инженерный расчёт и соответствуют нормам СП и ГОСТ. Здания, которые стоят при любых нагрузках.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наш подход</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Сталь с
              <br />
              <HighlightedText>характером</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="https://cdn.poehali.dev/projects/23f29599-2008-47dd-a17d-c3ab2be82701/files/7e532c56-ae73-46f8-93aa-e75b0b996e99.jpg"
                alt="Каркас металлоконструкций"
                className="opacity-90 relative z-10 w-auto rounded-lg"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Металлоконструкции — это не просто сталь и болты. Это несущая основа бизнеса. Мы строим каркасы, которые держат производство, логистику и торговлю.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}