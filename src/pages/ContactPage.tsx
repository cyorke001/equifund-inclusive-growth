import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, MessageSquare, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "@/components/SectionHeading";
import lenderImg from "@/assets/lender-meeting.jpg";

const faqs = [
  { q: "Is EquiFund free for entrepreneurs?", a: "Yes! Entrepreneurs can create an account, complete onboarding, and access their readiness insights at no cost." },
  { q: "How do financial institutions get access?", a: "Institutions must provide a valid institution token or invitation code during registration. Contact us to request access." },
  { q: "What languages does EquiFund support?", a: "English, French, Amharic, Somali, Arabic, and Spanish — with more coming soon." },
  { q: "Is my data secure?", a: "Absolutely. EquiFund uses enterprise-grade encryption and never shares your data without your consent." },
  { q: "How is the Funding Readiness Score calculated?", a: "It considers multiple factors including business stage, market demand, financial health, documentation completeness, and founder readiness." },
];

const ContactPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to backend
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main id="main-content">
      <section className="bg-hero py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold font-heading text-primary-foreground md:text-5xl">Contact Us</h1>
            <p className="mt-5 text-lg text-primary-foreground/80">We're here to help. Reach out with questions, feedback, or partnership inquiries.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionHeading badge="Get in Touch" title="Send Us a Message" align="left" />
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">Name</label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required maxLength={100} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required maxLength={255} placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground">Subject</label>
                  <Input id="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required maxLength={200} placeholder="How can we help?" />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
                  <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required maxLength={1000} rows={5} placeholder="Tell us more..." />
                </div>
                <Button type="submit" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                  <Send className="h-4 w-4" /> Send Message
                </Button>
              </form>

              <div className="mt-8 flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email us directly</p>
                  <a href="mailto:support@equifund.ca" className="text-sm text-primary hover:underline">support@equifund.ca</a>
                </div>
              </div>
            </motion.div>

            <div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <img src={lenderImg} alt="Supportive meeting between a financial professional and entrepreneur" className="mb-8 rounded-2xl shadow-elevated w-full object-cover max-h-[280px]" />
              </motion.div>

              <SectionHeading badge="FAQs" title="Frequently Asked Questions" align="left" />
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border border-border bg-card shadow-soft overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between p-4 text-left"
                      aria-expanded={openFaq === i}
                    >
                      <span className="text-sm font-medium text-foreground pr-4">{faq.q}</span>
                      <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <div className="border-t border-border px-4 pb-4 pt-3">
                        <p className="text-sm text-muted-foreground">{faq.a}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
