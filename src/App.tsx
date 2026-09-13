import { useEffect, useState } from "react"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { LaunchOffer } from "@/components/LaunchOffer"
import { Services } from "@/components/Services"
import { Process } from "@/components/Process"
import { Pricing } from "@/components/Pricing"
import { Demo } from "@/components/Demo"
import { About } from "@/components/About"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { PrivacyPolicy } from "@/components/PrivacyPolicy"
import { DesktopView } from "@/components/desktop/DesktopView"

export type RouteType = "home" | "privacy" | "portfolio"

export const getRoute = (path: string, hash: string): RouteType => {
  const normalized = path.toLowerCase().replace(/\/$/, "")
  const normHash = hash.toLowerCase()

  if (
    normalized === "/politica-de-privacidad" ||
    normalized === "/privacy-policy" ||
    normalized === "/privacidad" ||
    normalized === "/privacy" ||
    normHash === "#politica-de-privacidad" ||
    normHash === "#privacy-policy"
  ) {
    return "privacy"
  }

  if (
    normalized === "/portafolio" ||
    normalized === "/portfolio" ||
    normalized === "/interactivo" ||
    normalized === "/interactive" ||
    normalized === "/desktop" ||
    normHash === "#portafolio" ||
    normHash === "#portfolio" ||
    normHash === "#interactivo" ||
    normHash === "#desktop"
  ) {
    return "portfolio"
  }

  return "home"
}

export const navigateTo = (url: string) => {
  window.history.pushState({}, "", url)
  window.dispatchEvent(new PopStateEvent("popstate"))
}

function App() {
  const [route, setRoute] = useState<RouteType>(() =>
    getRoute(window.location.pathname, window.location.hash)
  )

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(getRoute(window.location.pathname, window.location.hash))
    }

    window.addEventListener("popstate", handleLocationChange)
    window.addEventListener("hashchange", handleLocationChange)
    return () => {
      window.removeEventListener("popstate", handleLocationChange)
      window.removeEventListener("hashchange", handleLocationChange)
    }
  }, [])

  if (route === "privacy") {
    return (
      <PrivacyPolicy
        onBack={() => {
          navigateTo("/")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      />
    )
  }

  if (route === "portfolio") {
    return (
      <DesktopView
        onClose={() => {
          navigateTo("/")
        }}
      />
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <LaunchOffer />
        <Services />
        <Process />
        <Pricing />
        <Demo />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App