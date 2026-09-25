import { albums } from '../data.js';

export default function useAlbums(limit) {
  return limit ? albums.slice(0, limit) : albums;
}
