import React, { FC, useRef, useMemo, useEffect, useCallback, useState, MouseEvent } from 'react';
import { observer, useObserver } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';

import { BrowserUtils } from 'utils/BrowserUtils';
import { SelectionUtils, Point } from 'utils/SelectionUtils';
import { useGeneralStore } from 'stores/General';
import { FileStore } from 'stores/File';
import { StatsStore } from 'stores/Stats';
import { Selection, SelectionSize, SelectionsStore } from 'stores/Selections';

import './Preview.scss';

const initPoint: Point = {
  x: 0,
  y: 0,
};

// const createSelection = (start: Point, end: Point): Selection => {
//   const startTop = Math.min(start.y, end.y);
//   const startLeft = Math.min(start.x, end.x);
//   const endTop = Math.max(start.y, end.y);
//   const endLeft = Math.max(start.x, end.x);
//
//   const selection: Selection = {
//     id: uuid(),
//     top: Math.max(0, startTop),
//     left: Math.max(0, startLeft),
//     width: Math.max(0, endLeft - startLeft),
//     height: Math.max(0, endTop - startTop),
//   };
//
//   return selection;
// };

const Preview: FC = observer(() => {

  const [start, setStart] = useState<Point>(initPoint);
  const [end, setEnd] = useState<Point>(initPoint);

  const ref = useRef<HTMLDivElement>(null);
  const fileStore = useGeneralStore<FileStore>('fileStore');
  const selectionsStore = useGeneralStore<SelectionsStore>('selectionsStore');
  const statsStore = useGeneralStore<StatsStore>('statsStore');

  const { file } = fileStore;
  const { image, workspace, scale } = statsStore;

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

  const createRectangleStyle = useMemo(() => (rectangle: SelectionSize) => {
    return {
      ...rectangle,
      top: rectangle.top + padding,
      left: rectangle.left + padding,
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
    const rectangle = SelectionUtils.createRectangle(start, { x: left, y: top });
    const selection = SelectionUtils.createSelection(rectangle, scale);

    selectionsStore.selectionUpsert(selection);
    setStart(initPoint);
    setEnd(initPoint);

  }, [calculateCoords, start, setStart, setEnd, scale]);

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

  const showRectangle = (start.x + start.y) > 0;
  const rectangleStyle = useMemo(() => {
    if (!showRectangle) {
      return {};
    }

    const rectangle = SelectionUtils.createRectangle(start, end);
    return createRectangleStyle(rectangle);
  }, [showRectangle, start, end, createRectangleStyle]);

  return useObserver(() => (
    <div className="root-preview" ref={ref} style={outerStyle}>
      <img src={url} alt={url} />
      {selectionsStore.selections.map(selection => {
        const style = createRectangleStyle(selection.screen);
        return (
          <div className="selection" key={selection.id} style={style}></div>
        );
      })}
      {showRectangle && (
        <div className="rectangle" style={rectangleStyle}></div>
      )}
      <div
        className="inner"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />
    </div>
  ))
});

export { Preview };
