import React, { FC } from 'react';
import { observer, useObserver } from 'mobx-react-lite';

import { useGeneralStore } from 'stores/General';
import { FileStore } from 'stores/File';
import { StatsStore } from 'stores/Stats';

const Stats: FC = observer(() => {

  const statsStore = useGeneralStore<StatsStore>('statsStore');
  const fileStore = useGeneralStore<FileStore>('fileStore');

  const { image, workspace, scale } = statsStore;
  const { name } = fileStore.file;

  const workspaceWidth = (workspace.width).toFixed(0);
  const workspaceHeight = (workspace.height).toFixed(0);

  return useObserver(() => (
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
        <div className="font-bold">Ratio</div>
        <div className="pl-1">{(image.ratio).toFixed(3)}</div>
      </div>
      <div className="mb-2">
        <div className="font-bold">Workspace</div>
        <div className="pl-1">{workspaceWidth} x {workspaceHeight}</div>
      </div>
      <div className="mb-2">
        <div className="font-bold">Scale</div>
        <div className="pl-1">1 : {scale}</div>
      </div>
    </div>
  ));
});

export { Stats };
