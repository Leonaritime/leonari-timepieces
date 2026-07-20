const CART_KEY = "leonari_cart";

export function getCart() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart:updated"));
}

export function addToCart(watch) {
  const items = getCart();
  if (items.some((i) => i.id === watch.id)) return items;
  const next = [
    ...items,
    {
      id: watch.id,
      brand: watch.brand,
      model: watch.model,
      priceCents: watch.priceCents,
      imageUrl: watch.imageUrl
    }
  ];
  saveCart(next);
  return next;
}

export function removeFromCart(id) {
  const next = getCart().filter((i) => i.id !== id);
  saveCart(next);
  return next;
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount() {
  return getCart().length;
}
