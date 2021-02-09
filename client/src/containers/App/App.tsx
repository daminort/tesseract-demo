import React, { FC } from 'react';

import { NavBar } from 'containers/NavBar';
import { Preview } from 'containers/Preview';
import { Stats } from 'containers/Stats';
import { Selections } from 'containers/Selections';

const App: FC = () => {
  return (
    <div className="tx-app font-sans h-screen">
      <NavBar />
      <div className="tx-content flex justify-between pt-2 pb-2">
        <Stats />
        <Preview />
        <Selections />
      </div>
    </div>
  );
}

export {
  App,
};
