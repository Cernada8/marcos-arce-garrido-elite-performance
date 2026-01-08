  import { useState, useEffect } from 'react';
  import { Menu, X } from 'lucide-react';
  import { motion, AnimatePresence } from 'framer-motion';

  const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
      { href: '#sobre-mi', label: 'Sobre Mí' },
      { href: '#servicios', label: 'Servicios' },
      { href: '#beneficios', label: 'Beneficios' },
      { href: '#testimonios', label: 'Testimonios' },
    ];

    return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-hero/95 backdrop-blur-md py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/inicio" className="flex items-center gap-2">
            <span className="font-display text-2xl md:text-3xl text-hero-foreground tracking-wider">
              MARCOS <span className="text-primary">ARCE</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-hero-foreground/80 hover:text-hero-foreground"
              >
                {link.label}
              </a>
            ))}
            <a href="#contacto" className="btn-primary text-sm px-6 py-3">
              Reservar Sesión
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-hero-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-hero/98 backdrop-blur-md"
            >
              <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-hero-foreground/80 hover:text-hero-foreground text-lg py-2"
                  >
                    {link.label}
                  </a>
                ))}
                <a 
                  href="#contacto" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary text-center mt-4"
                >
                  Reservar Sesión
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    );
  };

  export default Header;
