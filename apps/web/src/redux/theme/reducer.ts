import { PaletteMode, PaletteOptions } from '@mui/material';
import { defaultDark, defaultLight } from './defaults';
import { createReducer } from '@reduxjs/toolkit';
import { setPalette, setThemeMode as setThemeMode } from './actions';

export type ThemeState = {
  mode: PaletteMode;
  palettes: {
    dark: PaletteOptions;
    light: PaletteOptions;
  };
};

const initialState: ThemeState = {
  mode: 'dark',
  palettes: {
    dark: defaultDark,
    light: defaultLight,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setThemeMode, (state, action) => {
    console.log('Setting theme mode to', action.payload);
    state.mode = action.payload;
  });
  builder.addCase(setPalette, (state, action) => {
    Object.assign(state.palettes[action.payload.mode], action.payload.options);
  });
});

export default reducer;
