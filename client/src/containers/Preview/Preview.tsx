import React, { FC, useRef, useMemo, useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';

import { FileStore } from 'stores/File';
import { useGeneralStore } from 'stores/General';
import { StatsStore } from 'stores/Stats';
import { BrowserUtils } from 'utils/BrowserUtils';

const Preview: FC = () => {

  const ref = useRef<HTMLDivElement>(null);
  const fileStore = useGeneralStore<FileStore>('fileStore');
  const statsStore = useGeneralStore<StatsStore>('statsStore');

  const { file } = fileStore;
  const { image } = statsStore;

  const { url } = file;
  const { width, height } = image;

  const style = useMemo(() => ({
    backgroundImage: `url(${url})`,
    width: `${width}px`,
    height: `${height}px`,
  }), [url, width, height]);

  useEffect(() => {
    if (ref.current) {
      const size = BrowserUtils.getInnerSize(ref.current);
      statsStore.workspaceUpdate(size);
    }
  }, [url]);

  return useObserver(() => (
    <div className="tx-preview" ref={ref} style={style}>

    </div>
  ))
};

export { Preview };
