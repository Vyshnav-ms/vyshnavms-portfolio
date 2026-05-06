import { useEffect, useRef } from 'react'

interface SwipeHandlers {
  onSwipeLeft: () => void
  onSwipeRight: () => void
}

interface TouchState {
  startX: number
  startY: number
  endX: number
  endY: number
}

const useSwipe = (handlers: SwipeHandlers, threshold = 50) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStateRef = useRef<TouchState>({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchStateRef.current.startX = touch.clientX
      touchStateRef.current.startY = touch.clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0]
      touchStateRef.current.endX = touch.clientX
      touchStateRef.current.endY = touch.clientY

      const { startX, startY, endX, endY } = touchStateRef.current
      const diffX = startX - endX
      const diffY = startY - endY

      // Only consider it a swipe if horizontal movement is greater than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          // Swiped left
          handlers.onSwipeLeft()
        } else {
          // Swiped right
          handlers.onSwipeRight()
        }
      }
    }

    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handlers, threshold])

  return containerRef
}

export default useSwipe
