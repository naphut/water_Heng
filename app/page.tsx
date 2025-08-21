"use client"

import { useState, useEffect } from "react"
import { Inter, Noto_Sans_Khmer } from "next/font/google"
import Header from "@/components/Header"
import LoadingScreen from "@/components/LoadingScreen"
import HeroSection from "@/components/HeroSection"
import StatsSection from "@/components/StatsSection"
import ProductsSection from "@/components/ProductsSection"
import OrderSection from "@/components/OrderSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"
import Cart from "@/components/Cart"
import { CartProvider } from "@/contexts/CartContext"

const inter = Inter({ subsets: ["latin"] })
const notoSansKhmer = Noto_Sans_Khmer({ subsets: ["khmer"] })

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <CartProvider>
      <div className={`${inter.className} ${notoSansKhmer.className}`}>
        {isLoading && <LoadingScreen />}
        <Header />
        <main>
          <HeroSection />
          <StatsSection />
          <ProductsSection />
          <OrderSection />
          <ContactSection />
        </main>
        <Footer />
        <Cart />
      </div>
    </CartProvider>
  )
}
