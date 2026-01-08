import { Instagram} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/_.garrix._/?next=%2F', label: 'Instagram' },
  ];

  return (
    <footer className="bg-hero py-12 border-t border-hero-foreground/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="font-display text-2xl text-hero-foreground">
            MARCOS <span className="text-primary">ARCE</span>
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-hero-foreground/20 flex items-center justify-center text-hero-foreground/60 hover:text-primary hover:border-primary transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-hero-foreground/50 text-sm">
            © {currentYear} Marcos Arce Garrido. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
