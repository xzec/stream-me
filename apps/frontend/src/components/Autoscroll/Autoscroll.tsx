import { useAnimate } from 'framer-motion'
import { type FC, useEffect } from 'react'
import useIntersectionObserver from '~/hooks/useIntersectionObserver'
import useIsUserScrolling from '~/hooks/useIsUserScrolling'
import classes from './autoscroll.module.css'

type AutoscrollProps = {
  code: string[]
}

const Autoscroll: FC<AutoscrollProps> = ({ code }) => {
  const { ref, isVisible } = useIntersectionObserver()
  const isUserScrolling = useIsUserScrolling()
  const [scope, animate] = useAnimate()

  // biome-ignore lint/correctness/useExhaustiveDependencies: Fire effect when linesOfCode change
  useEffect(() => {
    if (isVisible && !isUserScrolling) window.scrollTo(0, document.body.scrollHeight)
  }, [isVisible, code])

  useEffect(() => {
    if (isVisible) animate(scope.current, { opacity: 0, y: 100 })
    else animate(scope.current, { opacity: 1, y: 0 }, { delay: 0.1 })
  }, [isVisible, animate, scope.current])

  return (
    <>
      <div ref={ref} />
      <button
        ref={scope}
        className={classes.scrollDownBtn}
        onClick={() =>
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'instant',
          })
        }
      >
        👇
      </button>
    </>
  )
}

export default Autoscroll
