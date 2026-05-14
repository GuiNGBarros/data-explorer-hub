import { useState } from "react";
import { ArrowLeft, X, FileCode2 } from "lucide-react";
import { Link } from "react-router-dom";
import appCode from "@/pipeline_ML/app.py?raw";
import trainCode from "@/pipeline_ML/train_model.py?raw";
import geracaoCode from "@/pipeline_ML/geracao_de_dados_aleatorios.py?raw";
import dockerfileCode from "@/pipeline_ML/Dockerfile?raw";
import requirementsCode from "@/pipeline_ML/requirements.txt?raw";

interface ModuleEntry {
  key: string;
  label: string;
  filename: string;
  code: string;
}

const modules: ModuleEntry[] = [
  { key: "geracao", label: "Geração de dados", filename: "geracao_de_dados_aleatorios.py", code: geracaoCode },
  { key: "train", label: "Treinamento do modelo", filename: "train_model.py", code: trainCode },
  { key: "app", label: "Interface Streamlit", filename: "app.py", code: appCode },
  { key: "dockerfile", label: "Dockerfile", filename: "Dockerfile", code: dockerfileCode },
  { key: "requirements", label: "Dependências", filename: "requirements.txt", code: requirementsCode },
];

const PipelineMLCredito = () => {
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
            Pipeline de Machine Learning – Risco de Crédito (Streamlit + Docker)
          </h1>
          <div className="text-muted-foreground leading-relaxed max-w-3xl space-y-6">
            <p>
              Este projeto implementa um pipeline completo de machine learning para classificação de
              risco de crédito, abrangendo desde a geração sintética dos dados até o deploy de uma
              interface web interativa em Streamlit, totalmente containerizada com Docker.
            </p>

            <div>
              <h2 className="text-foreground font-semibold mb-2">Pipeline de ML</h2>
              <p className="mb-3">O fluxo foi estruturado em etapas modulares:</p>

              <h3 className="text-foreground font-medium mb-1">🔹 1. Geração de dados sintéticos</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Criação de um dataset com 1.000 registros simulando perfis de clientes</li>
                <li>Features: renda mensal, score de crédito, estado civil, tempo de emprego, patrimônio e dívidas</li>
                <li>Geração da variável alvo <span className="font-mono text-foreground">risco</span> a partir de regras heurísticas combinadas com ruído aleatório, evitando padrões triviais</li>
                <li>Exportação para <span className="font-mono text-foreground">data.csv</span></li>
              </ul>

              <h3 className="text-foreground font-medium mb-1">🔹 2. Treinamento do modelo</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Pré-processamento com encoding manual da variável categórica <span className="font-mono text-foreground">estado_civil</span></li>
                <li>Split treino/teste (80/20) com <span className="font-mono text-foreground">random_state</span> fixo para reprodutibilidade</li>
                <li>Treinamento de um <span className="font-mono text-foreground">RandomForestClassifier</span> com 100 árvores</li>
                <li>Avaliação por acurácia no conjunto de teste</li>
                <li>Persistência do modelo (<span className="font-mono text-foreground">modelo.pkl</span>) e do mapeamento de encoding (<span className="font-mono text-foreground">mapa_estado_civil.pkl</span>) com joblib</li>
              </ul>

              <h3 className="text-foreground font-medium mb-1">🔹 3. Interface web com Streamlit</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Aplicação interativa em <span className="font-mono text-foreground">app.py</span> com layout em duas colunas</li>
                <li>Inputs amigáveis para renda, score, estado civil, tempo de emprego, patrimônio e dívidas</li>
                <li>Carregamento do modelo e do mapa de encoding salvos no treinamento</li>
                <li>Predição da classe (Bom Pagador / Alto Risco) e exibição das probabilidades</li>
                <li>Painel de transparência mostrando o vetor enviado ao modelo</li>
              </ul>

              <h3 className="text-foreground font-medium mb-1">🔹 4. Containerização com Docker</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Imagem base <span className="font-mono text-foreground">python:3.12-slim</span></li>
                <li>Instalação das dependências via <span className="font-mono text-foreground">requirements.txt</span></li>
                <li>Treinamento executado durante o build (<span className="font-mono text-foreground">train_model.py</span>), garantindo que o container já suba com o modelo pronto</li>
                <li>Exposição da porta 8501 e execução automática do Streamlit</li>
              </ul>
            </div>

            <div>
              <h2 className="text-foreground font-semibold mb-2">Boas Práticas Aplicadas</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Separação clara entre geração de dados, treinamento e aplicação</li>
                <li>Persistência conjunta do modelo e do encoder, evitando inconsistências em produção</li>
                <li>Reprodutibilidade garantida por <span className="font-mono text-foreground">random_state</span> e versionamento de dependências</li>
                <li>Deploy reprodutível via Docker, pronto para rodar em qualquer ambiente</li>
              </ul>
            </div>

            <div>
              <h2 className="text-foreground font-semibold mb-2">Resultado</h2>
              <p>
                Uma aplicação web funcional, portátil e empacotada em container, capaz de classificar
                novos clientes em tempo real entre Bom Pagador e Alto Risco de Inadimplência, com
                exibição das probabilidades associadas à decisão.
              </p>
            </div>
          </div>
        </header>

        <section>
          <h2 className="text-sm font-mono text-primary mb-4">Arquivos do projeto</h2>
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
          <h2 className="text-sm font-mono text-primary mb-6">Arquitetura do pipeline</h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <svg viewBox="0 0 900 260" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              {/* Defs for arrow marker */}
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="hsl(var(--primary))" />
                </marker>
              </defs>

              {/* Boxes */}
              {/* 1. Geração de dados */}
              <rect x="20" y="40" width="160" height="120" rx="12" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
              <text x="100" y="72" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="13" fontWeight="600">Geração de Dados</text>
              <text x="100" y="98" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">Python</text>
              <text x="100" y="116" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">Pandas / NumPy</text>
              <text x="100" y="134" textAnchor="middle" fill="hsl(var(--primary))" fontSize="10" fontFamily="monospace">data.csv</text>

              {/* Arrow 1 */}
              <line x1="180" y1="100" x2="230" y2="100" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* 2. Treinamento */}
              <rect x="240" y="40" width="160" height="120" rx="12" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
              <text x="320" y="72" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="13" fontWeight="600">Treinamento</text>
              <text x="320" y="98" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">Scikit-learn</text>
              <text x="320" y="116" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">Random Forest</text>
              <text x="320" y="134" textAnchor="middle" fill="hsl(var(--primary))" fontSize="10" fontFamily="monospace">modelo.pkl</text>

              {/* Arrow 2 */}
              <line x1="400" y1="100" x2="450" y2="100" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* 3. Modelo salvo */}
              <rect x="460" y="40" width="120" height="120" rx="12" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
              <text x="520" y="72" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="13" fontWeight="600">Modelo</text>
              <text x="520" y="98" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">Joblib</text>
              <text x="520" y="116" textAnchor="middle" fill="hsl(var(--primary))" fontSize="10" fontFamily="monospace">.pkl</text>
              <text x="520" y="134" textAnchor="middle" fill="hsl(var(--primary))" fontSize="10" fontFamily="monospace">.pkl map</text>

              {/* Arrow 3 */}
              <line x1="580" y1="100" x2="630" y2="100" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* 4. Streamlit App */}
              <rect x="640" y="40" width="120" height="120" rx="12" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
              <text x="700" y="72" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="13" fontWeight="600">Streamlit</text>
              <text x="700" y="98" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">Interface</text>
              <text x="700" y="116" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">Predição</text>
              <text x="700" y="134" textAnchor="middle" fill="hsl(var(--primary))" fontSize="10" fontFamily="monospace">app.py</text>

              {/* Arrow 4 */}
              <line x1="700" y1="160" x2="700" y2="190" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* 5. Docker */}
              <rect x="620" y="200" width="160" height="50" rx="12" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
              <text x="700" y="230" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="13" fontWeight="600">Docker</text>

              {/* Vertical connector for docker */}
              <line x1="700" y1="160" x2="700" y2="200" stroke="hsl(var(--primary))" strokeWidth="2" />

              {/* Labels under boxes */}
              <text x="100" y="185" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10">1.000 registros</text>
              <text x="320" y="185" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10">80/20 split</text>
              <text x="520" y="185" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10">Persistência</text>
              <text x="700" y="185" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10">Web app</text>
            </svg>
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

export default PipelineMLCredito;