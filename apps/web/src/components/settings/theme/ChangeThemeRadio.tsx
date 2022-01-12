import { FormControl, FormControlLabel, PaletteMode, Radio, RadioGroup, useTheme } from '@mui/material';

type Props = {
  callback: (type: PaletteMode) => any;
};

export const ChangeThemeRadio = ({ callback }: Props) => {
  const theme = useTheme();

  return (
    <FormControl component='fieldset'>
      <RadioGroup name='theme' value={theme.palette.mode}>
        <FormControlLabel
          value='dark'
          label='Dark'
          control={<Radio color='primary' />}
          checked={theme.palette.mode === 'dark'}
          onChange={() => callback('dark')}
        />
        <FormControlLabel
          value='light'
          label='Light'
          control={<Radio color='primary' />}
          checked={theme.palette.mode === 'light'}
          onChange={() => callback('light')}
        />
      </RadioGroup>
    </FormControl>
  );
};
