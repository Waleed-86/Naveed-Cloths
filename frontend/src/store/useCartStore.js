import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// A line is unique per product + size + colour combination
function lineKey(productId, size, color) {
  return `${productId}::${size ?? 'na'}::${color ?? 'na'}`
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // { key, productId, slug, name, price, tone, size, color, quantity, stock }
      coupon: null, // { code, type, value, discount } | null

      setCoupon: (coupon) => set({ coupon }),
      clearCoupon: () => set({ coupon: null }),

      addItem: (product, { size = null, color = null, quantity = 1 } = {}) => {
        const key = lineKey(product.id, size, color)
        const existing = get().items.find((i) => i.key === key)

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.key === key ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock ?? 99) } : i
            ),
          })
        } else {
          set({
            items: [
              ...get().items,
              {
                key,
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.discountPrice ?? product.price,
                tone: product.tone,
                size,
                color,
                quantity,
                stock: product.stock ?? 99,
              },
            ],
          })
        }
      },

      removeItem: (key) => set({ items: get().items.filter((i) => i.key !== key) }),

      updateQuantity: (key, quantity) =>
        set({
          items: get().items.map((i) =>
            i.key === key ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) } : i
          ),
        }),

      clearCart: () => set({ items: [], coupon: null }),
    }),
    { name: 'sila-cart' }
  )
)

// Selectors — call as useCartStore(selectCartCount) so values stay live and
// aren't affected by how the persist middleware merges rehydrated state.
export const selectCartCount = (state) => state.items.reduce((sum, i) => sum + i.quantity, 0)
export const selectCartSubtotal = (state) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)