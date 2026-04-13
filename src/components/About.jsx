import { profile } from "@/data/profile"
import { Mail, Github, Linkedin } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Profile Card */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-4 border-primary/30 overflow-hidden bg-secondary shadow-xl">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full border-4 border-background" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-foreground">
              {profile.name}
            </h3>
            <div className="flex items-center gap-4 mt-4">
              <a
                href={`mailto:${profile.contact.email}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* About Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold text-foreground">About</h2>
            </div>
            <h3 className="text-xl text-foreground/90 font-medium">
              Know a little about me
            </h3>
            <div className="space-y-4">
              {profile.about.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-muted-foreground leading-relaxed text-pretty"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
