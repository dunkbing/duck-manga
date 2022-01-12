import { useEffect, useState } from 'react';
import { Color, ColorPicker } from 'mui-color';
import { Button, Theme, NoSsr } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import createPalette, { PaletteOptions, SimplePaletteColorOptions } from '@mui/material/styles/createPalette';
import { DuckChip } from '../../DuckChip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
    },
    chipContainer: {
      display: 'flex',
      flexFlow: 'row wrap',
      '& li': {
        borderRadius: '1rem',
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    },
    buttons: {
      padding: theme.spacing(1),
      '& button': {
        marginRight: theme.spacing(1),
      },
    },
  }),
);

type ToneType = keyof SimplePaletteColorOptions;

type Props = {
  currentPalette: PaletteOptions;
  resetPalette: () => any;
  submitPalette: (palette: PaletteOptions) => any;
};

export function PaletteChanger({ currentPalette, resetPalette, submitPalette }: Props) {
  const classes = useStyles();

  const [paletteDraft, setPaletteDraft] = useState(createPalette(currentPalette));
  const [activeColor, setActiveColor] = useState('main' as ToneType);

  const updateDraft = (value: ToneType) => (color: Color | string) => {
    setPaletteDraft((prevState) => {
      const newState = { ...prevState };
      if (typeof color === 'string') newState.primary[value] = color;
      else newState.primary[value] = `#${color.hex}`;
      return newState;
    });
  };

  useEffect(() => {
    console.log('Resetting drafts as stored one did change');
    setPaletteDraft(createPalette(currentPalette));
  }, [currentPalette]);

  return (
    <div className={classes.root}>
      <p>Main color, shades</p>
      <div className={classes.chipContainer}>
        <DuckChip
          onClick={() => setActiveColor('main')}
          style={{
            backgroundColor: paletteDraft.primary.main,
            color: paletteDraft.text.primary,
          }}
          label='main'
        />
        <DuckChip
          onClick={() => setActiveColor('light')}
          style={{
            backgroundColor: paletteDraft.primary.light,
            color: paletteDraft.text.primary,
          }}
          label='light'
        />
        <DuckChip
          onClick={() => setActiveColor('dark')}
          style={{
            backgroundColor: paletteDraft.primary.dark,
            color: paletteDraft.text.primary,
          }}
          label='dark'
        />
      </div>
      <NoSsr>
        <ColorPicker onChange={updateDraft(activeColor)} value={paletteDraft.primary[activeColor]} />
      </NoSsr>
      <div className={classes.buttons}>
        <Button onClick={resetPalette}>Reset</Button>
        <Button onClick={() => submitPalette({ primary: paletteDraft.primary })}>Save</Button>
      </div>
    </div>
  );
}
