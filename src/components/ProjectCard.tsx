import { ExternalLink, Star } from "lucide-react";
import TechBadge from "./TechBadge";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  index: number;
}

const ProjectCard = ({ project, onViewDetails, index }: ProjectCardProps) => {
  return (
    <div
      className="group card-gradient rounded-xl border border-border p-6 hover:border-primary/40 transition-all duration-300 hover:glow-shadow animate-fade-in flex flex-col"
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
    >
      {project.featured && (
        <div className="flex items-center gap-1.5 mb-3">
          <Star size={14} className="text-primary fill-primary" />
          <span className="text-xs font-mono text-primary">Destaque</span>
        </div>
      )}

      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-gradient transition-all">
        {project.title}
      </h3>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {project.technologies.map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onViewDetails(project)}
          className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Ver mais
        </button>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
        >
          <ExternalLink size={14} />
          Power BI
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
