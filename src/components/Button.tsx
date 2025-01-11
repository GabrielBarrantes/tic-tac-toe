interface Props {
  onClick: () => void;
}

function Button({ onClick }: Props) {
  const handleClick = () => {
    onClick();
  };

  return <button onClick={handleClick}>Reset!</button>;
}

export default Button;
