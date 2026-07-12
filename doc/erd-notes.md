# Entity Relationship Notes

Companion doc to `database-schema.sql`. Explains relationships and *why*
certain decisions were made — read this before generating Laravel models.

## Relationships (cardinality)

- `users` 1—N `addresses`
- `users` 1—N `orders` (nullable FK — guest checkout supported)
- `categories` 1—N `products`
- `products` 1—N `product_images`
- `products` 1—N `product_variants` (a variant = size + color = actual stock unit)
- `products` 1—N `reviews`
- `users` N—N `products` via `wishlists`
- `carts` 1—N `cart_items` → each item points to a `product_variants` row (never
  directly to `products` — you always buy a specific size/color, not an abstract product)
- `orders` 1—N `order_items` (snapshotted name + price, immune to later product edits/deletes)
- `coupons` 1—N `orders` (nullable — most orders have none)

## Key Design Decisions

1. **Quality tier is computed, not stored.**
   `products.base_price` is the single source of truth. Tier boundaries
   (e.g. Economy < Rs. 3,000 ≤ Medium < Rs. 6,000 ≤ Premium) will live in
   `backend/config/quality_tiers.php` and be exposed via a `getQualityTierAttribute()`
   accessor on the `Product` model. This means the shop owner can shift
   what counts as "Premium" by editing one config file — no data migration,
   no risk of a product's price and its tier label disagreeing.

2. **Women's flow fields are nullable columns on `products`, not a separate table.**
   `piece_type`, `stitch_type`, `work_type` only apply to women's products.
   Rather than a separate `women_product_attributes` table (an extra join
   for every query), they're nullable columns directly on `products` with
   a composite index `(piece_type, stitch_type, work_type)` — the guided
   selection flow becomes a single indexed `WHERE` query.

3. **Variants, not products, hold stock and price overrides.**
   Two people can order the same Kurta in different sizes/colors with
   different stock levels — `product_variants` is the real sellable unit.
   `products.base_price` is a display/default price; `price_override` on
   the variant wins if set (e.g. XXL costs more fabric).

4. **`order_items` snapshots the product name and price at purchase time.**
   If a product is renamed, re-priced, or deleted later, historical orders
   must still show what the customer actually saw and paid — never a live
   join back to `products`.

5. **Guest checkout is supported.**
   `orders.user_id` and `carts.user_id` are nullable with a `session_id`
   fallback on `carts`, matching the reality that many first-time shoppers
   on a village shop site won't register before buying.

6. **Low stock alerts** are driven by `product_variants.low_stock_threshold`
   vs `stock_qty` — computed in the admin Reports module, not a separate table.

## What's intentionally NOT in the schema yet

- Multi-currency / multi-language — out of scope per requirements (PKR only).
- Product bundles/combos — not requested; can be added later as a
  `bundle_id` nullable FK without breaking anything above.
- Return/refund tracking — will be added when we reach the Orders module
  in more depth (currently `orders.status` only covers the forward flow).