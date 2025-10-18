import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer a comprehensive range of professional services including business consulting, financial planning, HR solutions, risk management, digital transformation, and market expansion strategies. Each service is tailored to meet your specific business needs.",
    },
    {
      question: "How long does the application process take?",
      answer:
        "Our application process is designed to be quick and efficient. After submitting your application, our team will review it within 24-48 hours and reach out to schedule an initial consultation to discuss your needs in detail.",
    },
    {
      question: "What industries do you work with?",
      answer:
        "We work with businesses across various industries including technology, healthcare, finance, retail, manufacturing, and professional services. Our diverse experience allows us to bring best practices from multiple sectors to your business.",
    },
    {
      question: "Do you offer customized solutions?",
      answer:
        "We understand that every business is unique. All our services are fully customizable to align with your specific goals, challenges, and industry requirements. We work closely with you to develop tailored strategies.",
    },
    {
      question: "What is your pricing structure?",
      answer:
        "Our pricing is project-based and depends on the scope and complexity of services required. We offer flexible packages and payment plans. Contact us for a detailed quote based on your specific needs.",
    },
    {
      question: "How do you measure success?",
      answer:
        "We establish clear KPIs and metrics at the start of every engagement. Success is measured through tangible outcomes such as revenue growth, cost reduction, efficiency improvements, and achievement of your strategic objectives.",
    },
  ]

  return (
    <section id="faq" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Find answers to common questions about our services and process
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
