"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, AlertCircle, Loader2 } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { toast } from "sonner"

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      toast.success("Thank you for your message! We will get back to you soon.")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      toast.error("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 text-balance transition-all duration-700 ${
              isVisible ? "animate-scale-in" : "opacity-0 scale-95"
            }`}
          >
            Get in Touch
          </h2>
          <p
            className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 ${
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            Have a project in mind? Contact us today to discuss your engineering needs and get a consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-12"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
                    <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={18} />
                    <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Name</Label>
                      <Input
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">Subject</Label>
                    <Input
                      id="contact-subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {[0, 1, 2].map((cardIndex) => (
              <div
                key={cardIndex}
                className={`transition-all duration-700 ${
                  isVisible ? "animate-slide-in-right" : "opacity-0 translate-x-12"
                }`}
                style={{ transitionDelay: `${0.3 + cardIndex * 0.1}s` }}
              >
                {cardIndex === 0 && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Mail className="text-primary mt-1 flex-shrink-0" size={20} />
                          <div>
                            <p className="font-semibold mb-1">Email</p>
                            <a
                              href="mailto:info@engineeringke.com"
                              className="text-muted-foreground hover:text-primary"
                            >
                              info@engineeringke.com
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="text-primary mt-1 flex-shrink-0" size={20} />
                          <div>
                            <p className="font-semibold mb-1">Phone</p>
                            <a href="tel:+254712345678" className="text-muted-foreground hover:text-primary">
                              +254 (712) 345-678
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
                          <div>
                            <p className="font-semibold mb-1">Address</p>
                            <p className="text-muted-foreground">
                              Nairobi Business Park
                              <br />
                              Upper Hill
                              <br />
                              Nairobi, Kenya
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {cardIndex === 1 && (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="font-semibold mb-4">Follow Us</p>
                      <div className="flex gap-3">
                        <a
                          href="#"
                          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                          aria-label="LinkedIn"
                        >
                          <Linkedin size={20} />
                        </a>
                        <a
                          href="#"
                          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                          aria-label="Twitter"
                        >
                          <Twitter size={20} />
                        </a>
                        <a
                          href="#"
                          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                          aria-label="Facebook"
                        >
                          <Facebook size={20} />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {cardIndex === 2 && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8246519598093!2d36.7624!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1d3d3d3d3d3d%3A0x0!2sNairobi%20Business%20Park!5e0!3m2!1sen!2ske!4v1234567890"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Office Location in Nairobi"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
