import { Link } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";

/**
 * Placeholder featured products — replace with a real API call
 * (GET /api/v1/products?featured=1) once the Product Management
 * backend module exists (Men's/Women's Collection step).
 * Images are neutral placeholders — swap for real product photos
 * via the Admin Products upload once that module is built.
 */
const FEATURED_PRODUCTS = [
  { id: 1, slug: "classic-white-kurta", name: "Classic White Kurta", base_price: 3200, quality_tier: "Medium", image_url: "https://picsum.photos/seed/kurta1/600/800" },
  { id: 2, slug: "embroidered-3pc-suit", name: "Embroidered 3-Piece Suit", base_price: 7800, quality_tier: "Premium", image_url: "https://picsum.photos/seed/suit1/600/800" },
  { id: 3, slug: "charcoal-shalwar-kameez", name: "Charcoal Shalwar Kameez", base_price: 4500, quality_tier: "Medium", image_url: "https://picsum.photos/seed/sk1/600/800" },
  { id: 4, slug: "printed-2pc-lawn", name: "Printed 2-Piece Lawn", base_price: 2600, quality_tier: "Economy", image_url: "https://picsum.photos/seed/lawn1/600/800" },
];

export default function Home() {
  return (
    <div>
      {/* ---------------- Hero ---------------- */}
      <section className="bg-charcoal text-white">
        <div className="container-shop py-20 sm:py-28 grid sm:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
              Traditional Wear, Made for You
            </p>
            <h1 className="font-display text-4xl sm:text-5xl leading-tight mb-5">
              Timeless Shalwar Kameez &amp; Kurta
            </h1>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              Hand-finished traditional clothing, delivered across Pakistan.
              Cash on Delivery available — pay only when it arrives at your door.
            </p>
            <div className="flex gap-4">
              <Link to="/men" className="btn-accent">Shop Men</Link>
              <Link to="/women" className="btn-outline border-white text-white hover:bg-white hover:text-charcoal">
                Shop Women
              </Link>
            </div>
          </div>
          <div className="hidden sm:block relative aspect-[4/5] rounded-sm overflow-hidden">
            <img
              src="https://picsum.photos/seed/hero-shop/700/900"
              alt="Featured traditional clothing"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---------------- Category Showcase ---------------- */}
      <section className="container-shop py-16 sm:py-20">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-2">
            Shop By Category
          </p>
          <h2 className="font-display text-3xl text-charcoal">Find Your Fit</h2>
          <div className="stitch-divider w-16 mx-auto mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Link to="/men" className="group relative aspect-[16/10] rounded-sm overflow-hidden">
            <img
              src="https://picsum.photos/seed/men-category/800/500"
              alt="Men's Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-mattenblack/30 flex items-end p-6">
              <span className="font-display text-2xl text-white">Men's Collection</span>
            </div>
          </Link>

          <Link to="/women" className="group relative aspect-[16/10] rounded-sm overflow-hidden">
            <img
              src="https://picsum.photos/seed/women-category/800/500"
              alt="Women's Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-mattenblack/30 flex items-end p-6">
              <span className="font-display text-2xl text-white">Women's Collection</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ---------------- Featured Products ---------------- */}
      <section className="container-shop py-16 sm:py-20">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-2">
            Handpicked For You
          </p>
          <h2 className="font-display text-3xl text-charcoal">Featured Pieces</h2>
          <div className="stitch-divider w-16 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ---------------- Trust Strip ---------------- */}
      <section className="bg-softwhite border-t border-lightgrey">
        <div className="container-shop py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-display text-lg text-charcoal mb-1">Cash on Delivery</p>
            <p className="text-sm text-charcoal/60">Pay when your order arrives</p>
          </div>
          <div>
            <p className="font-display text-lg text-charcoal mb-1">Nationwide Delivery</p>
            <p className="text-sm text-charcoal/60">Shipped across Pakistan</p>
          </div>
          <div>
            <p className="font-display text-lg text-charcoal mb-1">WhatsApp Support</p>
            <p className="text-sm text-charcoal/60">Real answers, real fast</p>
          </div>
        </div>
      </section>
    </div>
  );
}