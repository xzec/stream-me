import { useEffect, useState } from 'react'

const DELAY_TIME_MS = 100

const useIsUserWheeling = () => {
  const [state, setState] = useState(false)

  useEffect(() => {
    let timeoutId: number

    const handler = () => {
      setState(true)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setState(false), DELAY_TIME_MS)
    }

    document.addEventListener('wheel', handler)

    return () => {
      document.removeEventListener('wheel', handler)
      clearTimeout(timeoutId)
    }
  }, [])

  return state
}

export default useIsUserWheeling
