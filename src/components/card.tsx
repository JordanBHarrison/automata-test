type FaceDownCardProps = {
  className?: string
  small?: boolean
}
type CardProps = {
  value: 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock'
}

export const HiddenCard = ({ className, small }: FaceDownCardProps) => {
  return (
    <div className={`aspect-4/5 bg-red-300 rounded-xl ${small ? 'w-16' : 'w-24'} ${className ? className : ''}`} />
  )
}

export const Card = ({ value }: CardProps) => {
  return (
    <div className={`aspect-4/5 bg-red-300 rounded-xl`}>
      <img src={`assets/${value}.png`} alt={`${value} card`} />
    </div>

  )
}
