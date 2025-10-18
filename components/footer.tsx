import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">ProServe</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Your trusted partner for comprehensive business solutions and professional services.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-primary-foreground/80 hover:text-primary-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#apply" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Apply
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Business Consulting
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Financial Planning
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-primary-foreground/80 hover:text-primary-foreground">
                  HR Solutions
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Risk Management
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-primary-foreground/80 mb-4 text-sm">Subscribe to get the latest updates and insights.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
              />
              <button className="px-4 py-2 bg-primary-foreground text-primary rounded font-semibold hover:bg-primary-foreground/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/80 text-sm">
          <p>&copy; {new Date().getFullYear()} ProServe Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
