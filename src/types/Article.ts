import {HTMLData} from '../parsers/backend';

export type RawArticle = {
  id: number;
  content: HTMLData;
  excerpt: HTMLData;
  title: HTMLData;
  fimg_url?: string;
};

export type Article = {
  id: number;
  content: string;
  excerpt: string;
  title: string;
  img?: string;
};
