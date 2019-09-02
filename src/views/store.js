import { writable, readable } from 'svelte/store';
import db from '../../public/database.json';
import _ from 'lodash';

const idx2showcase = idx => `showcase/${idx}.webp`;

function createModalData() {
  const { subscribe, set, update } = writable(null);
  const getPost = idx =>
    _.inRange(idx, db.length)
      ? {
          type: 'post',
          idx,
          curr: _.get(db, idx, null),
          prev: _.get(db, idx - 1, null),
          next: _.get(db, idx + 1, null)
        }
      : null;
  const getImage = idx =>
    _.inRange(idx, 14)
      ? {
          type: 'img',
          idx,
          curr: idx2showcase(idx),
          next: idx2showcase(idx + 1),
          prev: idx2showcase(idx - 1)
        }
      : null;

  return {
    subscribe,
    reset: () => set(null),
    setPost: idx => set(getPost(idx)),
    setImage: idx => set(getImage(idx)),
    goNext: () => update(n => (n ? (n.type == 'post' ? getPost : getImage)(n.idx + 1) : null)),
    goPrev: () => update(n => (n ? (n.type == 'post' ? getPost : getImage)(n.idx - 1) : null))
  };
}

export const posts = readable(db);
export const modalData = createModalData();
