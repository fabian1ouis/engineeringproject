import { CheckCircle2 } from "lucide-react"

export function AboutSection() {
  const values = [
    "15+ years of engineering expertise",
    "ISO certified quality standards",
    "Proven track record in Kenya",
    "Dedicated technical team",
  ]

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Kenya's Leading Engineering Solutions Provider
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                With over 15 years of experience, we've successfully completed hundreds of engineering projects across
                Kenya, from residential developments to large-scale industrial infrastructure.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our mission is to drive Kenya's development through innovative engineering solutions that are
                sustainable, cost-effective, and built to last. We combine international best practices with local
                expertise.
              </p>
              <div className="space-y-3">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="text-accent flex-shrink-0" size={24} />
                    <span className="text-foreground font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="/professional-business-team-meeting.png"
                  alt="Engineering team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
