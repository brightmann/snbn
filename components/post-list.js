import Link from 'next/link';
import Text from './text';
import styles from '../app/index.module.css';

export default function PostList({ posts }) {
  return (
    <ol className={styles.posts}>
      {posts.map((post) => {
        const date = new Date(post.last_edited_time).toLocaleString(
          'en-US',
          {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          },
        );
        const slug = post.properties?.Slug?.rich_text?.[0]?.plain_text ?? '';
        return (
          <li key={post.id} className={styles.post}>
            <h3 className={styles.postTitle}>
              <Link href={`/article/${slug}`}>
                <Text title={post.properties?.Title?.title} />
              </Link>
            </h3>

            <p className={styles.postDescription}>{date}</p>
            <Link href={`/article/${slug}`}>Read post →</Link>
          </li>
        );
      })}
    </ol>
  );
}
