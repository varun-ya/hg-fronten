"use client"

import React, { createContext, useContext, useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"

interface StackingCardsContextType {
  totalCards: number
  scrollYProgress: MotionValue<number>
}

const StackingCardsContext = createContext<StackingCardsContextType | null>(null)

function useStackingCards() {
  const context = useContext(StackingCardsContext)
  if (!context) {
    throw new Error("useStackingCards must be used within StackingCards")
  }
  return context
}

interface StackingCardsProps {
  children: React.ReactNode
  totalCards: number
  scrollOptions?: {
    container?: React.RefObject<HTMLElement | null>
  }
  className?: string
}

function StackingCards({
  children,
  totalCards,
  scrollOptions,
  className,
}: StackingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    container: scrollOptions?.container,
  })

  return (
    <StackingCardsContext.Provider value={{ totalCards, scrollYProgress }}>
      <div ref={containerRef} className={cn("relative", className)}>
        {children}
      </div>
    </StackingCardsContext.Provider>
  )
}

interface StackingCardItemProps {
  children: React.ReactNode
  index: number
  className?: string
}

function StackingCardItem({
  children,
  index,
  className,
}: StackingCardItemProps) {
  const { totalCards, scrollYProgress } = useStackingCards()

  const cardStart = (index + 1) / (totalCards + 1)
  const cardEnd = (index + 2) / (totalCards + 1)

  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [1, 0.92]
  )

  const opacity = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [1, 0.4]
  )

  return (
    <motion.div
      className={cn("sticky top-0 origin-top", className)}
      style={{
        scale,
        opacity,
        top: `${index * 2}%`,
      }}
    >
      {children}
    </motion.div>
  )
}

export default StackingCards
export { StackingCardItem }
