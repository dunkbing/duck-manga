import { forwardRef } from 'react';
import { DuckChip, DuckChipProps } from '../../../DuckChip';

type Props = {
  value: number;
  chipWidth: number;
} & DuckChipProps;

export const ChapterChip = forwardRef(({ value, chipWidth, variant, ...props }: Props, ref: any) => {
  const style = {
    width: `${chipWidth}rem`,
    padding: 0,
    margin: '0 1rem 0 0',
    fontSize: 'small',
  };
  // classes override seems to not work, hotfixing for now with inline styles
  return <DuckChip label={value} style={style} variant={variant || 'outlined'} size="small" ref={ref} props={props} />;
});

ChapterChip.defaultProps = {
  chipWidth: 2.6,
};
