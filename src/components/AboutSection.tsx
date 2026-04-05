import { BarChart3, Database, LineChart, Code2 } from "lucide-react";

const skills = [
  { icon: <BarChart3 size={24} />, title: "Análise de Dados", desc: "Exploração, limpeza e visualização de dados para insights acionáveis." },
  { icon: <Database size={24} />, title: "Engenharia de Dados", desc: "Pipelines ETL, Data Warehouses e arquiteturas de dados escaláveis." },
  { icon: <LineChart size={24} />, title: "Visualização", desc: "Dashboards interativos e storytelling com dados em Power BI e Python." },
  { icon: <Code2 size={24} />, title: "Programação", desc: "Python, SQL e ferramentas modernas para automação e análise." },
];

const technologies = [
  "Python", "SQL", "Power BI", "Azure", "Databricks", "Spark",
  "Airflow", "dbt", "Snowflake", "Docker", "Kafka", "Git",
  "Pandas", "Scikit-learn", "Tableau", "Excel",
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 bg-card/30">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="text-primary font-mono text-sm mb-2">Sobre</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Sobre <span className="text-gradient">Mim</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-muted-foreground leading-relaxed">
            Profissional apaixonado por dados com experiência em análise e engenharia de dados.
            Atuo transformando dados brutos em soluções que geram valor real para negócios,
            desde dashboards estratégicos até pipelines de dados escaláveis na nuvem.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skills.map((skill, i) => (
            <div
              key={skill.title}
              className="card-gradient rounded-xl border border-border p-6 text-center hover:border-primary/40 transition-all duration-300 hover:glow-shadow animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                {skill.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{skill.title}</h3>
              <p className="text-sm text-muted-foreground">{skill.desc}</p>
            </div>
          ))}
        </div>

        {/* Technologies */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-6">Tecnologias</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-mono hover:bg-primary/10 hover:text-primary transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
