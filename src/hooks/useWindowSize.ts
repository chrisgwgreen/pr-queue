import { useState, useEffect } from 'react'

interface WindowSizeProps {
  windowWidth: number
  windowHeight: number
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSizeProps>(
    {} as WindowSizeProps
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
