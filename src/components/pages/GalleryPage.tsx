import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { GalleryImages } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ImageIcon, X, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImages | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchImages = async () => {
      const { items } = await BaseCrudService.getAll<GalleryImages>('galleryimages');
      setImages(items);
      setLoading(false);
    };
    fetchImages();
  }, []);

  const categories = ['All', ...Array.from(new Set(images.map(i => i.category).filter(Boolean)))];
  
  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(i => i.category === selectedCategory);

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
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <ImageIcon className="w-12 h-12 text-primary" />
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground">
                Gallery
              </h1>
            </div>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Documenting our rescue operations, disaster awareness campaigns, and volunteer activities
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-heading text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white/5 text-foreground/70 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Masonry Gallery */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <button
                  onClick={() => setSelectedImage(image)}
                  className="group relative w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all"
                >
                  {image.galleryImage && (
                    <Image
                      src={image.galleryImage}
                      alt={image.title || 'Gallery image'}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {image.title && (
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                          {image.title}
                        </h3>
                      )}
                      {image.category && (
                        <span className="font-paragraph text-xs text-primary">
                          {image.category}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <ImageIcon className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
              <p className="font-paragraph text-lg text-foreground/60">
                No images found in this category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
                {selectedImage.galleryImage && (
                  <Image
                    src={selectedImage.galleryImage}
                    alt={selectedImage.title || 'Gallery image'}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                )}
                <div className="p-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      {selectedImage.title && (
                        <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
                          {selectedImage.title}
                        </h2>
                      )}
                      {selectedImage.category && (
                        <div className="inline-block px-3 py-1 bg-primary/20 rounded-lg">
                          <span className="font-paragraph text-xs text-primary uppercase tracking-wider">
                            {selectedImage.category}
                          </span>
                        </div>
                      )}
                    </div>
                    {selectedImage.dateTaken && (
                      <div className="flex items-center gap-2 text-foreground/60">
                        <Calendar className="w-4 h-4" />
                        <span className="font-paragraph text-sm">
                          {format(new Date(selectedImage.dateTaken), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    )}
                  </div>
                  {selectedImage.description && (
                    <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                      {selectedImage.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
