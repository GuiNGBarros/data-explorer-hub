const Footer = () => (
  <footer className="py-8 border-t border-border">
    <div className="section-container text-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} — Feito com{" "}
        <span className="text-primary">♥</span> e dados
      </p>
    </div>
  </footer>
);

export default Footer;
