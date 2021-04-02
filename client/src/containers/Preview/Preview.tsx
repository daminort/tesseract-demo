import clsx from 'clsx';
import React, { FC, useRef, useMemo, useEffect, useCallback, useState, MouseEvent } from 'react';
import { observer, useObserver } from 'mobx-react-lite';

import { BrowserUtils } from 'utils/BrowserUtils';
import { SelectionUtils, Point } from 'utils/SelectionUtils';
import { useStore } from 'stores/Root';
import { ImageFileStore } from 'stores/ImageFile';
import { StatsStore } from 'stores/Stats';
import { SelectionsListStore } from 'stores/SelectionsList';
import { SelectionSize } from 'stores/Selection';

import './Preview.scss';

const initPoint: Point = {
  x: 0,
  y: 0,
};

const Preview: FC = observer(() => {

  const [start, setStart] = useState<Point>(initPoint);
  const [end, setEnd] = useState<Point>(initPoint);

  const ref = useRef<HTMLDivElement>(null);
  const imageFileStore = useStore<ImageFileStore>('imageFileStore');
  const selectionsListStore = useStore<SelectionsListStore>('selectionsListStore');
  const statsStore = useStore<StatsStore>('statsStore');

  const { imageFile } = imageFileStore;
  const { selectionsList, activeID } = selectionsListStore;
  const { image, workspace, scale } = statsStore;

  const { url } = imageFile;
  const { ratio } = image;
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

  const onMouseUp = useCallback(async (event: MouseEvent<HTMLDivElement>) => {
    const { top, left } = calculateCoords(event);
    const screenRectangle = SelectionUtils.createRectangle(start, { x: left, y: top });

    await selectionsListStore.selectionCreate(screenRectangle);
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

  const showRectangle = (start.x + start.y) > 0;
  const rectangleStyle = useMemo(() => {
    if (!showRectangle) {
      return {};
    }

    const rectangle = SelectionUtils.createRectangle(start, end);
    return createRectangleStyle(rectangle);
  }, [showRectangle, start, end, createRectangleStyle]);

  return (
    <div className="root-preview" ref={ref}>
      <img src={url} alt={url} />

      {selectionsList.map(selection => {
        const style = createRectangleStyle(selection.screen);
        const className = clsx('selection', {
          active: selection.id === activeID,
        });
        return (
          <div className={className} key={selection.id} style={style}></div>
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
  )
});

export { Preview };
