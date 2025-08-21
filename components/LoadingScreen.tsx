"use client"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-800 to-blue-600 flex flex-col justify-center items-center z-50 transition-opacity duration-500">
      <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 animate-pulse">
        <div className="w-16 h-16 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>
      </div>
      <h1 className="text-white text-2xl font-bold mb-2 font-khmer">មុទិតា</h1>
      <p className="text-white/80 text-lg">ទឹកបរិសុទ្ធ គុណភាពខ្ពស់</p>
      <div className="mt-8 flex space-x-2">
        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      </div>
    </div>
  )
}
