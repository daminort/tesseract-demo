import React, { FC, useState, useCallback, useRef, ChangeEvent } from 'react';

import { Button } from 'components/Button';
import './Upload.scss';

type Props = {
  accept: string,
  onUpload: (file: File) => void,
};

type State = File | null;

const Upload: FC<Props> = ({ accept, onUpload }) => {

  const [file, setFile] = useState<State>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const onUploadClick = useCallback(() => {
    if (file) {
      onUpload(file);
      setFile(null);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, [file]);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      setFile(files[0]);
    }
  }, []);

  const fileName = file ? file.name : 'Click to select a file...';

  return (
    <div className="root-upload">
      <div className="file" onClick={onFileClick}>{fileName}</div>
      <Button onClick={onUploadClick}>Upload</Button>
      <input
        accept={accept}
        type="file"
        ref={inputRef}
        onChange={onChange}
      />
    </div>
  );
};

export { Upload };
