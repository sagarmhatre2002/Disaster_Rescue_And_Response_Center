import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { EmergencyGuides } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BookOpen, Download, ChevronDown } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function EmergencyGuidePage() {
  const [guides, setGuides] = useState<EmergencyGuides[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      const { items } = await BaseCrudService.getAll<EmergencyGuides>('emergencyguides');
      setGuides(items);
      setLoading(false);
    };
    fetchGuides();
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
              <BookOpen className="w-12 h-12 text-primary" />
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground">
                Emergency Guide
              </h1>
            </div>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Comprehensive step-by-step instructions for disaster preparedness and response
            </p>
          </motion.div>

          {/* Guides */}
          <div className="space-y-8">
            {guides.map((guide, index) => (
              <motion.div
                key={guide._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="grid lg:grid-cols-3 gap-8 p-8">
                  {/* Thumbnail */}
                  {guide.thumbnailImage && (
                    <div className="lg:col-span-1">
                      <div className="aspect-square rounded-xl overflow-hidden bg-dark-grey/50">
                        <Image
                          src={guide.thumbnailImage}
                          alt={guide.guideTitle || 'Emergency guide'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {guide.downloadablePdfUrl && (
                        <a href={guide.downloadablePdfUrl} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className={guide.thumbnailImage ? 'lg:col-span-2' : 'lg:col-span-3'}>
                    <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                      {guide.guideTitle}
                    </h2>
                    {guide.description && (
                      <p className="font-paragraph text-base text-foreground/70 mb-6">
                        {guide.description}
                      </p>
                    )}

                    {/* Accordion */}
                    <Accordion type="single" collapsible className="space-y-4">
                      {guide.preDisasterInstructions && (
                        <AccordionItem value="pre" className="bg-white/5 border border-white/10 rounded-xl px-6">
                          <AccordionTrigger className="font-heading text-lg text-foreground hover:text-primary">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                                <span className="font-heading text-sm text-secondary">1</span>
                              </div>
                              Pre-Disaster Preparation
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="font-paragraph text-base text-foreground/80 pt-4 whitespace-pre-line">
                            {guide.preDisasterInstructions}
                          </AccordionContent>
                        </AccordionItem>
                      )}

                      {guide.duringDisasterInstructions && (
                        <AccordionItem value="during" className="bg-white/5 border border-white/10 rounded-xl px-6">
                          <AccordionTrigger className="font-heading text-lg text-foreground hover:text-primary">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                <span className="font-heading text-sm text-primary">2</span>
                              </div>
                              During the Disaster
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="font-paragraph text-base text-foreground/80 pt-4 whitespace-pre-line">
                            {guide.duringDisasterInstructions}
                          </AccordionContent>
                        </AccordionItem>
                      )}

                      {guide.postDisasterInstructions && (
                        <AccordionItem value="post" className="bg-white/5 border border-white/10 rounded-xl px-6">
                          <AccordionTrigger className="font-heading text-lg text-foreground hover:text-primary">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-safe-green/20 flex items-center justify-center">
                                <span className="font-heading text-sm text-safe-green">3</span>
                              </div>
                              After the Disaster
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="font-paragraph text-base text-foreground/80 pt-4 whitespace-pre-line">
                            {guide.postDisasterInstructions}
                          </AccordionContent>
                        </AccordionItem>
                      )}
                    </Accordion>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
