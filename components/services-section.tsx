import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Zap, Wrench, Hammer, Lightbulb, TrendingUp } from "lucide-react"
import Link from "next/link"

export function ServicesSection() {
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

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Comprehensive Engineering Services</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From structural design to project completion, we deliver world-class engineering solutions tailored to
            Kenya's unique infrastructure needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon size={28} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">{service.description}</CardDescription>
                  <Button variant="link" className="p-0 h-auto font-semibold" asChild>
                    <Link href="#apply">Learn More →</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="#apply">Request a Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
