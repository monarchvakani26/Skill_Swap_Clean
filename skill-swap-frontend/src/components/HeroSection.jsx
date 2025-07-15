"use client"
import { useNavigate } from "react-router-dom"
import Navbar from "./navbar"

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
            Barter Skills. <span className="text-pink-500">Learn Anything</span>. <span className="text-purple-500">Teach Anything</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Swap your talent with others and grow together. No money. Just passion.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 bg-pink-500 text-white rounded-xl text-lg font-medium hover:bg-pink-600 transition"
            >
              Get Started
            </button>
            <button onClick={() => navigate("/browse")}
            className="px-6 py-3 border border-pink-500 text-pink-500 rounded-xl text-lg font-medium hover:bg-pink-100 transition">
              Browse Skills
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection