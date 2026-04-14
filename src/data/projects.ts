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
    technologies: ["Power BI", "SQL", "Python", "Pandas/Spark"],
    githubUrl: "https://app.powerbi.com/view?r=eyJrIjoiODI2MWFiNWItYWM5NC00MDhkLTg2Y2YtZTIxMGUwZDAxZTA1IiwidCI6IjdlOTNlMjg2LWIyOWEtNDQ1NC1hNDFhLWU4NDE5ZWM5ZGViNSJ9",
    featured: true,
    details: {
      problem: "A empresa não possuía visibilidade sobre métricas de negócios, dificultando a tomada de decisão estratégica.",
      solution: "Desenvolvimento de um dashboard interativo em Power BI com conexão a um Data Warehouse (DW), utilizando Python/Pandas para coleta, automação, transformação de dados e ingestão no DW.",
      tools: ["Power BI", "SQL Server", "Python", "Pandas/Spark", "DAX"],
      results: "Redução de 62% em perdas por estoque parado e saving de 74%.",
    },
  },
  {
    id: "painel-ia-assistencial",
    title: "Painel de Monitoramento de IA Assistencial",
    description: "Painel interativo para monitoramento e análise de indicadores de IA aplicada à assistência em saúde.",
    category: "analise",
    technologies: ["Power BI", "SQL", "Python", "Pandas/Spark"],
    githubUrl: "https://app.powerbi.com/view?r=eyJrIjoiYmRkNWQzZDctZWRlYi00ZTQwLWE0MjctYTFjMDlhNjdmMDg4IiwidCI6IjdlOTNlMjg2LWIyOWEtNDQ1NC1hNDFhLWU4NDE5ZWM5ZGViNSJ9",
    featured: false,
    details: {
      problem: "Falta de visibilidade sobre o desempenho e impacto dos modelos de IA assistencial na operação hospitalar.",
      solution: "Criação de um painel em Power BI integrado a fontes de dados de IA, permitindo acompanhamento em tempo real de métricas de acurácia, utilização e impacto clínico.",
      tools: ["Power BI", "SQL Server", "Python", "Pandas/Spark", "DAX"],
      results: "Maior transparência nos resultados da IA assistencial, facilitando ajustes e decisões baseadas em dados.",
    },
  },
  {
    id: "entregas-no-prazo",
    title: "Entregas no Prazo - KPIs de Logística",
    description: "Projeto de estudo: dashboard interativo para acompanhamento de KPIs logísticos, com foco em taxa de entregas no prazo.",
    category: "analise",
    technologies: ["Power BI", "SQL", "DAX"],
    githubUrl: "https://app.powerbi.com/view?r=eyJrIjoiNGZkNDIxMzItNzdmNS00YTU0LTg1ZTYtMWM0ZTMxYjFjZTdiIiwidCI6IjdlOTNlMjg2LWIyOWEtNDQ1NC1hNDFhLWU4NDE5ZWM5ZGViNSJ9",
    featured: false,
    details: {
      problem: "Necessidade de praticar a construção de dashboards voltados à área de logística, analisando indicadores de desempenho de entregas.",
      solution: "Desenvolvimento de um painel em Power BI com KPIs de logística como taxa de entrega no prazo, atrasos e desempenho por região e por equipes.",
      tools: ["Power BI", "DAX", "SQL"],
      results: "Projeto de estudo que reforçou habilidades em modelagem de dados e criação de visualizações voltadas à logística.",
    },
  },
];
