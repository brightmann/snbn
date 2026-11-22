import BlogHeader from '../components/blog-header';
import PostList from '../components/post-list';
import Pager from '../components/pager';
import { getSortedPosts, getTotalPages, getPagePosts } from '../lib/pagination';
import styles from './index.module.css';

export default async function Page() {
  const posts = await getSortedPosts();
  const totalPages = getTotalPages(posts);
  const pagePosts = getPagePosts(posts, 1);
  return (
    <div>
      <main className={styles.container}>
        <BlogHeader />

        <h2 className={styles.heading}>All Posts</h2>
        <PostList posts={pagePosts} />
        <Pager currentPage={1} totalPages={totalPages} />
      </main>
    </div>
  );
}
