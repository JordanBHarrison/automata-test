type Props = {
  username: string,
}

const UsernamePanel = ({ username }: Props) => {
  return (
    <div className='bg-white rounded-2xl py-2 px-4 shadow-md min-w-42'>
      <h3 className='text-lg text-black'>{username}</h3>
    </div>
  );
}

export default UsernamePanel;