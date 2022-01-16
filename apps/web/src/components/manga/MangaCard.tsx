import React from 'react';
import { Manga } from '@duck-manga/shared-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import { MangaImage } from './MangaImage';
import { mangaThumbnailSize } from '../../core/constants';
import { DuckChip } from '../DuckChip';

type Props = Pick<Manga, 'thumbnail' | 'title' | 'rating' | 'genres'>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '8rem',
      width: 200,
    },
    avatarWrapper: {
      margin: 0,
    },
    avatar: {
      height: mangaThumbnailSize.height,
      width: mangaThumbnailSize.width,
    },
  }),
);

const MangaCard: React.FC<Props> = ({ title, rating, thumbnail, genres }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia component='img' height='140' image={thumbnail} alt='green iguana' />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Rating name='manga-rating' readOnly value={rating} />
          <br />
          {genres.map((genre) => (
            <DuckChip key={genre} component='li' label={genre} />
          ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MangaCard;
