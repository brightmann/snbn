import { Fragment } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  getDatabase, getBlocks, getPageFromSlug,
} from '../../../lib/notion';
import Text from '../../../components/text';
import { renderBlock } from '../../../components/notion/renderer';
import styles from '../../../styles/post.module.css';

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const database = await getDatabase();
  const params = database?.map((page) => {
    const slug = page.properties.Slug?.rich_text?.[0]?.plain_text;
    return ({ id: page.id, slug });
  }) ?? [];
  // Next's static export errors when generateStaticParams returns an empty
  // list (empty blog), so emit one placeholder route that 404s (see Page).
  return params.length > 0 ? params : [{ slug: '__empty' }];
}

export async function generateMetadata({ params }) {
  const page = await getPageFromSlug(params?.slug);
  return {
    title: page.properties?.Title?.title?.[0]?.plain_text ?? 'Notion Next.js blog',
  };
}

export default async function Page({ params }) {
  const page = await getPageFromSlug(params?.slug);
  if (!page?.id) notFound();
  const blocks = await getBlocks(page?.id);

  if (!page || !blocks) {
    return <div />;
  }

  return (
    <div>
      <article className={styles.container}>
        <h1 className={styles.name}>
          <Text title={page.properties.Title?.title} />
        </h1>
        <section>
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
          <Link href="/" className={styles.back}>
            ← Go home
          </Link>
        </section>
      </article>
    </div>
  );
}

// export const getStaticPaths = async () => {
//   const database = await getDatabase(databaseId);
//   return {
//     paths: database.map((page) => {
//       const slug = page.properties.Slug?.formula?.string;
//       return ({ params: { id: page.id, slug } });
//     }),
//     fallback: true,
//   };
// };

// export const getStaticProps = async (context) => {
//   const { slug } = context.params;
//   const page = await getPage(id);
//   const blocks = await getBlocks(id);

//   return {
//     props: {
//       page,
//       blocks,
//     },
//     revalidate: 1,
//   };
// };
