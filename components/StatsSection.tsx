"use client"

import { useEffect, useState, useRef } from "react"

interface StatItemProps {
  target: number
  label: string
  suffix?: string
}

function StatItem({ target, label, suffix = "" }: StatItemProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, target])

  return (
    <div ref={ref} className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-4xl font-bold text-blue-800 mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-gray-600 font-khmer">{label}</div>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatItem target={10000} label="អតិថិជនពេញចិត្ត" />
          <StatItem target={50000} label="ដបទឹកបានចែកចាយ" />
          <StatItem target={15} label="ឆ្នាំនៃបទពិសោធន៍" />
          <StatItem target={99} label="គុណភាពបរិសុទ្ធ" suffix="%" />
        </div>
      </div>
    </section>
  )
}
