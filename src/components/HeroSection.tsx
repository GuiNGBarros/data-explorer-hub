import { ChevronDown, BarChart3, Database } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative section-container text-center py-32">
        <div className="animate-fade-in">
          <p className="text-primary font-mono text-sm tracking-wider mb-4">
            Olá, seja bem vindo(a). Eu sou
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
            <span className="text-gradient">Guilherme Barros</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-light mb-8 max-w-2xl mx-auto">
            Analista de Dados & Engenheiro de Dados
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
            Transformando dados brutos em insights estratégicos e construindo pipelines robustos para impulsionar decisões de negócio.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <a
            href="#projetos"
            data-category="analise"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-primary font-semibold text-primary-foreground hover:opacity-90 transition-all duration-200 hover:scale-105 glow-shadow"
          >
            <BarChart3 size={20} />
            Projetos de Análise
          </a>
          <a
            href="#projetos"
            data-category="engenharia"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg border border-primary/30 text-foreground font-semibold hover:bg-primary/10 transition-all duration-200 hover:scale-105"
          >
            <Database size={20} />
            Projetos de Engenharia
          </a>
        </div>

        <a
          href="#projetos"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-float"
        >
          <ChevronDown size={28} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
