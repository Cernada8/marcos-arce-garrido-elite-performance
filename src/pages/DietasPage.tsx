import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Star, Flame } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const dietas = [
  {
    id: 1,
    name: 'Plan Definición',
    description: 'Dieta enfocada en pérdida de grasa manteniendo masa muscular. Ideal para conseguir un físico definido.',
    price: 49,
    period: 'mes',
    popular: false,
    features: [
      'Plan nutricional de 4 semanas',
      'Lista de compras semanal',
      'Recetas fáciles incluidas',
      'Ajustes según progreso',
      'Soporte por email',
    ],
  },
  {
    id: 2,
    name: 'Plan Volumen',
    description: 'Dieta hipercalórica para ganancia muscular limpia. Maximiza tus resultados en el gimnasio.',
    price: 59,
    period: 'mes',
    popular: true,
    features: [
      'Plan nutricional de 8 semanas',
      'Timing de comidas optimizado',
      'Suplementación recomendada',
      'Recetas high-protein',
      'Ajustes ilimitados',
      'Soporte prioritario WhatsApp',
    ],
  },
  {
    id: 3,
    name: 'Plan Rendimiento',
    description: 'Nutrición deportiva avanzada para atletas. Periodización según tu calendario de competición.',
    price: 89,
    period: 'mes',
    popular: false,
    features: [
      'Plan nutricional de 12 semanas',
      'Periodización nutricional',
      'Pre/intra/post entreno',
      'Análisis de composición corporal',
      'Videollamadas mensuales',
      'Soporte 24/7',
    ],
  },
  {
    id: 4,
    name: 'Plan Keto Fighter',
    description: 'Dieta cetogénica adaptada para deportes de combate. Control de peso sin perder potencia.',
    price: 69,
    period: 'mes',
    popular: false,
    features: [
      'Plan cetogénico 6 semanas',
      'Estrategias de corte de peso',
      'Rehidratación post-pesaje',
      'Recetas keto-friendly',
      'Ajustes pre-competición',
      'Soporte WhatsApp',
    ],
  },
];

const DietasPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-hero">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/#servicios" 
              className="inline-flex items-center gap-2 text-hero-foreground/60 hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a servicios
            </Link>
            
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              Planes Nutricionales
            </p>
            
            <h1 className="display-title text-hero-foreground mb-6 text-5xl md:text-7xl">
              Dietas <span className="text-primary">Personalizadas</span>
            </h1>
            
            <p className="text-hero-foreground/60 text-xl max-w-2xl">
              Planes nutricionales diseñados para tu objetivo específico. 
              Cada dieta se adapta a tu estilo de vida, preferencias y metas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dietas.map((dieta, index) => (
              <motion.article
                key={dieta.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl transition-all duration-500 hover:-translate-y-2 ${
                  dieta.popular 
                    ? 'bg-gradient-to-b from-primary/20 to-hero border-2 border-primary' 
                    : 'bg-secondary/30 border border-hero-foreground/10 hover:border-primary/50'
                }`}
              >
                {dieta.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 bg-primary px-4 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-primary-foreground text-primary-foreground" />
                      <span className="text-xs font-semibold text-primary-foreground">Más popular</span>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-2xl text-hero-foreground mb-2">
                    {dieta.name}
                  </h3>
                  <p className="text-hero-foreground/50 text-sm leading-relaxed">
                    {dieta.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-5xl text-hero-foreground">{dieta.price}€</span>
                    <span className="text-hero-foreground/50">/{dieta.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {dieta.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-hero-foreground/70">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                    dieta.popular
                      ? 'btn-primary'
                      : 'bg-secondary/50 text-hero-foreground hover:bg-primary/20 border border-hero-foreground/10 hover:border-primary/50'
                  }`}
                >
                  Elegir Plan
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center p-10 rounded-3xl bg-gradient-to-br from-secondary/50 to-hero border border-hero-foreground/10"
          >
            <Flame className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="section-title text-hero-foreground mb-4 text-3xl md:text-4xl">
              ¿No sabes cuál elegir?
            </h2>
            <p className="text-hero-foreground/60 mb-8">
              Agenda una consulta gratuita y te ayudaré a encontrar el plan perfecto para ti.
            </p>
            <Link to="/#contacto" className="btn-primary">
              Consulta Gratis
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default DietasPage;
