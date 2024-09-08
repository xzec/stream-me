interface ItemStyleProps {
  children: string
}

const Item = ({ children }: ItemStyleProps) => {
  const baseSize = 24
  const minimumSize = 12
  const scaleFactor = 0.4
  const length = children.length
  const fontSize = `${Math.max(baseSize - length * scaleFactor, minimumSize)}px`

  return <span style={{ fontSize }}>{children}</span>
}

export default Item
