import React, { FC, useRef } from 'react';

const Preview: FC = () => {

  const ref = useRef(null);

  return (
    <div className="tx-preview" ref={ref}>
      Preview
    </div>
  );
};

export { Preview };
