import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { DisasterTypes } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { AlertTriangle, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DisasterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [disaster, setDisaster] = useState<DisasterTypes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisaster = async () => {
      if (!id) return;
      const item = await BaseCrudService.getById<DisasterTypes>('disastertypes', id);
      setDisaster(item);
      setLoading(false);
    };
    fetchDisaster();
  }, [id]);

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

  if (!disaster) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="font-paragraph text-xl text-foreground/70">Disaster not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-[100rem] mx-auto">
          {/* Back Button */}
          <Link to="/disasters">
            <Button variant="ghost" className="mb-8 text-foreground/70 hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Disasters
            </Button>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <AlertTriangle className="w-12 h-12 text-primary" />
              <div>
                <div className="px-4 py-1 bg-primary/20 rounded-lg inline-block mb-3">
                  <span className="font-paragraph text-sm text-primary uppercase tracking-wider">
                    {disaster.category || 'Disaster'}
                  </span>
                </div>
                <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground">
                  {disaster.name}
                </h1>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            {disaster.icon && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="aspect-square rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10"
              >
                <Image
                  src={disaster.icon}
                  alt={disaster.name || 'Disaster'}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              {/* Risks */}
              {disaster.risks && (
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                    <h2 className="font-heading text-2xl font-semibold text-foreground">
                      Risks & Dangers
                    </h2>
                  </div>
                  <p className="font-paragraph text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                    {disaster.risks}
                  </p>
                </div>
              )}

              {/* Do's */}
              {disaster.dos && (
                <div className="bg-safe-green/10 backdrop-blur-md border border-safe-green/30 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-safe-green" />
                    <h2 className="font-heading text-2xl font-semibold text-foreground">
                      What to Do
                    </h2>
                  </div>
                  <div className="font-paragraph text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                    {disaster.dos}
                  </div>
                </div>
              )}

              {/* Don'ts */}
              {disaster.donts && (
                <div className="bg-alert-red/10 backdrop-blur-md border border-alert-red/30 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="w-6 h-6 text-alert-red" />
                    <h2 className="font-heading text-2xl font-semibold text-foreground">
                      What NOT to Do
                    </h2>
                  </div>
                  <div className="font-paragraph text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                    {disaster.donts}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-primary/10 backdrop-blur-md border border-primary/30 rounded-2xl p-8 text-center"
          >
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
              Need More Information?
            </h3>
            <p className="font-paragraph text-base text-foreground/70 mb-6">
              Access our comprehensive emergency guides and safety protocols
            </p>
            <Link to="/emergency-guide">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                View Emergency Guide
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
