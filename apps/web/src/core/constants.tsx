import { ListType } from '../redux/saveLists/types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListIcon from '@mui/icons-material/List';

export type SaveListMap = { icon: JSX.Element; alt: string };

export const saveList: Record<ListType, SaveListMap> = {
  favorite: { icon: <FavoriteIcon />, alt: 'Favorites' },
  readLater: { icon: <ListIcon />, alt: 'Read later' },
};

export const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
export const domain = process.env.NODE_ENV === 'production' ? 'duck-manga.app' : 'localhost:3000';
export const baseUrl = `${protocol}://${domain}`;
export const resizeUrl = process.env.RESIZE_URL;

export const mangaThumbnailSize = { width: 130, height: 180 };

export const detailUpdateDeadline = 1;
export const chapterUpdateDeadline = 1;
