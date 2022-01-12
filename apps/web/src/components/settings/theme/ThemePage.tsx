import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PaletteMode, PaletteOptions, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { setPalette, setThemeMode } from '../../../redux/theme/actions';
import { RootState } from '../../../redux/store';
import { PaletteChanger } from './PaletteChanger';
import { defaultDark, defaultLight } from '../../../redux/theme/defaults';
import { ChangeThemeRadio } from './ChangeThemeRadio';
import { SettingPart } from '../SettingPart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    label: { color: `${theme.palette.text.primary} !important` },
    focusedLabel: { color: `${theme.palette.text.primary} !important` },
    radio: {
      '&$checked': {
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
    checked: {},
    chipContainer: {
      display: 'flex',
      flexFlow: 'row wrap',
      '& li': {
        borderRadius: '1rem',
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    },
  }),
);

export function ThemePage() {
  const statePalettes = useSelector((state: RootState) => state.theme.palettes);
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <SettingPart title='Theme'>
        <ChangeThemeRadio callback={(mode: PaletteMode) => dispatch(setThemeMode(mode))} />
      </SettingPart>

      {/* <SettingPart title='Dark theme palette'>
        <PaletteChanger
          currentPalette={statePalettes.dark}
          resetPalette={useCallback(() => dispatch(setPalette('dark', defaultDark)), [dispatch])}
          submitPalette={useCallback((options: PaletteOptions) => dispatch(setPalette('dark', options)), [dispatch])}
        />
      </SettingPart>

      <SettingPart title='Light theme palette' noDivider>
        <PaletteChanger
          currentPalette={statePalettes.light}
          resetPalette={useCallback(() => dispatch(setPalette('light', defaultLight)), [dispatch])}
          submitPalette={useCallback((options: PaletteOptions) => dispatch(setPalette('light', options)), [dispatch])}
        />
      </SettingPart> */}
    </div>
  );
}
