export type ProjectCategory = "analise" | "engenharia";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  githubUrl: string;
  featured?: boolean;
  details: {
    problem: string;
    solution: string;
    tools: string[];
    results: string;
  };
}

export const projects: Project[] = [
  {
    id: "dashboard-vendas",
    title: "Dashboard de Vendas Interativo",
    description: "Dashboard completo para análise de vendas com KPIs, tendências e segmentação de clientes em tempo real.",
    category: "analise",
    technologies: ["Python", "Power BI", "SQL", "Pandas"],
    githubUrl: "https://github.com",
    featured: true,
    details: {
      problem: "A empresa não possuía visibilidade sobre métricas de vendas, dificultando a tomada de decisão estratégica.",
      solution: "Desenvolvimento de um dashboard interativo em Power BI com conexão direta ao banco de dados SQL, utilizando Python para ETL e Pandas para transformação de dados.",
      tools: ["Python", "Power BI", "SQL Server", "Pandas", "DAX"],
      results: "Redução de 40% no tempo de geração de relatórios e aumento de 25% na assertividade das decisões comerciais.",
    },
  },
];
