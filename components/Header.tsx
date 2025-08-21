"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/CartContext"

export default function Header() {
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const { getTotalItems, openCart } = useCart()

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }

      setCurrentTime(now.toLocaleTimeString("km-KH", timeOptions))
      setCurrentDate(now.toLocaleDateString("km-KH", dateOptions))
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-40 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/images/mudita-logo-PXCjfUvWV9QmCEsV7EBtIQXSe5NVIJ.png"
              alt="Mudita Logo"
              className="h-10 w-10"
            />
            <div>
              <h1 className="text-lg font-bold text-blue-800 font-khmer">មុទិតា</h1>
              <p className="text-xs text-gray-600">ទឹកបរិសុទ្ធ</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors font-khmer">
              ទំព័រដើម
            </a>
            <a href="#products" className="text-gray-700 hover:text-blue-600 transition-colors font-khmer">
              ផលិតផល
            </a>
            <a href="#order" className="text-gray-700 hover:text-blue-600 transition-colors font-khmer">
              បញ្ជាទិញ
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-khmer">
              ទំនាក់ទំនង
            </a>
          </nav>

          {/* Date/Time and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:block text-right">
              <div className="text-sm font-semibold text-blue-800 font-khmer">{currentTime}</div>
              <div className="text-xs text-gray-600 font-khmer">{currentDate}</div>
            </div>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
                />
              </svg>
              <span className="font-khmer">កន្ត្រក</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
