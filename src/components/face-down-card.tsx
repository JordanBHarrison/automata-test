type Props = {
  className?: string
}

const FaceDownCard = ({ className }: Props) => {
  return (
    <div className={`aspect-4/5 bg-red-300 w-24 rounded-xl transform -translate-y-1/3 ${className ? className : ''}`} />
  )
}

export default FaceDownCard