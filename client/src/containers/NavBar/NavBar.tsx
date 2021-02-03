import React, { FC } from 'react';

type Props = {
  name: string,
  onClick: () => void,
};

const NavBar: FC<Props> = ({ onClick, name }) => {

  return (
    <div onClick={onClick}>
      {name}
    </div>
  );
};

export { NavBar };
