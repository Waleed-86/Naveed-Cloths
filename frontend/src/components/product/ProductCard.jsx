import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

/**
 * Reusable product card. Reused across Homepage, Men's/Women's Collection,
 * Search Results, and Related Products — do not create page-specific
 * variants of this; extend via props instead.
 *
 * Expects a product shape matching the future API response:
 * { slug, name, base_price, image_url, quality_tier? }
 */
export default function ProductCard({ product, onToggleWishlist, isWishlisted = false }) {
  const { slug, name, base_price, image_url, quality_tier } = product;

  const formattedPrice = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(base_price);

  return (
    <div className="group">
      <div className="relative aspect-[3/4] bg-lightgrey overflow-hidden rounded-sm">
        <Link to={`/product/${slug}`}>
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {quality_tier && (
          <span className="absolute top-3 left-3 bg-white/95 text-charcoal text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-sm">
            {quality_tier}
          </span>
        )}

        <button
          onClick={() => onToggleWishlist?.(product)}
          aria-label="Toggle wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center
                     hover:bg-white transition-colors"
        >
          <Heart
            size={15}
            strokeWidth={1.75}
            className={isWishlisted ? "text-maroon" : "text-charcoal"}
            fill={isWishlisted ? "#7A2331" : "none"}
          />
        </button>
      </div>

      <Link to={`/product/${slug}`} className="block mt-3">
        <h3 className="text-sm text-charcoal group-hover:text-accent transition-colors">{name}</h3>
        <p className="text-sm font-medium text-charcoal mt-1">{formattedPrice}</p>
      </Link>
    </div>
  );
}