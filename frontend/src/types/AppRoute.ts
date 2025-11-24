import { ComponentType, FC } from 'react';

export type AppRoute = {
  key: string;
  title?: string | object;
  fullTitle?: string | object;
  description?: string;
  path?: string;
  authorities?: string[];
  component?: FC;
  isEnabled?: boolean;
  isHidden?: boolean;
  icon?: ComponentType;
  subRoutes?: AppRoute[];
  appendDivider?: boolean;
  expanded?: boolean;
};
