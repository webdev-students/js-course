// =============================================================
// ui/pagination.js — "← Prev 1 … 4 5 6 … 17 Next →"
// Each page number is a real link (#/?page=5), so it works with
// the keyboard, middle-click, and the Back button for free.
// =============================================================
import { escapeHTML } from '../utils.js';

// STEP 10: which page numbers to show. With lots of pages we show
// the first, the last, and the ones next to the current page.
//   getPageNumbers(1, 5)   → [1, 2, 3, 4, 5]
//   getPageNumbers(5, 17)  → [1, '…', 4, 5, 6, '…', 17]
export function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  const pages = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  if (start > 2) {
    pages.push('…');
  }
  for (let page = start; page <= end; page++) {
    pages.push(page);
  }
  if (end < totalPages - 1) {
    pages.push('…');
  }
  pages.push(totalPages);
  return pages;
}

// STEP 10: the HTML. getPageHref(5) gives back e.g. '#/?q=phone&page=5'.
export function createPaginationHTML({ currentPage, totalPages, getPageHref }) {
  if (totalPages <= 1) {
    return '';
  }

  const previousLink = currentPage > 1
    ? `<a class="pagination-link" href="${escapeHTML(getPageHref(currentPage - 1))}" rel="prev">← Prev</a>`
    : '<span class="pagination-link is-disabled" aria-disabled="true">← Prev</span>';

  const nextLink = currentPage < totalPages
    ? `<a class="pagination-link" href="${escapeHTML(getPageHref(currentPage + 1))}" rel="next">Next →</a>`
    : '<span class="pagination-link is-disabled" aria-disabled="true">Next →</span>';

  const pageItems = getPageNumbers(currentPage, totalPages)
    .map((page) => {
      if (page === '…') {
        return '<li class="pagination-ellipsis" aria-hidden="true">…</li>';
      }
      if (page === currentPage) {
        return `<li><a class="pagination-link is-current" href="${escapeHTML(getPageHref(page))}" aria-current="page" aria-label="Page ${page}, current page">${page}</a></li>`;
      }
      return `<li><a class="pagination-link" href="${escapeHTML(getPageHref(page))}" aria-label="Page ${page}">${page}</a></li>`;
    })
    .join('');

  return `
    ${previousLink}
    <ol class="pagination-pages">${pageItems}</ol>
    ${nextLink}
  `;
}
