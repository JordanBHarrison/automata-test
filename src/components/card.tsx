import { CardValues } from '../context/game-state-context'
import RockLogo from '../assets/rock.webp'
import PaperLogo from '../assets/paper.webp'
import ScissorsLogo from '../assets/scissors.webp'
import LizardLogo from '../assets/lizard.webp'
import SpockLogo from '../assets/spock.webp'

type HiddenCardProps = {
  className?: string
  small?: boolean
}
type CardProps = {
  value: CardValues
  onClick?: (value: CardValues) => void
  className?: string
  isActive?: boolean
  selected?: boolean
}

const cardImages = {
  [CardValues.ROCK]: RockLogo,
  [CardValues.PAPER]: PaperLogo,
  [CardValues.SCISSORS]: ScissorsLogo,
  [CardValues.LIZARD]: LizardLogo,
  [CardValues.SPOCK]: SpockLogo,
}

const cardStyle = 'flex flex-col justify-center items-center w-24 aspect-4/5 bg-gray-100 rounded-lg md:rounded-xl'

export const HiddenCard = ({ className='', small }: HiddenCardProps) => {
  return (
    <div className={`${cardStyle} bg-red-300 ${small ? '!w-14' : ''} ${className}`} />
  )
}

export const Card = ({ value, onClick, className='', isActive, selected }: CardProps) => {
  const activeCardClass = 'cursor-pointer hover:!bg-blue-400' 

  return (
    <div
      className={`${cardStyle} ${selected? '!bg-blue-400': ''} ${isActive ? activeCardClass : ''} ${className}`}
      onClick={() => onClick && onClick(value)}
    >
      <img src={cardImages[value]} alt={`${value} card`} className='w-3/4' />
    </div>
  )
}
