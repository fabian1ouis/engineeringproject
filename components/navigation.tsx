"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useActiveSection } from "@/hooks/use-active-section"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { activeColor, isDarkBackground, isDarkTheme } = useActiveSection()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ]

  const getNavbarClasses = () => {
    const baseClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500`
    const scrollClasses = isScrolled
      ? `shadow-lg border-b border-primary-foreground/20`
      : `border-b border-primary-foreground/20`

    const colorClasses = {
      primary: `bg-primary/95 dark:bg-primary/90 backdrop-blur-md`,
      secondary: `bg-secondary/95 dark:bg-secondary/90 backdrop-blur-md`,
      accent: `bg-accent/95 dark:bg-accent/90 backdrop-blur-md`,
      muted: `bg-muted/95 dark:bg-muted/90 backdrop-blur-md`,
    }

    return `${baseClasses} ${colorClasses[activeColor]} ${scrollClasses}`
  }

  const getTextColor = () => {
    // In dark theme, always use light text for better contrast
    if (isDarkTheme) {
      return "text-white"
    }
    // In light theme, use white for dark sections, black for bright sections
    return isDarkBackground ? "text-white" : "text-black"
  }

  const getTextColorMuted = () => {
    if (isDarkTheme) {
      return "text-white/80"
    }
    return isDarkBackground ? "text-white/80" : "text-black/80"
  }

  const getUnderlineColor = () => {
    if (isDarkTheme) {
      return "bg-white"
    }
    return isDarkBackground ? "bg-white" : "bg-black"
  }

  const textColorClass = getTextColor()
  const textColorHoverClass = isDarkTheme
    ? "hover:text-white"
    : isDarkBackground
      ? "hover:text-white"
      : "hover:text-black"
  const textColorMutedClass = getTextColorMuted()
  const underlineColor = getUnderlineColor()

  return (
    <nav className={getNavbarClasses()}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className={`text-2xl sm:text-3xl font-bold hover:scale-105 transition-transform duration-300 font-display ${textColorClass}`}
          >
            ProServe
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm lg:text-base font-medium ${textColorMutedClass} ${textColorHoverClass} transition-colors duration-300 relative group`}
                style={{
                  animation: `fadeInDown 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 ${underlineColor} group-hover:w-full transition-all duration-300`}
                />
              </Link>
            ))}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <Link href="#apply">Apply Now</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className={`${textColorClass} hover:text-accent transition-colors p-2`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-foreground/20 bg-primary/95 dark:bg-primary/90 animate-fade-in-down">
            <div className="flex flex-col gap-3 px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium ${textColorMutedClass} ${textColorHoverClass} transition-colors py-2 px-3 rounded-md hover:bg-primary-foreground/10`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold mt-2"
              >
                <Link href="#apply" onClick={() => setIsMobileMenuOpen(false)}>
                  Apply Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
