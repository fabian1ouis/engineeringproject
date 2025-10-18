"use client"

import { useEffect, useState } from "react"

export type SectionColor = "primary" | "secondary" | "accent" | "muted"

interface SectionConfig {
  id: string
  color: SectionColor
  isDark: boolean
}

const sections: SectionConfig[] = [
  { id: "home", color: "primary", isDark: true },
  { id: "about", color: "secondary", isDark: false },
  { id: "services", color: "secondary", isDark: false },
  { id: "apply", color: "accent", isDark: false },
  { id: "testimonials", color: "primary", isDark: true },
  { id: "faq", color: "muted", isDark: false },
  { id: "contact", color: "primary", isDark: true },
]

export function useActiveSection() {
  const [activeColor, setActiveColor] = useState<SectionColor>("primary")
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setIsDarkTheme(isDark)

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark")
      setIsDarkTheme(isDark)
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveColor(section.color)
            setIsDarkBackground(section.isDark)
            return
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return { activeColor, isDarkBackground, isDarkTheme }
}
