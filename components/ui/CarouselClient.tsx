"use client"

import React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Carousel } from "@/components/ui/carousel"

type Props = {
  children: React.ReactNode
  opts?: any
  delay?: number
  playOnInit?: boolean
}

export default function CarouselClient({
  children,
  opts,
  delay = 3000,
  playOnInit = true,
}: Props) {
  const plugins = React.useMemo(
    () => [Autoplay({ playOnInit, delay })],
    [delay, playOnInit]
  )

  return (
    <Carousel className="relative" opts={opts} plugins={plugins}>
      {children}
    </Carousel>
  )
}