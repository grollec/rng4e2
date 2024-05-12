import {HTMLData} from '../parsers/backend';
import dayjs from 'dayjs';

export type RawArticle = {
  id: number;
  content: HTMLData;
  excerpt: HTMLData;
  title: HTMLData;
  link?: string;
  date: string;
  type?: string;
  _embedded?: {
    'wp:featuredmedia'?: {
      media_details?: {
        sizes?: {
          thumbnail?: {
            source_url?: string;
          };
          medium?: {
            source_url?: string;
          };
          medium_large?: {
            source_url?: string;
          };
        };
      };
    }[];
    author?: {
      name?: string;
    }[];
    'wp:term'?: {
      name?: string;
    }[][];
  };
};

export type Article = {
  id: number;
  content: string;
  excerpt: string;
  title: string;
  img?: string;
  thumbnail?: string;
  author?: string;
  categories?: string[];
  link?: string;
  type?: string;
  date: dayjs.Dayjs;
};
