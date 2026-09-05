export const SITE = {
  name: "David Agudelo",
  fullName: "David Agudelo Valencia",
  role: "Automatización con IA para PYMES",
  city: "Medellín, Colombia",
  whatsapp: "573052580913",
  email: "david.agudelo.valencia@gmail.com",
  github: "https://github.com/DavidAgudeloValencia",
  linkedin: "https://www.linkedin.com/in/david-agudelo-valencia",
  spotifyPlaylist: "47F8GYRkS01waEogPB0ehq",
  domain: "davidagudelo.com",
}

export const waLink = (message: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`

export type ServiceI18n = {
  title: string
  description: string
  tag: string
}

export type ProcessStepI18n = {
  step: string
  title: string
  description: string
}

export type PlanI18n = {
  name: string
  amount: string
  note: string
  featured?: boolean
  features: string[]
  ctaLabel: string
  ctaMessage: string
}

export type StatI18n = { value: string; label: string }