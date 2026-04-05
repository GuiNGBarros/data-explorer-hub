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
  {
    id: "analise-churn",
    title: "Análise Preditiva de Churn",
    description: "Modelo de machine learning para prever a evasão de clientes com base em dados comportamentais.",
    category: "analise",
    technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    githubUrl: "https://github.com",
    details: {
      problem: "Alta taxa de cancelamento de clientes sem compreensão dos fatores determinantes.",
      solution: "Construção de pipeline de dados e modelo preditivo utilizando Random Forest e análise exploratória detalhada.",
      tools: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Jupyter Notebook"],
      results: "Identificação dos top 5 fatores de churn e redução de 18% na taxa de cancelamento após ações preventivas.",
    },
  },
  {
    id: "analise-rh",
    title: "People Analytics - Dashboard RH",
    description: "Análise de dados de recursos humanos para insights sobre turnover, satisfação e performance.",
    category: "analise",
    technologies: ["Power BI", "Excel", "SQL", "Python"],
    githubUrl: "https://github.com",
    details: {
      problem: "Área de RH sem visibilidade analítica sobre indicadores de pessoas e desempenho.",
      solution: "Criação de dashboard com métricas de turnover, absenteísmo, satisfação e performance por departamento.",
      tools: ["Power BI", "Excel", "SQL", "Python"],
      results: "Redução de 30% no turnover após identificação de departamentos críticos e implementação de ações direcionadas.",
    },
  },
  {
    id: "pipeline-etl",
    title: "Pipeline ETL na Nuvem",
    description: "Pipeline de dados automatizado na Azure para ingestão, transformação e carga de dados em Data Lake.",
    category: "engenharia",
    technologies: ["Azure Data Factory", "Databricks", "Python", "SQL"],
    githubUrl: "https://github.com",
    featured: true,
    details: {
      problem: "Processos manuais de extração e transformação de dados causando atrasos e inconsistências.",
      solution: "Implementação de pipeline ETL automatizado utilizando Azure Data Factory para orquestração e Databricks para processamento distribuído.",
      tools: ["Azure Data Factory", "Azure Databricks", "Python", "SQL", "Delta Lake"],
      results: "Automação de 15+ fontes de dados com redução de 80% no tempo de processamento.",
    },
  },
  {
    id: "data-warehouse",
    title: "Data Warehouse Moderno",
    description: "Arquitetura de Data Warehouse na nuvem com modelagem dimensional e camadas de dados.",
    category: "engenharia",
    technologies: ["Snowflake", "dbt", "Python", "Airflow"],
    githubUrl: "https://github.com",
    details: {
      problem: "Dados fragmentados em múltiplos sistemas sem uma fonte única de verdade.",
      solution: "Design e implementação de Data Warehouse com modelagem star schema, utilizando dbt para transformações e Airflow para orquestração.",
      tools: ["Snowflake", "dbt", "Python", "Apache Airflow", "Git"],
      results: "Consolidação de 8 fontes de dados em uma única plataforma analítica, reduzindo o tempo de consulta em 60%.",
    },
  },
  {
    id: "streaming-dados",
    title: "Ingestão de Dados em Tempo Real",
    description: "Sistema de streaming para processamento de eventos em tempo real com Kafka e Spark.",
    category: "engenharia",
    technologies: ["Apache Kafka", "Spark", "Python", "Docker"],
    githubUrl: "https://github.com",
    details: {
      problem: "Necessidade de processar milhões de eventos em tempo real para alimentar dashboards operacionais.",
      solution: "Implementação de arquitetura de streaming com Apache Kafka para ingestão e Spark Structured Streaming para processamento.",
      tools: ["Apache Kafka", "Apache Spark", "Python", "Docker", "Kubernetes"],
      results: "Processamento de 500k+ eventos/minuto com latência inferior a 2 segundos.",
    },
  },
];
