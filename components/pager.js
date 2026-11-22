import Link from 'next/link';
import styles from '../app/index.module.css';

function pageHref(page) {
  return page === 1 ? '/' : `/page/${page}`;
}

// Numbered pager: Previous | 1 | 2 | … | N | Next.
function pageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (current > 3) pages.push('…');
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p += 1) {
    pages.push(p);
  }
  if (current < total - 2) pages.push('…');
  pages.push(total);
  return pages;
}

function renderPageItem(p, nextPage, currentPage) {
  if (p === '…') {
    return (
      <span key={`ellipsis-before-${nextPage}`} className={styles.pagerEllipsis}>…</span>
    );
  }
  if (p === currentPage) {
    return (
      <span key={p} className={styles.pagerCurrent}>{p}</span>
    );
  }
  return (
    <Link key={p} className={styles.pagerLink} href={pageHref(p)}>
      {p}
    </Link>
  );
}

// Hidden when there is a single page.
export default function Pager({ currentPage, totalPages }) {
  if (totalPages <= 1) return null;
  const numbers = pageNumbers(currentPage, totalPages);
  return (
    <nav className={styles.pager} aria-label="Pagination">
      {currentPage > 1 ? (
        <Link className={styles.pagerLink} href={pageHref(currentPage - 1)}>
          ← Previous
        </Link>
      ) : (
        <span className={styles.pagerDisabled}>← Previous</span>
      )}
      {numbers.map((p, i) => renderPageItem(p, numbers[i + 1], currentPage))}
      {currentPage < totalPages ? (
        <Link className={styles.pagerLink} href={pageHref(currentPage + 1)}>
          Next →
        </Link>
      ) : (
        <span className={styles.pagerDisabled}>Next →</span>
      )}
    </nav>
  );
}
