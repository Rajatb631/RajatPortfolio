import { projects } from "@/data/projects"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ExternalLink } from "lucide-react"

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold text-foreground">Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-colors"
            >
              {/* Project Image */}
              <div className="aspect-video bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-5xl font-mono text-primary/30">
                    {"</>"}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs bg-secondary text-muted-foreground"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                  asChild
                >
                  <a href={project.link}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Project
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
