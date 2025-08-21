import type React from "react"
import { Inter, Noto_Sans_Khmer } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  display: "swap",
  variable: "--font-khmer",
})

export const metadata = {
  title: "មុទិតា - ទឹកបរិសុទ្ធ គុណភាពខ្ពស់",
  description: "ទឹកបរិសុទ្ធ មុទិតា - គុណភាពខ្ពស់ សម្រាប់សុខភាពល្អ និងជីវិតប្រកបដោយសុភមង្គល",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="km" className={`${inter.variable} ${notoSansKhmer.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
