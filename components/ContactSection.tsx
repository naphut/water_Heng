"use client"

import type React from "react"

import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    telegram: "",
    address: "",
    city: "",
    deliveryMethod: "",
    specialRequests: "",
  })
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const detectLocation = () => {
    setIsDetectingLocation(true)

    if (!navigator.geolocation) {
      alert("ការកំណត់ទីតាំងមិនត្រូវបានគាំទ្រដោយកម្មវិធីរុករករបស់អ្នកទេ")
      setIsDetectingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords

          // Use reverse geocoding to get address
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY&language=km`,
          )

          if (response.ok) {
            const data = await response.json()
            if (data.results && data.results.length > 0) {
              const result = data.results[0]
              setFormData({
                ...formData,
                address: result.formatted || `${latitude}, ${longitude}`,
                city: result.components?.city || result.components?.town || "",
              })
            }
          } else {
            // Fallback to coordinates
            setFormData({
              ...formData,
              address: `${latitude}, ${longitude}`,
            })
          }
        } catch (error) {
          console.error("Error getting address:", error)
          setFormData({
            ...formData,
            address: `${position.coords.latitude}, ${position.coords.longitude}`,
          })
        }

        setIsDetectingLocation(false)
      },
      (error) => {
        console.error("Error getting location:", error)
        alert("មិនអាចកំណត់ទីតាំងបានទេ។ សូមពិនិត្យការកំណត់នៃកម្មវិធីរុករក។")
        setIsDetectingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const message = `
🆕 ការទាក់ទងថ្មី - មុទិតា

👤 ព័ត៌មានអតិថិជន:
• ឈ្មោះ: ${formData.name}
• លេខទូរស័ព្ទ: ${formData.phone}
• Telegram: ${formData.telegram}

📍 ទីតាំង:
• អាសយដ្ឋាន: ${formData.address}
• ទីក្រុង: ${formData.city}

🚚 ការបញ្ជាទិញ:
• វិធីសាស្ត្រចែកចាយ: ${formData.deliveryMethod}
• សំណើពិសេស: ${formData.specialRequests || "គ្មាន"}

⏰ ពេលវេលា: ${new Date().toLocaleString("km-KH")}
    `

    const botToken = "8345039578:AAEIrg0j2iBUFxk1vROAJ7EZi0aLtJ8Qy_0"
    const chatId = "1370528680"

    try {
      console.log("[v0] Starting contact form submission...")
      console.log("[v0] Bot Token:", botToken.substring(0, 10) + "...")
      console.log("[v0] Chat ID:", chatId)
      console.log("[v0] Form data:", formData)
      console.log("[v0] Message length:", message.length)

      const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      })

      console.log("[v0] Contact form Telegram API response status:", telegramResponse.status)
      console.log("[v0] Contact form Telegram API response ok:", telegramResponse.ok)

      if (telegramResponse.ok) {
        const responseData = await telegramResponse.json()
        console.log("[v0] Contact form Telegram API success response:", responseData)
        alert("សារបានផ្ញើដោយជោគជ័យ! យើងនឹងទាក់ទងអ្នកក្នុងពេលឆាប់ៗ។")
        setFormData({
          name: "",
          phone: "",
          telegram: "",
          address: "",
          city: "",
          deliveryMethod: "",
          specialRequests: "",
        })
      } else {
        const errorData = await telegramResponse.json()
        console.error("[v0] Contact form Telegram API error:", errorData)
        throw new Error(`Telegram API error: ${errorData.description || "Unknown error"}`)
      }
    } catch (error) {
      console.error("[v0] Contact form error:", error)
      alert("មានបញ្ហាក្នុងការផ្ញើសារ។ សូមព្យាយាមម្តងទៀត។")
    }
  }

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 font-khmer">ទំនាក់ទំនងជាមួយយើង</h2>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
              <h3 className="text-white text-xl font-semibold font-khmer">បំពេញព័ត៌មានសម្រាប់ការបញ្ជាទិញ</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 font-khmer flex items-center">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                    👤
                  </span>
                  ព័ត៌មានអតិថិជន
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-khmer">ឈ្មោះ *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-khmer">លេខទូរស័ព្ទ *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="012 345 678"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-khmer">Telegram Username *</label>
                  <div className="flex">
                    <input
                      type="text"
                      name="telegram"
                      value={formData.telegram}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="username"
                      required
                    />
                    <button
                      type="button"
                      className="bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-600 transition-colors font-khmer"
                    >
                      ពិនិត្យ
                    </button>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 font-khmer flex items-center">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                    📍
                  </span>
                  កំណត់ទីតាំង
                </h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-khmer">អាសយដ្ឋានលម្អិត</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="បញ្ចូលអាសយដ្ឋានរបស់អ្នក"
                    />
                    <button
                      type="button"
                      onClick={detectLocation}
                      disabled={isDetectingLocation}
                      className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors font-khmer disabled:opacity-50"
                    >
                      {isDetectingLocation ? "កំពុងស្វែងរក..." : "រកទីតាំងស្វ័យប្រវត្តិ"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-khmer">ខេត្ត/ក្រុង/ខណ្ឌ *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ភ្នំពេញ/បាត់ដំបង/សៀមរាប"
                    required
                  />
                </div>
              </div>

              {/* Order Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 font-khmer flex items-center">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                    📦
                  </span>
                  កំណត់បញ្ជាទិញ
                </h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-khmer">វិធីសាស្ត្រចែកចាយ *</label>
                  <select
                    name="deliveryMethod"
                    value={formData.deliveryMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-khmer"
                    required
                  >
                    <option value="">ជ្រើសរើសវិធីចែកចាយ</option>
                    <option value="ចែកចាយដល់ផ្ទះ">ចែកចាយដល់ផ្ទះ</option>
                    <option value="មកយកនៅហាង">មកយកនៅហាង</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-khmer">សំណើពិសេស</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="សូមបញ្ជាក់ពីសំណើពិសេសណាមួយ..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors font-khmer"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors font-khmer"
                >
                  ផ្ញើសារ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
