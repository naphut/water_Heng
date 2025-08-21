"use client"

import { useEffect, useState } from "react"

export default function HeroSection() {
  const [floatingElements, setFloatingElements] = useState<Array<{ id: number; x: number; y: number; delay: number }>>(
    [],
  )

  useEffect(() => {
    // Generate floating elements
    const elements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setFloatingElements(elements)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-blue-800 via-blue-600 to-blue-500 flex items-center overflow-hidden"
    >
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            {/* Logo */}
            <div className="mb-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/images/mudita-logo-PXCjfUvWV9QmCEsV7EBtIQXSe5NVIJ.png"
                alt="Mudita Logo"
                className="h-24 w-24 mx-auto lg:mx-0 animate-bounce"
              />
            </div>

            {/* Hero Text */}
            <div className="text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 font-khmer animate-fade-in-up">ទឹកបរិសុទ្ធ មុទិតា</h1>
              <p
                className="text-xl lg:text-2xl font-semibold mb-6 animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
              >
                MUDITA PREMIUM WATER
              </p>
              <p className="text-lg mb-8 text-blue-100 font-khmer animate-fade-in-up" style={{ animationDelay: "1s" }}>
                ទឹកបរិសុទ្ធ គុណភាពខ្ពស់ សម្រាប់សុខភាពល្អ
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up"
                style={{ animationDelay: "1.5s" }}
              >
                <a
                  href="#order"
                  className="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors font-khmer"
                >
                  បញ្ជាទិញឥឡូវ
                </a>
                <a
                  href="#contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-800 transition-colors font-khmer"
                >
                  ទំនាក់ទំនង
                </a>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative animate-float">
              <img
                src="/placeholder.svg?height=400&width=500&text=Mudita+Water+Products"
                alt="Mudita Water Products"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
