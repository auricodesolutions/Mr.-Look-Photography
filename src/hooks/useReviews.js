import { reviews } from '../data.js';

export default function useReviews(limit = 3) {
  return reviews.slice(0, limit);
}
