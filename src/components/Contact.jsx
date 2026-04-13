import { profile } from "@/data/profile"
import { Mail, Github, Linkedin, Phone, FileText } from "lucide-react"

const contactLinks = [
  {
    icon: Phone,
    label: profile.contact.phone,
    href: `tel:${profile.contact.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: profile.contact.email,
    href: `mailto:${profile.contact.email}`,
  },
  {
    icon: Github,
    label: "github.com/Rajatb631",
    href: profile.contact.github,
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/rajat-bansal",
    href: profile.contact.linkedin,
  },
  {
    icon: FileText,
    label: "Download Resume",
    href: profile.contact.resume,
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold text-foreground">Contact</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Feel free to reach out to me for any inquiries, collaborations, or
              just to say hello. I&apos;m always open to discussing new projects
              and opportunities.
            </p>

            <div className="space-y-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                    <link.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Send a Message
            </h3>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-muted-foreground mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-muted-foreground mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-muted-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
