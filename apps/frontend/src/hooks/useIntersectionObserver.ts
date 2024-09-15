import { useEffect, useRef, useState } from 'react'

const useIntersectionObserver = (observerOptions?: IntersectionObserverInit) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(false)
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setIsVisible(entry.isIntersecting)
    }, observerOptions)

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [observerOptions])

  return { ref, isVisible }
}

export default useIntersectionObserver
