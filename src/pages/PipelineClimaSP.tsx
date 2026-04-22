import { useState } from "react";
import { ArrowLeft, X, FileCode2 } from "lucide-react";
import { Link } from "react-router-dom";
import extractCode from "@/codes/extract_data.py?raw";
import transformCode from "@/codes/transform_data.py?raw";
import loadCode from "@/codes/load_data.py?raw";
import dagCode from "@/codes/weather_dag.py?raw";

interface ModuleEntry {
  key: string;
  label: string;
  filename: string;
  code: string;
}

const modules: ModuleEntry[] = [
  { key: "extract", label: "Módulo de extração", filename: "extract_data.py", code: extractCode },
  { key: "transform", label: "Módulo de transformação", filename: "transform_data.py", code: transformCode },
  { key: "load", label: "Módulo de carga", filename: "load_data.py", code: loadCode },
  { key: "dag", label: "DAG", filename: "weather_dag.py", code: dagCode },
];

const PipelineClimaSP = () => {
  const [active, setActive] = useState<ModuleEntry | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="section-container py-16">
        <Link
          to="/#projetos"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Voltar para Projetos
        </Link>

        <header className="mb-10">
          <p className="text-primary font-mono text-sm mb-2">Engenharia de Dados</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-4">
            Pipeline de Dados – Clima de São Paulo (ETL com Airflow + Docker)
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            Este projeto implementa um pipeline ETL completo para coletar, transformar e armazenar
            dados climáticos da cidade de São Paulo. Os dados são extraídos da API do OpenWeather,
            normalizados com Pandas e carregados em um banco PostgreSQL. A orquestração é feita pelo
            Apache Airflow, com toda a infraestrutura containerizada via Docker, garantindo execução
            diária automatizada, com retries e logs estruturados.
          </p>
        </header>

        <section>
          <h2 className="text-sm font-mono text-primary mb-4">Módulos do projeto</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            {modules.map((m) => (
              <button
                key={m.key}
                onClick={() => setActive(m)}
                className="card-gradient border border-border rounded-xl p-5 text-left hover:border-primary/40 hover:glow-shadow transition-all flex items-center gap-3"
              >
                <FileCode2 size={20} className="text-primary shrink-0" />
                <div>
                  <div className="font-semibold text-foreground">{m.label}</div>
                  <div className="text-xs font-mono text-muted-foreground">{m.filename}</div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in"
          style={{ animationDuration: "0.2s" }}
          onClick={() => setActive(null)}
        >
          <div
            className="card-gradient border border-border rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-bold text-gradient">{active.label}</h2>
                <p className="text-xs font-mono text-muted-foreground mt-1">{active.filename}</p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>
            <pre className="overflow-auto p-6 text-xs leading-relaxed text-foreground/90 font-mono">
              <code>{active.code}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelineClimaSP;