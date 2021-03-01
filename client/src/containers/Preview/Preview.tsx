import React, { FC, useRef, useMemo, useEffect, useCallback, useState, MouseEvent } from 'react';
import { observer, useObserver } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';

import { BrowserUtils } from 'utils/BrowserUtils';
import { useGeneralStore } from 'stores/General';
import { FileStore } from 'stores/File';
import { StatsStore } from 'stores/Stats';
import { Selection, SelectionsStore } from 'stores/Selections';

type Point = {
  x: number,
  y: number,
};

const initPoint: Point = {
  x: 0,
  y: 0,
};

const createSelection = (start: Point, end: Point): Selection => {
  const startTop = Math.min(start.y, end.y);
  const startLeft = Math.min(start.x, end.x);
  const endTop = Math.max(start.y, end.y);
  const endLeft = Math.max(start.x, end.x);

  const selection: Selection = {
    id: uuid(),
    top: Math.max(0, startTop),
    left: Math.max(0, startLeft),
    width: Math.max(0, endLeft - startLeft),
    height: Math.max(0, endTop - startTop),
  };

  return selection;
};

const Preview: FC = observer(() => {

  const [start, setStart] = useState<Point>(initPoint);
  const [end, setEnd] = useState<Point>(initPoint);

  const ref = useRef<HTMLDivElement>(null);
  const fileStore = useGeneralStore<FileStore>('fileStore');
  const selectionsStore = useGeneralStore<SelectionsStore>('selectionsStore');
  const statsStore = useGeneralStore<StatsStore>('statsStore');

  const { file } = fileStore;
  const { image, workspace } = statsStore;

  const { url } = file;
  const { width, ratio } = image;
  const { padding } = workspace;

  const calculateCoords = useMemo(() => (event: MouseEvent<HTMLDivElement>) => {
    const { nativeEvent } = event;
    const { offsetX, offsetY } = nativeEvent;

    const top = Math.max(0, offsetY - padding);
    const left = Math.max(0, offsetX - padding);

    return {
      top,
      left,
    }
  }, [padding]);

  const createSelectionStyle = useMemo(() => (selection: Selection) => {
    const { id, ...properties } = selection;
    return {
      ...properties,
      top: properties.top + padding,
      left: properties.left + padding,
    };
  }, [padding]);

  const onMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const { top, left } = calculateCoords(event);
    setStart({
      x: left,
      y: top,
    });
  }, [calculateCoords, setStart]);

  const onMouseUp = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const { top, left } = calculateCoords(event);
    const selection = createSelection(start, { x: left, y: top });

    selectionsStore.selectionUpsert(selection);
    setStart(initPoint);
    setEnd(initPoint);

  }, [calculateCoords, start, setStart, setEnd]);

  const onMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const { top, left } = calculateCoords(event);
    setEnd({
      x: left,
      y: top,
    });
  }, [calculateCoords, setEnd]);

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

  const showSelection = (start.x + start.y) > 0;
  const selectionStyle = useMemo(() => {
    if (!showSelection) {
      return {};
    }

    const selection = createSelection(start, end);
    return createSelectionStyle(selection);
  }, [showSelection, start, end, createSelectionStyle]);

  return useObserver(() => (
    <div className="tx-preview" ref={ref} style={outerStyle}>
      <img src={url} alt={url} />
      {selectionsStore.selections.map(s => {
        const style = createSelectionStyle(s);
        return (
          <div className="tx-preview-selection" key={s.id} style={style}></div>
        );
      })}
      {showSelection && (
        <div className="tx-preview-current-selection" style={selectionStyle}></div>
      )}
      <div
        className="tx-preview-inner"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />
    </div>
  ))
});

export { Preview };
