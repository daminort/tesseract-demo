import React, { FC, useCallback } from 'react';

import { useStore } from 'stores/Root';
import { ImageFileStore } from 'stores/ImageFile';

import { FileInfo } from 'containers/NavBar/FileInfo';
import { Upload } from 'components/Upload';
import './Navbar.scss';

const NavBar: FC = () => {

  const imageFileStore = useStore<ImageFileStore>('imageFileStore');

  const onUpload = useCallback(async (file: File) => {
    await imageFileStore.imageUpload(file);
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
