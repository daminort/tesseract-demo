import React, { FC, useRef, useMemo, useEffect, useCallback, MouseEvent } from 'react';
import { observer, useObserver } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';

import { BrowserUtils } from 'utils/BrowserUtils';
import { useGeneralStore } from 'stores/General';
import { FileStore } from 'stores/File';
import { StatsStore } from 'stores/Stats';
import { Selection, SelectionsStore } from 'stores/Selections';

const Preview: FC = observer(() => {

  const ref = useRef<HTMLDivElement>(null);
  const fileStore = useGeneralStore<FileStore>('fileStore');
  const selectionsStore = useGeneralStore<SelectionsStore>('selectionsStore');
  const statsStore = useGeneralStore<StatsStore>('statsStore');

  const { file } = fileStore;
  const { image, workspace } = statsStore;

  const { url } = file;
  const { width, ratio } = image;
  const { padding } = workspace;

  const onClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const { nativeEvent } = event;
    const { offsetX, offsetY } = nativeEvent;

    const top = Math.max(0, offsetY - padding);
    const left = Math.max(0, offsetX - padding);

    const selection: Selection = {
      top,
      left,
      id: uuid(),
      width: 50,
      height: 20,
    };
    selectionsStore.selectionUpsert(selection);
  }, [padding]);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (ref.current) {
        const params = BrowserUtils.workspaceParams(ref.current);
        statsStore.workspaceUpdate(params);
      }
    });
  }, [url, ratio]);

  const outerStyle = useMemo(() => ({
    width: `${width}px`,
    height: 'auto',
  }), [width]);

  return useObserver(() => (
    <div className="tx-preview" ref={ref} style={outerStyle}>
      <img src={url} alt={url} />
      <div className="tx-preview-inner" onClick={onClick} />
    </div>
  ))
});

export { Preview };
