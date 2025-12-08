import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { DisasterTypes } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { AlertTriangle } from 'lucide-react';

export default function DisastersPage() {
  const [disasters, setDisasters] = useState<DisasterTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisasters = async () => {
      const { items } = await BaseCrudService.getAll<DisasterTypes>('disastertypes');
      setDisasters(items);
      setLoading(false);
    };
    fetchDisasters();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <AlertTriangle className="w-12 h-12 text-primary" />
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground">
                Types of Disasters
              </h1>
            </div>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Understanding different disaster types helps you prepare and respond effectively. Learn about risks, safety measures, and what to do in each scenario.
            </p>
          </motion.div>

          {/* Disasters Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {disasters.map((disaster, index) => (
              <motion.div
                key={disaster._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/disasters/${disaster._id}`}>
                  <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-primary/30 transition-all duration-300 h-full">
                    {/* Image */}
                    {disaster.icon && (
                      <div className="aspect-video overflow-hidden bg-dark-grey/50">
                        <Image
                          src={disaster.icon}
                          alt={disaster.name || 'Disaster type'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="px-3 py-1 bg-primary/20 rounded-lg">
                          <span className="font-paragraph text-xs text-primary uppercase tracking-wider">
                            {disaster.category || 'Disaster'}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {disaster.name}
                      </h3>

                      {disaster.risks && (
                        <p className="font-paragraph text-base text-foreground/70 line-clamp-3">
                          {disaster.risks}
                        </p>
                      )}

                      <div className="mt-6 flex items-center gap-2 text-primary">
                        <span className="font-paragraph text-sm font-medium">Learn More</span>
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
