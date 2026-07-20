const WISHLIST_KEY = "leonari_wishlist";

export function getWishlist() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

function saveWishlist(items) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("wishlist:updated"));
}

export function isWishlisted(id) {
  return getWishlist().some((i) => i.id === id);
}

export function toggleWishlist(watch) {
  const items = getWishlist();
  const exists = items.some((i) => i.id === watch.id);
  const next = exists
    ? items.filter((i) => i.id !== watch.id)
    : [
        ...items,
        {
          id: watch.id,
          brand: watch.brand,
          model: watch.model,
          priceCents: watch.priceCents,
          imageUrl: watch.imageUrl
        }
      ];
  saveWishlist(next);
  return !exists;
}

export function removeFromWishlist(id) {
  const next = getWishlist().filter((i) => i.id !== id);
  saveWishlist(next);
  return next;
}

export function getWishlistCount() {
  return getWishlist().length;
}
