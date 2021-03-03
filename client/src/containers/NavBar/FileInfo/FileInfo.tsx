import React, { FC } from 'react';
import { observer, useObserver } from 'mobx-react-lite';

import { useGeneralStore } from 'stores/General';
import { FileStore } from 'stores/File';
import { StatsStore } from 'stores/Stats';

import './FileInfo.scss';

const FileInfo: FC = observer(() => {

  const statsStore = useGeneralStore<StatsStore>('statsStore');
  const fileStore = useGeneralStore<FileStore>('fileStore');

  const { image, workspace, scale } = statsStore;
  const { name } = fileStore.file;

  const ratio = (image.ratio).toFixed(3);
  const workspaceWidth = (workspace.width).toFixed(0);
  const workspaceHeight = (workspace.height).toFixed(0);

  return (
    <div className="root-file-info">
      <div className="file">{name}</div>
      <div className="item">
        <div>image size</div>
        <div>{image.width} x {image.height}</div>
      </div>
      <div className="item">
        <div>ratio</div>
        <div>{ratio}</div>
      </div>
      <div className="item">
        <div>workspace</div>
        <div>{workspaceWidth} x {workspaceHeight}</div>
      </div>
      <div className="item">
        <div>scale</div>
        <div>1: {scale}</div>
      </div>
    </div>
  );
});

export { FileInfo };
