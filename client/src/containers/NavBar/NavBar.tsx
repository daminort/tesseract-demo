import React, { FC, useCallback } from 'react';

import { FileInfo } from 'containers/NavBar/FileInfo';
import { Upload } from 'components/Upload';
import './Navbar.scss';

const NavBar: FC = () => {

  const onUpload = useCallback((file: File) => {
    console.log('NavBar.tsx,  [10]: ', { file });
  }, []);

  return (
    <div className="root-navbar">
      <div className="logo">Tesseract Demo</div>
      <Upload
        accept="image/*"
        onUpload={onUpload}
      />
      <FileInfo />
    </div>
  );
};

export { NavBar };
