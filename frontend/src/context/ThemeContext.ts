import { createContext } from 'react';

export interface IThemeContext {
  toggleThemeMode: () => void;
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);
