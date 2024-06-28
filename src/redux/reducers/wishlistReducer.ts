import { Reducer } from "@reduxjs/toolkit";
import {
  ADD_TO_WISHLIST,
  SAVE_TO_WISHLIST,
  WishlistState,
  UPDATE_WISHLIST_ITEM_COUNT,
} from "../interfaces/interfaces";

const initialState: WishlistState = {
  wishlistItems: [],
};

const calculateCartItemCount = (products: any[]) => {
  return products.length;
};

const wishlistReducer: Reducer<WishlistState> = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_WISHLIST_ITEM_COUNT:
      const { username: updateUsername, count } = action.payload;
      const updatedWishlistItems = state.wishlistItems.map((item) => {
        if (item.username === updateUsername) {
          return {
            ...item,
            wishlistItemCount: count,
          };
        }
        return item;
      });

      return {
        ...state,
        wishlistItems: updatedWishlistItems,
      };

    case SAVE_TO_WISHLIST:
      const { username, products } = action.payload;
      const existingUserIndex = state.wishlistItems.findIndex(
        (item) => item.username === username
      );

      if (existingUserIndex !== -1) {
        return {
          ...state,
          wishlistItems: [
            ...state.wishlistItems.slice(0, existingUserIndex),
            {
              ...state.wishlistItems[existingUserIndex],
              products,
              wishlistItemCount: calculateCartItemCount(products),
            },
            ...state.wishlistItems.slice(existingUserIndex + 1),
          ],
        };
      } else {
        return {
          ...state,
          wishlistItems: [
            ...state.wishlistItems,
            {
              username,
              products,
              wishlistItemCount: calculateCartItemCount(products),
            },
          ],
        };
      }

    case ADD_TO_WISHLIST:
      const { username: addUsername, productId } = action.payload;
      const existingUserIndexAdd = state.wishlistItems.findIndex(
        (item) => item.username === addUsername
      );

      if (existingUserIndexAdd !== -1) {
        // User already exists in wishlistItems, update products array
        const updatedUserProductsAdd = [
          ...state.wishlistItems[existingUserIndexAdd].products,
        ];
        const existingProductIndexAdd = updatedUserProductsAdd.findIndex(
          (item) => item.productId === productId
        );

        if (existingProductIndexAdd === -1) {
          // Product doesn't exist, add it
          updatedUserProductsAdd.push({ productId });
        }

        return {
          ...state,
          wishlistItems: [
            ...state.wishlistItems.slice(0, existingUserIndexAdd),
            {
              ...state.wishlistItems[existingUserIndexAdd],
              products: updatedUserProductsAdd,
              wishlistItemCount: calculateCartItemCount(updatedUserProductsAdd),
            },
            ...state.wishlistItems.slice(existingUserIndexAdd + 1),
          ],
        };
      } else {
        return {
          ...state,
          wishlistItems: [
            ...state.wishlistItems,
            {
              username: addUsername,
              products: [{ productId }],
              wishlistItemCount: calculateCartItemCount([{ productId }]),
            },
          ],
        };
      }

    default:
      return state;
  }
};

export default wishlistReducer;