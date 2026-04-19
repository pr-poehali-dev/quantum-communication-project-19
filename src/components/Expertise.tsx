import { useEffect, useRef, useState } from "react"
import Icon from "@/components/ui/icon"
import { HighlightedText } from "./HighlightedText"

const expertiseAreas = [
  {
    title: "Проектирование",
    description: "Разрабатываем рабочую документацию, расчёты и чертежи под конкретный объект. Работаем с нестандартными пролётами и нагрузками.",
    icon: "Ruler",
  },
  {
    title: "Производство",
    description:
      "Собственный завод металлоконструкций. Контроль качества на всех этапах — от заготовки до сборки и антикоррозионной обработки.",
    icon: "Factory",
  },
  {
    title: "Монтаж",
    description:
      "Собственные монтажные бригады с опытом на сложных объектах. Соблюдаем технологию и сроки — работаем по всей России.",
    icon: "HardHat",
  },
  {
    title: "Типы объектов",
    description:
      "Склады, ангары, производственные цеха, торговые здания, технические сооружения. Пролёты до 60 м без промежуточных опор.",
    icon: "Building2",
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
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
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши услуги</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Полный цикл</HighlightedText> —
            <br />
            один подрядчик
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            От технического задания до готового каркаса на площадке — всё в одних руках. Никаких стыков ответственности между проектировщиком, заводом и монтажниками.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => {
            return (
              <div
                key={area.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <Icon name={area.icon} size={40} className="mb-4 text-foreground" strokeWidth={1.25} />
                </div>
                <h3 className="text-xl font-medium mb-4">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
