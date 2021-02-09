import React, { FC, useRef } from 'react';

const Preview: FC = () => {

  const ref = useRef(null);

  return (
    <div className="tx-preview p-2 m-1 bg-white rounded-md w-full shadow-2xl" ref={ref}>
      Preview
    </div>
  );
};

export { Preview };
