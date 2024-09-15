import { useEffect, useState } from 'react'

const useIsUserScrolling = () => {
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    let timeoutId: number

    const handler = () => {
      setIsScrolling(true)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setIsScrolling(false), 100)
    }

    document.addEventListener('wheel', handler)

    return () => {
      document.removeEventListener('wheel', handler)
      clearTimeout(timeoutId)
    }
  }, [])

  return isScrolling
}

export default useIsUserScrolling
