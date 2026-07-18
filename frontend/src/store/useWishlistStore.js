import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [], // full product objects, so pages can reuse ProductCard/ProductGrid directly

      toggleItem: (product) => {
        const exists = get().items.some((p) => p.id === product.id)
        if (exists) {
          set({ items: get().items.filter((p) => p.id !== product.id) })
        } else {
          set({ items: [...get().items, product] })
        }
      },

      removeItem: (productId) =>
        set({ items: get().items.filter((p) => p.id !== productId) }),

      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'sila-wishlist' }
  )
)

// Selectors — keep these as plain functions (not getters) for the same
// reason as the cart store: persist rehydration merges via spread, which
// would freeze a getter into a stale value.
export const selectWishlistCount = (state) => state.items.length
export const selectIsWishlisted = (productId) => (state) =>
  state.items.some((p) => p.id === productId)