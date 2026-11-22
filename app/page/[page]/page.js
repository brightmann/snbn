import { notFound, redirect } from 'next/navigation';
import BlogHeader from '../../../components/blog-header';
import PostList from '../../../components/post-list';
import Pager from '../../../components/pager';
import { getSortedPosts, getTotalPages, getPagePosts } from '../../../lib/pagination';
import styles from '../../index.module.css';

export async function generateStaticParams() {
  const posts = await getSortedPosts();
  const totalPages = getTotalPages(posts);
  const pages = [];
  for (let p = 1; p <= totalPages; p += 1) {
    pages.push({ page: String(p) });
  }
  // Next's static export errors when generateStaticParams returns an empty
  // list, so emit one placeholder route that 404s (see Page).
  return pages.length > 0 ? pages : [{ page: '2' }];
}

export async function generateMetadata({ params }) {
  return { title: `Page ${params?.page} — Notion Next.js blog` };
}

export default async function Page({ params }) {
  const page = Number(params?.page);
  if (page === 1) redirect('/');
  const posts = await getSortedPosts();
  const totalPages = getTotalPages(posts);
  if (!Number.isInteger(page) || page < 1 || page > totalPages) notFound();
  const pagePosts = getPagePosts(posts, page);
  return (
    <div>
      <main className={styles.container}>
        <BlogHeader />

        <h2 className={styles.heading}>All Posts</h2>
        <PostList posts={pagePosts} />
        <Pager currentPage={page} totalPages={totalPages} />
      </main>
    </div>
  );
}
