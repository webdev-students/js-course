// =============================================================
// ui/skeletons.js — grey "shimmering" placeholders shown while
// products load. They're the same shape as the real thing, so
// the page doesn't jump around when the data arrives.
// =============================================================

// STEP 08: one fake product card.
function createSkeletonCardHTML() {
  return `
    <div class="product-card product-card-skeleton" aria-hidden="true">
      <div class="skeleton skeleton-image"></div>
      <div class="skeleton skeleton-line"></div>
      <div class="skeleton skeleton-line skeleton-short"></div>
      <div class="skeleton skeleton-button"></div>
    </div>
  `;
}

// STEP 08: a grid's worth of fake cards.
export function createSkeletonCardsHTML(count) {
  return Array.from({ length: count }, createSkeletonCardHTML).join('');
}

// STEP 15: the fake version of the product detail page.
export function createDetailSkeletonHTML() {
  return `
    <div class="product-detail" aria-hidden="true">
      <div class="skeleton skeleton-gallery"></div>
      <div class="product-detail-info">
        <div class="skeleton skeleton-line skeleton-short"></div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-line"></div>
        <div class="skeleton skeleton-line"></div>
        <div class="skeleton skeleton-line skeleton-short"></div>
        <div class="skeleton skeleton-button"></div>
      </div>
    </div>
  `;
}
