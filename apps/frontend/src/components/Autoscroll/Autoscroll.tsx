import { useAnimate } from 'framer-motion'
import { type FC, useEffect } from 'react'
import useIntersectionObserver from '~/hooks/useIntersectionObserver'
import useIsUserScrolling from '~/hooks/useIsUserScrolling'
import classes from './autoscroll.module.css'

type SentinelProps = {
  code: string[]
}

const Autoscroll: FC<SentinelProps> = ({ code }) => {
  const { ref, isVisible } = useIntersectionObserver()
  const isUserScrolling = useIsUserScrolling()
  const [scope, animate] = useAnimate()

  // biome-ignore lint/correctness/useExhaustiveDependencies: Fire effect when linesOfCode change
  useEffect(() => {
    if (isVisible && !isUserScrolling) window.scrollTo(0, document.body.scrollHeight)
    if (isVisible) animate(scope.current, { opacity: 0, y: 100 })
    else animate(scope.current, { opacity: 1, y: 0 }, { animationDelay: {} })
  }, [isVisible, code])

  return (
    <>
      <div ref={ref} />
      <button ref={scope} className={classes.scrollDown} onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
        👇
      </button>
    </>
  )
}

export default Autoscroll
