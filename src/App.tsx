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

const isPrivacyPath = (path: string, hash: string) => {
  const normalized = path.toLowerCase().replace(/\/$/, "")
  return (
    normalized === "/politica-de-privacidad" ||
    normalized === "/privacy-policy" ||
    normalized === "/privacidad" ||
    normalized === "/privacy" ||
    hash.toLowerCase() === "#politica-de-privacidad" ||
    hash.toLowerCase() === "#privacy-policy"
  )
}

function App() {
  const [isPrivacy, setIsPrivacy] = useState(() =>
    isPrivacyPath(window.location.pathname, window.location.hash)
  )

  useEffect(() => {
    const handleLocationChange = () => {
      setIsPrivacy(isPrivacyPath(window.location.pathname, window.location.hash))
    }

    window.addEventListener("popstate", handleLocationChange)
    window.addEventListener("hashchange", handleLocationChange)
    return () => {
      window.removeEventListener("popstate", handleLocationChange)
      window.removeEventListener("hashchange", handleLocationChange)
    }
  }, [])

  if (isPrivacy) {
    return (
      <PrivacyPolicy
        onBack={() => {
          window.history.pushState({}, "", "/")
          setIsPrivacy(false)
          window.scrollTo({ top: 0, behavior: "smooth" })
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