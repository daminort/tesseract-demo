import React, { FC } from 'react';

import { FileInfo } from 'containers/NavBar/FileInfo';
import './Navbar.scss';

const NavBar: FC = () => {

  return (
    <div className="root-navbar">
      <div className="logo">Tesseract Demo</div>
      <FileInfo />
    </div>
  );
};

export { NavBar };
