import { X } from "lucide-react";
import TechBadge from "./TechBadge";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in"
      style={{ animationDuration: "0.2s" }}
      onClick={onClose}
    >
      <div
        className="card-gradient border border-border rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-gradient">{project.title}</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-mono text-primary mb-2">Problema</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.details.problem}</p>
          </div>

          <div>
            <h3 className="text-sm font-mono text-primary mb-2">Solução</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.details.solution}</p>
          </div>

          <div>
            <h3 className="text-sm font-mono text-primary mb-2">Ferramentas</h3>
            <div className="flex flex-wrap gap-2">
              {project.details.tools.map((tool) => (
                <TechBadge key={tool} name={tool} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-mono text-primary mb-2">Resultados</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.details.results}</p>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Ver no Power BI
          </a>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
