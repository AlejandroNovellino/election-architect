import { ColorScheme, MenuMode } from '../types';

export interface AppConfig {
  inputStyle: string;
  colorScheme: ColorScheme;
  theme: string;
  ripple: boolean;
  menuMode: MenuMode;
  layoutTheme: string;
  scale: number;
}
