import React, { FC } from 'react';

import { NavBar } from 'containers/NavBar';
import { Preview } from 'containers/Preview';
import { Stats } from 'containers/Stats';
import { Selections } from 'containers/Selections';

const App: FC = () => {
  return (
    <div className="font-sans bg-gray-200 h-screen">
      <NavBar />
      <div className="flex justify-between pt-2">
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
