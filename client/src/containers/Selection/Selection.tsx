import React, { FC, useCallback } from 'react';
import clsx from 'clsx';
import { observer, useObserver } from 'mobx-react-lite';

import { useSelectionStore } from 'stores/Selection';
import { Actions } from 'components/Actions';

import 'containers/Selection/Selection.scss';

type Props = {
  id: string,
  isActive: boolean,
  onClick: (id: string) => void,
  onRemove: (id: string) => void,
};

const Selection: FC<Props> = observer(({ id, isActive, onClick, onRemove }) => {

  const selectionStore = useSelectionStore(id);

  const { screen, real, text, confidence } = selectionStore;

  const onSelectionClick = useCallback(() => {
    onClick(id);
  }, [onClick]);

  const onReload = useCallback(async () => {
    await selectionStore.recognize();
  }, []);

  const screenStart = `Screen: ${(screen.left).toFixed(2)}, ${(screen.top).toFixed(2)}`;
  const realStart = `Real: ${(real.left).toFixed(2)}, ${(real.top).toFixed(2)}`;

  const screenEnd = `Screen: ${(screen.left + screen.width).toFixed(2)}, ${(screen.top + screen.height).toFixed(2)}`;
  const realEnd = `Real: ${(real.left + real.width).toFixed(2)}, ${(real.top + real.height).toFixed(2)}`;

  const selectionClass = clsx('selection', {
    active: isActive,
  });

  const showConfidence = (confidence > 0);
  const resConfidence = confidence < 100 ? confidence.toFixed(1) : 100;

  return (
    <div className={selectionClass} onClick={onSelectionClick}>
      <div className="title">{text}</div>
      {showConfidence && (
        <div className="confidence" title="Confidence">{resConfidence}&nbsp;%</div>
      )}
      <div className="start">
        <span className="screen">{screenStart}</span>
        <span className="delimiter">|</span>
        <span className="real">{realStart}</span>
      </div>
      <div className="end">
        <span className="screen">{screenEnd}</span>
        <span className="delimiter">|</span>
        <span className="real">{realEnd}</span>
      </div>

      <Actions
        id={id}
        onReload={onReload}
        onRemove={onRemove}
      />
    </div>
  );
});

export { Selection };
