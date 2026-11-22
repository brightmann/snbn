import { getDatabase } from './notion';

export const POSTS_PER_PAGE = 5;

// Newest first, by the page's creation time.
export async function getSortedPosts() {
  const database = await getDatabase();
  return [...database].sort(
    (a, b) => new Date(b.created_time) - new Date(a.created_time),
  );
}

export function getTotalPages(posts) {
  return Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
}

export function getPagePosts(posts, page) {
  const start = (page - 1) * POSTS_PER_PAGE;
  return posts.slice(start, start + POSTS_PER_PAGE);
}
