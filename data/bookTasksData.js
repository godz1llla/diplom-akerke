import { WEEK1 } from './week1';
import { WEEK2 } from './week2';
import { WEEK3 } from './week3';
import { WEEK4, WEEK5, WEEK6 } from './weeks4to6';
import { WEEK7, WEEK8, WEEK9, WEEK10 } from './weeks7to10';

export const BOOK_TABS = [
  { id: 'relationship', label: 'Relationship', emoji: '💬', color: '#f59e0b', weeks: [WEEK1, WEEK2, WEEK3] },
  { id: 'health',       label: 'Health',       emoji: '🥗', color: '#10b981', weeks: [WEEK4, WEEK5, WEEK6] },
  { id: 'tall-stories', label: 'Tall Stories',  emoji: '📖', color: '#6244eb', weeks: [WEEK7, WEEK8, WEEK9] },
  { id: 'final',        label: 'Final',         emoji: '🏆', color: '#ef4444', weeks: [WEEK10] },
];
