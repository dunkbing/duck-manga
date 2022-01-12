import { PaletteMode } from '@mui/material';
import { PaletteOptions } from '@mui/material/styles/createPalette';
import { createAction } from '@reduxjs/toolkit';

export const setThemeMode = createAction<PaletteMode>('theme/setType');
export const setPalette = createAction('theme/setPalette', (mode: PaletteMode, options: PaletteOptions) => {
  return { payload: { mode, options } };
});
