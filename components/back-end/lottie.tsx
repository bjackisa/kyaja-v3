"use client"
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import animationData from "@/public/ecommerce.json"

export default function LottieComponent() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // or a loading placeholder
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  )
}