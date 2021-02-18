import React, { FC, useRef, useMemo } from 'react';
import { useObserver } from 'mobx-react-lite';

import { FileStore } from 'stores/File';
import { useGeneralStore } from 'stores/General';
import { StatsStore } from 'stores/Stats';

const Preview: FC = () => {

  const ref = useRef(null);
  const fileStore = useGeneralStore<FileStore>('fileStore');
  const statsStore = useGeneralStore<StatsStore>('statsStore');

  const { file } = fileStore;
  const { image } = statsStore;

  const { url, name } = file;
  const { width, height } = image;

  const style = useMemo(() => ({
    backgroundImage: `url(${url})`,
    width: `${width}px`,
    height: `${height}px`,
  }), [url, width, height])

  return useObserver(() => (
    <div className="tx-preview" ref={ref} style={style}>

    </div>
  ))
};

export { Preview };
