"use client"

import { useCart } from "@/contexts/CartContext"

interface Product {
  id: string
  name: string
  nameKhmer: string
  size: string
  price: number
  unit: string
  offer: string
  image: string
}

const products: Product[] = [
  {
    id: "330ML",
    name: "MUDITA 330ML",
    nameKhmer: "មុទិតា ៣៣០មល",
    size: "330ML",
    price: 3.0,
    unit: "/ក្រឡា",
    offer: "🎁 ទិញ ១០ ឥតគិតថ្លៃ ១",
    image: "/placeholder.svg?height=80&width=100&text=330ML",
  },
  {
    id: "500ML",
    name: "MUDITA 500ML",
    nameKhmer: "មុទិតា ៥០០មល",
    size: "500ML",
    price: 3.15,
    unit: "/ក្រឡា",
    offer: "🎁 ទិញ ១០ ឥតគិតថ្លៃ ១",
    image: "/placeholder.svg?height=80&width=100&text=500ML",
  },
  {
    id: "1500ML",
    name: "MUDITA 1.5L",
    nameKhmer: "មុទិតា ១.៥លីត្រ",
    size: "1500ML",
    price: 4.2,
    unit: "/ក្រឡា",
    offer: "🎁 ទិញ ១០ ឥតគិតថ្លៃ ១",
    image: "/placeholder.svg?height=80&width=100&text=1.5L",
  },
  {
    id: "20L",
    name: "MUDITA 20L",
    nameKhmer: "មុទិតា ២០លីត្រ",
    size: "20L",
    price: 1.0,
    unit: "/ដប",
    offer: "🎁 ទិញ ១០ ឥតគិតថ្លៃ ១",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/images/20l-jug-pcRTDWbdoit3RTaaGjEhKCzO7eaErr.png",
  },
]

export default function OrderSection() {
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <section id="order" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 font-khmer">បញ្ជាទិញឥឡូវ</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Card Header */}
              <div className="relative p-6 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20"></div>
                <div className="relative z-10">
                  <div className="text-white text-sm font-semibold mb-2 font-khmer">ទឹកបរិសុទ្ធ មុទិតា</div>
                  <div className="bg-white/25 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
                    {product.size}
                  </div>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-20 h-20 mx-auto object-contain"
                  />
                </div>
              </div>

              {/* Card Content */}
              <div className="bg-white p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 font-khmer">{product.nameKhmer}</p>
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  ${product.price.toFixed(2)}
                  {product.unit}
                </div>
                <div className="text-sm text-green-600 mb-4 font-khmer">{product.offer}</div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors font-khmer"
                >
                  បន្ថែមទៅកន្ត្រក
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
