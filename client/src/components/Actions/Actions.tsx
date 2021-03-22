import React, { FC, useCallback, MouseEvent } from 'react';

import { config } from 'common/config/config';
import './Actions.scss';

type ActionsCallback = (id: string) => void;

type Props = {
  id: string,
  onReload: ActionsCallback,
  onRemove: ActionsCallback,
};

const images = {
  reload: `${config.iconsURL}/reload.svg`,
  close: `${config.iconsURL}/close.svg`,
}

const Actions: FC<Props> = ({ id, onReload, onRemove }) => {

  const onClickReload = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    onReload(id);
  }, [id, onReload]);

  const onClickRemove = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    onRemove(id);
  }, [id, onRemove]);

  return (
    <div className="selection-actions">
      <img src={images.reload} alt="Refresh" onClick={onClickReload} />
      <img src={images.close} alt="close" onClick={onClickRemove} />
    </div>
  );
};

export { Actions };
