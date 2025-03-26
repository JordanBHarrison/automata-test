type Props = {
  username: string,
  className?: string,
  compact?: boolean
}

const UsernamePanel = ({ username, className, compact }: Props) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md md:w-42 ${compact? 'py-1 px-2 rounded-xl': 'py-2 px-4'} ${className ? className : ''}`}>
      <h3 className={`text-black max-w-[200px] whitespace-nowrap text-ellipsis overflow-hidden ${compact? 'text-base': 'text-lg'}`}>{username}</h3>
    </div>
  );
}

export default UsernamePanel;