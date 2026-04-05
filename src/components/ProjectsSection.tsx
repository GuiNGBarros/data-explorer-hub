import { useState } from "react";
import { BarChart3, Database } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects, type Project, type ProjectCategory } from "@/data/projects";

const categories: { key: ProjectCategory | "all"; label: string; icon: React.ReactNode }[] = [
  { key: "all", label: "Todos", icon: null },
  { key: "analise", label: "Análise de Dados", icon: <BarChart3 size={16} /> },
  { key: "engenharia", label: "Engenharia de Dados", icon: <Database size={16} /> },
];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projetos" className="py-24">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="text-primary font-mono text-sm mb-2">Portfólio</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Meus <span className="text-gradient">Projetos</span>
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.key
                  ? "bg-gradient-primary text-primary-foreground glow-shadow"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div key={activeCategory} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={setSelectedProject}
              index={i}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default ProjectsSection;
