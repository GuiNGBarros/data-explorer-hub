import { useState } from "react";
import { ArrowLeft, X, FileCode2 } from "lucide-react";
import { Link } from "react-router-dom";
import extractCode from "@/codes/extract_data.py?raw";
import transformCode from "@/codes/transform_data.py?raw";
import loadCode from "@/codes/load_data.py?raw";
import dagCode from "@/codes/weather_dag.py?raw";
import airflow1 from "@/assets/airflow1.png";
import airflow2 from "@/assets/airflow2.png";

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
  const [zoomImg, setZoomImg] = useState<string | null>(null);

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
          <div className="text-muted-foreground leading-relaxed max-w-3xl space-y-6">
            <p>
              Este projeto implementa um pipeline ETL completo para coletar, transformar e armazenar
              dados climáticos da cidade de São Paulo, entregando uma solução automatizada, robusta
              e escalável de ponta a ponta.
            </p>

            <div>
              <h2 className="text-foreground font-semibold mb-2">Pipeline ETL</h2>
              <p className="mb-3">O pipeline foi estruturado em três etapas principais:</p>

              <h3 className="text-foreground font-medium mb-1">🔹 1. Extração (Extract)</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Consumo de dados da API OpenWeather (dados climáticos atuais de São Paulo)</li>
                <li>Armazenamento inicial em formato JSON</li>
                <li>Uso de variáveis de ambiente (.env) para segurança da API Key</li>
              </ul>

              <h3 className="text-foreground font-medium mb-1">🔹 2. Transformação (Transform)</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Conversão do JSON em DataFrame com pandas</li>
                <li>Normalização de dados aninhados (ex: coluna weather)</li>
                <li>Padronização de nomes de colunas</li>
                <li>Conversão de timestamps para datetime com timezone</li>
                <li>Separação de data e hora em colunas distintas</li>
                <li>Exportação intermediária em formato Parquet</li>
              </ul>

              <h3 className="text-foreground font-medium mb-1">🔹 3. Carga (Load)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Conexão com PostgreSQL via SQLAlchemy</li>
                <li>Inserção dos dados na tabela final (sp_weather)</li>
                <li>Validação simples após carga (contagem de registros)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-foreground font-semibold mb-2">Orquestração com Airflow</h2>
              <p className="mb-2">
                A orquestração foi implementada com uma DAG chamada{" "}
                <code className="font-mono text-primary">weather_pipeline</code>, contendo três tasks:
                <span className="font-mono text-foreground"> extract → transform → load</span>.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Agendamento diário via cron (0 11 * * *)</li>
                <li>Reprocessamento automático em caso de falha (retries)</li>
                <li>Execução desacoplada entre etapas</li>
                <li>Uso de decorators (@dag, @task) para definição moderna</li>
              </ul>
            </div>

            <div>
              <h2 className="text-foreground font-semibold mb-2">Ambiente e Infraestrutura</h2>
              <p className="mb-2">
                O ambiente foi configurado utilizando WSL (Windows Subsystem for Linux) para
                garantir compatibilidade com ferramentas de engenharia de dados em ambiente Linux.
                O Airflow e o banco de dados rodam em containers Docker, permitindo:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Isolamento do ambiente</li>
                <li>Facilidade de deploy em outras máquinas</li>
              </ul>
            </div>

            <div>
              <h2 className="text-foreground font-semibold mb-2">Boas Práticas Aplicadas</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Uso de .env para variáveis sensíveis</li>
                <li>Estrutura modular (extract, transform, load)</li>
                <li>Reprodutibilidade do ambiente via Docker</li>
                <li>Logging em todas as etapas do pipeline</li>
              </ul>
            </div>

            <div>
              <h2 className="text-foreground font-semibold mb-2">Resultado</h2>
              <p className="mb-2">
                O projeto entrega um pipeline automatizado, robusto e escalável, capaz de:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Coletar dados externos</li>
                <li>Processar e estruturar informações</li>
                <li>Persistir dados em banco relacional</li>
                <li>Executar de forma agendada</li>
              </ul>
            </div>
          </div>
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

        <section className="mt-12">
          <h2 className="text-sm font-mono text-primary mb-4">Execução no Airflow</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            <img
              src={airflow1}
              alt="DAG weather_pipeline no Airflow com agendamento e tasks extract, transform e load"
              loading="lazy"
              onClick={() => setZoomImg(airflow1)}
              className="w-full rounded-xl border border-border cursor-zoom-in hover:border-primary/40 transition-colors"
            />
            <img
              src={airflow2}
              alt="Execução bem-sucedida das tasks extract, transform e load no Airflow"
              loading="lazy"
              onClick={() => setZoomImg(airflow2)}
              className="w-full rounded-xl border border-border cursor-zoom-in hover:border-primary/40 transition-colors"
            />
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