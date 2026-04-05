import { Linkedin, Github, Mail, MessageCircle } from "lucide-react";

const links = [
  { icon: <Linkedin size={22} />, label: "LinkedIn", href: "https://linkedin.com", color: "hover:bg-[hsl(210,80%,25%)]" },
  { icon: <Github size={22} />, label: "GitHub", href: "https://github.com", color: "hover:bg-[hsl(220,10%,25%)]" },
  { icon: <Mail size={22} />, label: "Email", href: "mailto:seuemail@email.com", color: "hover:bg-[hsl(0,60%,30%)]" },
  { icon: <MessageCircle size={22} />, label: "WhatsApp", href: "https://wa.me/5500000000000", color: "hover:bg-[hsl(142,60%,25%)]" },
];

const ContactSection = () => {
  return (
    <section id="contato" className="py-24">
      <div className="section-container text-center">
        <p className="text-primary font-mono text-sm mb-2">Contato</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Vamos <span className="text-gradient">Conversar</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-12">
          Interessado em colaborar ou tem alguma oportunidade? Entre em contato por qualquer um dos canais abaixo.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border border-border bg-card text-foreground font-medium transition-all duration-200 hover:scale-105 hover:border-primary/30 ${link.color}`}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
