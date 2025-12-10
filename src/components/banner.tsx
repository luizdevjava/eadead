"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"

interface Banner {
  id: string
  title: string
  description?: string
  imageUrl: string
  linkUrl?: string
  position: "TOP" | "SIDEBAR" | "BOTTOM"
}

interface BannerComponentProps {
  banner: Banner
  onClose?: () => void
  showClose?: boolean
}

export function BannerComponent({ banner, onClose, showClose = true }: BannerComponentProps) {
  const [imageError, setImageError] = useState(false)

  const handleClick = () => {
    if (banner.linkUrl) {
      window.open(banner.linkUrl, '_blank')
    }
  }

  if (imageError) {
    return null
  }

  return (
    <div className="relative w-full">
      {showClose && onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white rounded-full p-1 shadow-md transition-colors"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>
      )}
      <div 
        className={`relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02] ${
          banner.position === "SIDEBAR" ? "w-full" : "w-full"
        }`}
        onClick={handleClick}
      >
        <div className="relative w-full">
          <img
            src={banner.imageUrl}
            alt={banner.title}
            className="w-full h-auto object-cover"
            onError={() => setImageError(true)}
            style={{ maxHeight: banner.position === "SIDEBAR" ? "200px" : "300px" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold text-lg mb-1">{banner.title}</h3>
            {banner.description && (
              <p className="text-sm opacity-90">{banner.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface BannerContainerProps {
  banners: Banner[]
  position: "TOP" | "SIDEBAR" | "BOTTOM"
  className?: string
}

export function BannerContainer({ banners, position, className = "" }: BannerContainerProps) {
  const [closedBanners, setClosedBanners] = useState<Set<string>>(new Set())

  const positionBanners = banners.filter(banner => banner.position === position)
  const visibleBanners = positionBanners.filter(banner => !closedBanners.has(banner.id))

  const handleCloseBanner = (bannerId: string) => {
    setClosedBanners(prev => new Set([...prev, bannerId]))
  }

  if (visibleBanners.length === 0) {
    return null
  }

  return (
    <div className={className}>
      {visibleBanners.map((banner) => (
        <div key={banner.id} className="mb-4">
          <BannerComponent
            banner={banner}
            onClose={() => handleCloseBanner(banner.id)}
            showClose={position !== "SIDEBAR"}
          />
        </div>
      ))}
    </div>
  )
}