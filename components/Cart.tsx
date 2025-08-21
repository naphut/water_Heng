"use client"

import { useCart } from "@/contexts/CartContext"

export default function Cart() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart()

  const handleCheckout = async () => {
    if (items.length === 0) return

    const orderDetails = items
      .map((item) => `• ${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    const message = `
🛒 បញ្ជាទិញថ្មី - មុទិតា

📦 ផលិតផលបានបញ្ជាទិញ:
${orderDetails}

💰 សរុបរួម: $${getTotalPrice().toFixed(2)}

⏰ ពេលវេលាបញ្ជាទិញ: ${new Date().toLocaleString("km-KH")}

📞 សូមទាក់ទងអតិថិជនដើម្បីបញ្ជាក់ការបញ្ជាទិញ
    `

    try {
      const botToken = "8345039578:AAEIrg0j2iBUFxk1vROAJ7EZi0aLtJ8Qy_0"
      const chatId = "1370528680"

      console.log("[v0] Starting checkout process...")
      console.log("[v0] Bot Token:", botToken.substring(0, 10) + "...")
      console.log("[v0] Chat ID:", chatId)
      console.log("[v0] Message length:", message.length)
      console.log("[v0] Sending order to Telegram...")

      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      })

      console.log("[v0] Telegram API response status:", response.status)
      console.log("[v0] Telegram API response ok:", response.ok)

      if (response.ok) {
        const responseData = await response.json()
        console.log("[v0] Telegram API success response:", responseData)
        console.log("[v0] Order sent successfully to Telegram")
        alert("បញ្ជាទិញបានផ្ញើទៅ Telegram ដោយជោគជ័យ! យើងនឹងទាក់ទងអ្នកក្នុងពេលឆាប់ៗ។")
        clearCart()
        closeCart()
      } else {
        const errorData = await response.json()
        console.error("[v0] Telegram API error response:", errorData)
        alert(
          `មានបញ្ហាក្នុងការផ្ញើទៅ Telegram: ${errorData.description || "Unknown error"}\n\nសូមពិនិត្យ Bot Token និង Chat ID។`,
        )
      }
    } catch (error) {
      console.error("[v0] Network or other error:", error)
      alert("មានបញ្ហាក្នុងការផ្ញើបញ្ជាទិញ។ សូមពិនិត្យការតភ្ជាប់អ៊ីនធឺណិត និងព្យាយាមម្តងទៀត។")
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={closeCart} />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold font-khmer">កន្ត្រកទិញទំនិញ</h2>
            <button onClick={closeCart} className="text-white hover:text-gray-200 text-2xl">
              ×
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">🛒</div>
                <p className="text-gray-500 font-khmer">កន្ត្រករបស់អ្នកទទេ</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-contain"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-blue-600 font-semibold">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="text-right mt-2">
                      <span className="font-semibold text-gray-800">
                        សរុប: ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="font-khmer">សរុបរួម:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors font-khmer"
                >
                  បញ្ជាទិញ
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors font-khmer"
                >
                  សម្អាតកន្ត្រក
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
