import React, { FC } from 'react';

const Stats: FC = () => {

  return (
    <div className="tx-stats w-1/6 p-2 mt-1">
      <div className="mb-2">
        <div className="font-bold">File</div>
        <div className="pl-1">book.gif</div>
      </div>
      <div className="mb-2">
        <div className="font-bold">Image size</div>
        <div className="pl-1">842 x 1200</div>
      </div>
      <div className="mb-2">
        <div className="font-bold">Scale</div>
        <div className="pl-1">1:1</div>
      </div>
    </div>
  );
};

export { Stats };
