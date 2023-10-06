import { FC } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import type { ITooltip } from 'react-tooltip';

export const Tooltip: FC<ITooltip> = (props) => {
  return <ReactTooltip {...props} />;
};
