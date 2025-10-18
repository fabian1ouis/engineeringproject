"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useState, useEffect } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref, isVisible } = useScrollAnimation()

  const testimonials = [
    {
      name: "James Kipchoge",
      role: "Project Manager, Nairobi Construction Ltd",
      content:
        "Their structural engineering expertise was instrumental in completing our 50-story commercial complex on time and within budget. Highly professional team.",
      rating: 5,
      image: "/testimonial-james.jpg",
    },
    {
      name: "Amara Okonkwo",
      role: "Director, East Africa Infrastructure",
      content:
        "Outstanding electrical systems design for our industrial facility. They understood our needs perfectly and delivered solutions that exceeded expectations.",
      rating: 5,
      image: "/testimonial-amara.jpg",
    },
    {
      name: "David Mwangi",
      role: "CEO, Mombasa Port Development",
      content:
        "Exceptional project management and technical expertise. Their team's dedication to quality and safety standards set them apart from other firms.",
      rating: 5,
      image: "/testimonial-david.jpg",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section id="testimonials" className="py-24 bg-primary text-primary-foreground" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 text-balance transition-all duration-700 ${
              isVisible ? "animate-scale-in" : "opacity-0 scale-95"
            }`}
          >
            Trusted by Kenya's Top Companies
          </h2>
          <p
            className={`text-lg text-primary-foreground/90 leading-relaxed transition-all duration-700 ${
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            Leading organizations across Kenya rely on our engineering expertise to deliver their most critical projects
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className={`transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: "0.3s" }}
          >
            <Card className="bg-card text-card-foreground">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={testimonials[activeIndex].image || "/placeholder.svg"}
                    alt={testimonials[activeIndex].name}
                    className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-primary"
                  />
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="fill-accent text-accent" size={20} />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed text-pretty">
                    "{testimonials[activeIndex].content}"
                  </p>
                  <div>
                    <p className="font-bold text-lg">{testimonials[activeIndex].name}</p>
                    <p className="text-muted-foreground">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? "bg-primary-foreground w-8" : "bg-primary-foreground/40"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
