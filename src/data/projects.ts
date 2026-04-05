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
    id: "dashboard-hospitalar",
    title: "Dashboard de Gestão Hospitalar Interativo",
    description: "Dashboard completo para gestão de estoque, compras e faturamento; audioria e exames.",
    category: "analise",
    technologies: ["Power BI", "SQL", "Python", "Pandas"],
    githubUrl: "https://app.powerbi.com/view?r=eyJrIjoiZTRiMTEyMjMtZWNjNC00MDM1LWJlNzgtMGVjNWI4NGJiN2UyIiwidCI6IjZhOTg3ZjAxLWEzNjAtNDY1OC04OTBhLTFkM2VkNmVkOWJlNyJ9",
    featured: true,
    details: {
      problem: "A empresa não possuía visibilidade sobre métricas de negócios, dificultando a tomada de decisão estratégica.",
      solution: "Desenvolvimento de um dashboard interativo em Power BI com conexão direta ao banco de dados SQL, utilizando Python para ETL e Pandas para transformação de dados.",
      tools: ["Power BI", "SQL Server", "Python", "Pandas", "DAX"],
      results: "Redução de 62% em perdas por estoque parado e saving de 74%.",
    },
  },
];
