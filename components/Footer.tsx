"use client"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/images/mudita-logo-PXCjfUvWV9QmCEsV7EBtIQXSe5NVIJ.png"
                alt="Mudita Logo"
                className="h-10 w-10"
              />
              <div>
                <h3 className="text-lg font-bold font-khmer">មុទិតា</h3>
                <p className="text-sm text-gray-400">ទឹកបរិសុទ្ធ</p>
              </div>
            </div>
            <p className="text-gray-400 font-khmer">ទឹកបរិសុទ្ធ គុណភាពខ្ពស់ សម្រាប់សុខភាពល្អ និងជីវិតប្រកបដោយសុភមង្គល</p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-khmer">ទំនាក់ទំនង</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <span className="mr-2">📞</span>
                <span className="font-khmer">លេខទូរស័ព្ទ: 012 345 678</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">📧</span>
                <span>Email: info@mudita.com</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">📍</span>
                <span className="font-khmer">អាសយដ្ឋាន: ភ្នំពេញ កម្ពុជា</span>
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-khmer">តាមដានយើង</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-colors">
                <span className="text-white">📘</span>
              </a>
              <a href="#" className="bg-blue-400 p-3 rounded-full hover:bg-blue-500 transition-colors">
                <span className="text-white">🐦</span>
              </a>
              <a href="#" className="bg-blue-500 p-3 rounded-full hover:bg-blue-600 transition-colors">
                <span className="text-white">📱</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 font-khmer">© 2024 មុទិតា ទឹកបរិសុទ្ធ។ រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
        </div>
      </div>
    </footer>
  )
}
