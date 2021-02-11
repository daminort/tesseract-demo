import React, { FC } from 'react';
import { useObserver, observer } from 'mobx-react-lite';

import { StatsProvider, useStatsStore } from 'stores/Stats/context';
import { FileStoreProvider, useFileStore } from 'stores/File/context';

const Stats: FC = observer(() => {
  const store = useStatsStore();
  const fileStore = useFileStore();

  const { image, scale } = store;
  const { name } = fileStore.file;

  return useObserver(() => (
    <StatsProvider>
      <FileStoreProvider>
        <div className="tx-stats w-1/6 p-2 mt-1">
          <div className="mb-2">
            <div className="font-bold">File</div>
            <div className="pl-1">{name}</div>
          </div>
          <div className="mb-2">
            <div className="font-bold">Image size</div>
            <div className="pl-1">{image.width} x {image.height}</div>
          </div>
          <div className="mb-2">
            <div className="font-bold">Scale</div>
            <div className="pl-1">{scale} : 1</div>
          </div>
        </div>
      </FileStoreProvider>
    </StatsProvider>
  ));
});

export { Stats };
