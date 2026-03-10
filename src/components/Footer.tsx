import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <span className="text-sm font-bold text-secondary-foreground font-heading">E</span>
            </div>
            <span className="text-lg font-bold font-heading">EquiFund</span>
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Smarter funding decisions for inclusive entrepreneurship.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/50">Platform</h4>
          <div className="flex flex-col gap-2">
            <Link to="/about" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">About</Link>
            <Link to="/how-it-works" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">How It Works</Link>
            <Link to="/community-impact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Community Impact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/50">Get Started</h4>
          <div className="flex flex-col gap-2">
            <Link to="/get-started" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Entrepreneurs</Link>
            <Link to="/login" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Financial Institutions</Link>
            <Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contact Us</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/50">Support</h4>
          <div className="flex flex-col gap-2">
            <a href="mailto:support@equifund.ca" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">support@equifund.ca</a>
            <Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">FAQs</Link>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center gap-2 border-t border-primary-foreground/10 pt-6 text-center">
        <p className="text-xs text-primary-foreground/50 flex items-center gap-1">
          Built with <Heart className="h-3 w-3 text-destructive" aria-hidden="true" /> for inclusive entrepreneurship
        </p>
        <p className="text-xs text-primary-foreground/40">© 2026 EquiFund. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
