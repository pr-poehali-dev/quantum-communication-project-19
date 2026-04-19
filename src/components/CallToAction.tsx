import { useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const SEND_FORM_URL = "https://functions.poehali.dev/21ce14e7-a98f-49d3-b8f3-18e4a80761c2"

export function CallToAction() {
  const [form, setForm] = useState({ name: "", phone: "", object: "", comment: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch(SEND_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Ошибка отправки")
      setSent(true)
    } catch {
      setError("Не удалось отправить заявку. Позвоните нам напрямую.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-32 md:py-29 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Запрос на расчёт</p>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8 text-balance">
              Расскажите
              <br />
              о вашем <HighlightedText>объекте</HighlightedText>
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-12 max-w-md">
              Оставьте заявку — мы свяжемся, уточним параметры и подготовим предварительный расчёт бесплатно.
            </p>

            <div className="space-y-6 text-primary-foreground/70">
              <div className="flex items-center gap-4">
                <Icon name="Phone" size={18} className="text-orange-300 flex-shrink-0" />
                <a href="tel:+78001234567" className="hover:text-primary-foreground transition-colors">
                  +7 (800) 123-45-67
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Icon name="Mail" size={18} className="text-orange-300 flex-shrink-0" />
                <a href="mailto:info@zmk-sk.ru" className="hover:text-primary-foreground transition-colors">
                  info@zmk-sk.ru
                </a>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="MapPin" size={18} className="text-orange-300 flex-shrink-0 mt-0.5" />
                <span>Россия, работаем по всей стране</span>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white/5 border border-white/10 p-8 md:p-10">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Icon name="CheckCircle" size={48} className="text-orange-300 mb-6" />
                <h3 className="text-2xl font-medium mb-3">Заявка отправлена!</h3>
                <p className="text-primary-foreground/60">
                  Мы свяжемся с вами в течение рабочего дня.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-primary-foreground/60 mb-2 tracking-wide uppercase text-xs">
                    Ваше имя *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-orange-300 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-primary-foreground/60 mb-2 tracking-wide uppercase text-xs">
                    Телефон *
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-orange-300 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-primary-foreground/60 mb-2 tracking-wide uppercase text-xs">
                    Тип объекта
                  </label>
                  <select
                    value={form.object}
                    onChange={(e) => setForm({ ...form, object: e.target.value })}
                    className="w-full bg-foreground border border-white/20 px-4 py-3 text-primary-foreground focus:outline-none focus:border-orange-300 transition-colors"
                  >
                    <option value="">Выберите тип объекта</option>
                    <option value="warehouse">Склад / логистический центр</option>
                    <option value="hangar">Ангар</option>
                    <option value="factory">Производственный цех</option>
                    <option value="commercial">Торговое здание</option>
                    <option value="technical">Техническое сооружение</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-primary-foreground/60 mb-2 tracking-wide uppercase text-xs">
                    Комментарий
                  </label>
                  <textarea
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    placeholder="Площадь, регион, сроки — любая информация поможет быстрее подготовить расчёт"
                    rows={3}
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-orange-300 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-400 hover:bg-orange-300 text-foreground py-4 text-sm tracking-widest uppercase font-medium transition-colors duration-300 disabled:opacity-60"
                >
                  {loading ? "Отправляем..." : "Получить расчёт бесплатно"}
                </button>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <p className="text-primary-foreground/30 text-xs text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}