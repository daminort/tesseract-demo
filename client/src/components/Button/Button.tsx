import React, { FC } from 'react';

type Props = {
  onClick: () => void,
};

const Button: FC<Props> = ({ onClick, children }) => {

  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
