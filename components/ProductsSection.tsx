"use client"

export default function ProductsSection() {
  const products = [
    {
      size: "330ML",
      description: "ទំហំតូច សម្រាប់ការផឹកប្រចាំថ្ងៃ",
      features: ["បរិសុទ្ធ ១០០%", "រសជាតិធម្មជាតិ", "ងាយស្រួលយក"],
    },
    {
      size: "500ML",
      description: "ទំហំមធ្យម សម្រាប់ការធ្វើដំណើរ",
      features: ["បរិសុទ្ធ ១០០%", "ប្រើប្រាស់ងាយ", "សន្សំសំចៃ"],
    },
    {
      size: "1.5L",
      description: "ទំហំធំ សម្រាប់គ្រួសារ",
      features: ["បរិសុទ្ធ ១០០%", "សម្រាប់គ្រួសារ", "តម្លៃសមរម្យ"],
    },
    {
      size: "20L",
      description: "ទំហំធំបំផុត សម្រាប់ការិយាល័យ",
      features: ["បរិសុទ្ធ ១០០%", "សន្សំសំចៃ", "ប្រើប្រាស់យូរ"],
    },
  ]

  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 font-khmer">ផលិតផលរបស់យើង</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {product.size}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 font-khmer">{product.description}</h3>
              </div>

              <ul className="space-y-2">
                {product.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600 font-khmer">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
