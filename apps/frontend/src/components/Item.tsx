import { motion } from 'framer-motion'

interface ItemStyleProps {
  children: string
  className?: string
  animate?: boolean
}

const Item = ({ children, className, animate = false }: ItemStyleProps) => {
  const baseSize = 24
  const minimumSize = 12
  const scaleFactor = 0.4
  const length = children.length
  const fontSize = `${Math.max(baseSize - length * scaleFactor, minimumSize)}px`

  if (animate)
    return (
      <motion.span
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        style={{ fontSize }}
        className={className}
      >
        {children}
      </motion.span>
    )

  return (
    <span style={{ fontSize }} className={className}>
      {children}
    </span>
  )
}

export default Item
