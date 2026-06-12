import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WishlistProvider } from './context/WishlistContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import NamiStandard from './components/NamiStandard'
import Collections from './components/Collections'
import Testimonials from './components/Testimonials'
import VisitUs from './components/VisitUs'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <NamiStandard />
      <Collections />
      <Testimonials />
      <VisitUs />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <div className="bg-white text-gray-900 overflow-x-hidden">
          <Navbar />
          <Routes>
            <Route path="/"               element={<HomePage />} />
            <Route path="/shop"           element={<ShopPage />} />
            <Route path="/product/:slug"  element={<ProductPage />} />
          </Routes>
          <Footer />
        </div>
      </WishlistProvider>
    </BrowserRouter>
  )
}

export default App
