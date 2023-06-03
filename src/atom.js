import { atom } from 'recoil';

export const favoritesState = atom({
  key: 'favoritesState',
  default: JSON.parse(localStorage.getItem('favorites')) || [],
});