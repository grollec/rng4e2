import {HTMLData} from '../parsers/backend';

export type RawNews = {
  id: number;
  content: HTMLData;
  excerpt: HTMLData;
  title: HTMLData;
};

export type News = {
  id: number;
  content: string;
  excerpt: string;
  title: string;
};
