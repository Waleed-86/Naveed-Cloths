import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-softwhite mt-24">
      <div className="stitch-divider opacity-40" />

      <div className="container-shop py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Brand + trust signals */}
        <div>
          <h3 className="font-display text-xl mb-3">
            Naveed <span className="text-accent">Cloths</span>
          </h3>
          <p className="text-sm text-lightgrey/80 leading-relaxed">
            Quality Shalwar Kameez &amp; Kurta, delivered across Pakistan.
            Cash on Delivery available — pay only when your order arrives.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-xs font-medium uppercase tracking-[0.15em] mb-4 text-accent">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm text-lightgrey/90">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-medium uppercase tracking-[0.15em] mb-4 text-accent">
            Contact
          </h4>
          <ul className="space-y-2.5 text-sm text-lightgrey/90">
            <li>WhatsApp: +92 3XX XXXXXXX</li>
            <li>Email: support@naveedcloths.pk</li>
            <li>Mon–Sat, 10am–8pm PKT</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-lightgrey/60">
        © {new Date().getFullYear()} Naveed Cloths. All rights reserved.
      </div>
    </footer>
  );
}