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

function App() {
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