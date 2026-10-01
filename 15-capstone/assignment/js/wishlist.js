// =============================================================
// wishlist.js — saving products for later.
// Same idea as cart.js: rules only, no HTML.
// =============================================================
import { getState, setState } from './state.js';

// STEP 27: the small copy of a product we keep in the wishlist.
function createWishlistItem(product) {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    discountPercentage: product.discountPercentage,
    rating: product.rating,
    stock: product.stock,
    thumbnail: product.thumbnail,
    category: product.category,
    brand: product.brand,
  };
}

// STEP 27: is this product saved?
export function isInWishlist(productId) {
  return getState().wishlist.some((item) => item.id === productId);
}

// STEP 27: remove one product from the wishlist.
export function removeFromWishlist(productId) {
  const { wishlist } = getState();
  setState({ wishlist: wishlist.filter((item) => item.id !== productId) });
}

// STEP 27: save it if it isn't saved, remove it if it is.
// Returns true when the product is NOW in the wishlist.
export function toggleWishlist(product) {
  if (isInWishlist(product.id)) {
    removeFromWishlist(product.id);
    return false;
  }
  const { wishlist } = getState();
  setState({ wishlist: [createWishlistItem(product), ...wishlist] });
  return true;
}
