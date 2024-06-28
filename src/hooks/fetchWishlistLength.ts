import { WishlistState } from "../redux/interfaces/interfaces";

export const fetchWishlistLength = (
  username: string,
  cart: WishlistState
): number => {
  const userWishlist = cart.wishlistItems.find(
    (item) => item.username === username
  );

  if (userWishlist) {
    return userWishlist.products.length;
  }

  return 0;
};
