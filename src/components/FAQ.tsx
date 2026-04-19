import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "В каких регионах вы работаете?",
    answer:
      "Работаем по всей России. Производство расположено в центральном регионе, но обеспечиваем доставку и монтаж в любую точку страны. Стоимость логистики обсуждается индивидуально в зависимости от объекта и расстояния.",
  },
  {
    question: "Сколько времени занимает изготовление и монтаж?",
    answer:
      "Сроки зависят от сложности и объёма объекта. Типовой склад площадью до 2000 м² — от 45 до 90 дней с момента подписания договора. Сроки фиксируются в договоре и соблюдаются.",
  },
  {
    question: "Вы делаете только каркас или весь объект под ключ?",
    answer:
      "Наша специализация — металлический каркас: проектирование, производство и монтаж несущих конструкций. Ограждающие конструкции (стены, кровля, ворота) можем выполнить самостоятельно или организовать в рамках единого контракта с проверенными субподрядчиками.",
  },
  {
    question: "Соответствуют ли конструкции строительным нормам?",
    answer:
      "Все конструкции проектируются и производятся в соответствии с действующими нормами: СП 16.13330 (стальные конструкции), ГОСТ на сварные соединения, нормы снеговых и ветровых нагрузок по регионам. Предоставляем полный пакет документации.",
  },
  {
    question: "Как рассчитывается стоимость?",
    answer:
      "Стоимость зависит от размеров пролётов, нагрузок, типа объекта и региона монтажа. Мы готовим предварительный расчёт бесплатно — достаточно оставить заявку и указать основные параметры объекта.",
  },
  {
    question: "Как начать сотрудничество?",
    answer:
      "Оставьте заявку на сайте или позвоните нам. Мы уточним параметры объекта, подготовим предварительный расчёт и коммерческое предложение. После согласования — заключаем договор и запускаем проектирование.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
