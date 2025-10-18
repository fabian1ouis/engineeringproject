"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Zap, Wrench, Hammer, Lightbulb, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function ServicesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const { ref: containerRef, isVisible } = useScrollAnimation()

  const services = [
    {
      icon: Building2,
      title: "Structural Engineering",
      description:
        "Design and analysis of buildings, bridges, and infrastructure projects with cutting-edge CAD technology.",
    },
    {
      icon: Zap,
      title: "Electrical Systems",
      description:
        "Power distribution, renewable energy solutions, and electrical infrastructure for industrial and commercial facilities.",
    },
    {
      icon: Wrench,
      title: "Mechanical Engineering",
      description:
        "HVAC systems, machinery design, and mechanical solutions for manufacturing and industrial operations.",
    },
    {
      icon: Hammer,
      title: "Construction Management",
      description: "Project oversight, quality assurance, and on-site supervision for seamless project execution.",
    },
    {
      icon: Lightbulb,
      title: "Consulting & Design",
      description:
        "Expert consultation on feasibility studies, technical specifications, and innovative engineering solutions.",
    },
    {
      icon: TrendingUp,
      title: "Project Development",
      description: "End-to-end project management from concept through completion with proven track record.",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleCards((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 },
    )

    const cards = sectionRef.current?.querySelectorAll("[data-index]")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="services"
      className="relative py-24 bg-secondary/30"
      style={{
        backgroundImage: "url('/services-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/85 to-background/90" />

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 text-balance transition-all duration-700 ${
              isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-12"
            }`}
          >
            Comprehensive Engineering Services
          </h2>
          <p
            className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 ${
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            From structural design to project completion, we deliver world-class engineering solutions tailored to
            Kenya's unique infrastructure needs
          </p>
        </div>

        <div ref={sectionRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            const isVisible = visibleCards.includes(index)
            const slideDirection = index % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"
            return (
              <div
                key={index}
                data-index={index}
                className={`transition-all duration-700 ${
                  isVisible
                    ? slideDirection
                    : index % 2 === 0
                      ? "opacity-0 -translate-x-12"
                      : "opacity-0 translate-x-12"
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <Card className="group hover:shadow-xl transition-smooth hover:-translate-y-2 h-full">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-smooth group-hover:scale-110">
                      <Icon size={28} />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed mb-4">{service.description}</CardDescription>
                    <Button
                      variant="link"
                      className="p-0 h-auto font-semibold hover:translate-x-1 transition-transform"
                      asChild
                    >
                      <Link href="#apply">Learn More →</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        <div
          className={`text-center mt-12 transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.8s" }}
        >
          <Button asChild size="lg" className="text-lg px-8 hover:scale-105 transition-transform duration-300">
            <Link href="#apply">Request a Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
