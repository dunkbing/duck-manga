import { green, red, teal } from '@mui/material/colors';
import { PaletteOptions } from '@mui/material/styles/createPalette';

export const defaultDark: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: teal['300'],
    light: teal.A100,
    dark: teal.A700,
  },
  error: {
    main: red['600'],
    dark: red['700'],
    light: red['400'],
  },
};

export const defaultLight: PaletteOptions = {
  mode: 'light',
  primary: {
    main: green.A200,
    light: green.A100,
    dark: green.A700,
  },
};
