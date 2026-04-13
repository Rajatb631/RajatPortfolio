import { profile } from "@/data/profile"
import { Download } from "lucide-react"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-primary font-mono text-sm uppercase tracking-widest">
              {profile.role}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              {profile.name}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg text-pretty">
              {profile.tagline}
            </p>
            <div className="pt-2">
              <a 
                href={profile.contact.resume} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 py-3 rounded-md transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </div>

          {/* Developer Illustration */}
          <div className="relative flex justify-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Decorative Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-primary/20" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 sm:w-64 sm:h-64 bg-secondary/50 rounded-2xl transform rotate-6" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-44 h-44 sm:w-56 sm:h-56 bg-card rounded-2xl border border-border flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-mono text-primary">{"</>"}</div>
                    <p className="text-xs text-muted-foreground">
                      Building the future
                    </p>
                  </div>
                </div>
              </div>
              {/* Floating Tech Tags */}
              <div className="absolute top-0 right-0 bg-card px-3 py-1 rounded-full border border-border text-xs text-primary">
                React
              </div>
              <div className="absolute bottom-8 left-0 bg-card px-3 py-1 rounded-full border border-border text-xs text-primary">
                AI/ML
              </div>
              <div className="absolute top-1/2 right-0 bg-card px-3 py-1 rounded-full border border-border text-xs text-primary">
                FastAPI
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
