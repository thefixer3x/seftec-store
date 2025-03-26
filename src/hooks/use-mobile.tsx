
import * as React from "react"

// Standardized breakpoints for consistency across the app
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
  LARGE_DESKTOP: 1536
}

/**
 * Custom hook to check if the current viewport matches mobile size
 * @returns Boolean indicating if the viewport is mobile sized
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.MOBILE - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.MOBILE)
    }
    
    mql.addEventListener("change", onChange)
    // Set initial value
    setIsMobile(window.innerWidth < BREAKPOINTS.MOBILE)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

/**
 * Comprehensive hook that provides responsive breakpoint information
 * @returns Object with boolean flags for different device sizes
 */
export function useResponsive() {
  const [viewport, setViewport] = React.useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    width: 0
  })

  React.useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      setViewport({
        isMobile: width < BREAKPOINTS.MOBILE,
        isTablet: width >= BREAKPOINTS.MOBILE && width < BREAKPOINTS.TABLET,
        isDesktop: width >= BREAKPOINTS.TABLET && width < BREAKPOINTS.LARGE_DESKTOP,
        isLargeDesktop: width >= BREAKPOINTS.LARGE_DESKTOP,
        width
      })
    }

    window.addEventListener('resize', updateViewport)
    // Initialize
    updateViewport()
    
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return viewport
}
