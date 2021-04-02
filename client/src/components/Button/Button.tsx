import React, { FC } from 'react';
import './Button.scss';

type Props = {
  onClick: () => void,
};

const Button: FC<Props> = ({ onClick, children }) => {

  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
