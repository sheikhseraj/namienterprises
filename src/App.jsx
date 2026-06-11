import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import NamiStandard from './components/NamiStandard'
import Collections from './components/Collections'
import Testimonials from './components/Testimonials'
import VisitUs from './components/VisitUs'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <NamiStandard />
      <Collections />
      <Testimonials />
      <VisitUs />
      <Footer />
    </div>
  )
}

export default App
