import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { AwarenessArticles } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<AwarenessArticles | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      const item = await BaseCrudService.getById<AwarenessArticles>('awarenessarticles', id);
      setArticle(item);
      setLoading(false);
    };
    fetchArticle();
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

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="font-paragraph text-xl text-foreground/70">Article not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/awareness">
            <Button variant="ghost" className="mb-8 text-foreground/70 hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {article.category && (
              <div className="inline-block px-4 py-2 bg-primary/20 rounded-lg mb-4">
                <span className="font-paragraph text-sm text-primary uppercase tracking-wider">
                  {article.category}
                </span>
              </div>
            )}
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-foreground/60">
              {article.author && (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-paragraph text-base">{article.author}</span>
                </div>
              )}
              {article.publicationDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-paragraph text-base">
                    {format(new Date(article.publicationDate), 'MMMM dd, yyyy')}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Featured Image */}
          {article.mainImage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="aspect-video rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 mb-12"
            >
              <Image
                src={article.mainImage}
                alt={article.title || 'Article'}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Summary */}
          {article.summary && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-primary/10 backdrop-blur-md border border-primary/30 rounded-2xl p-8 mb-12"
            >
              <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
                {article.summary}
              </p>
            </motion.div>
          )}

          {/* Content */}
          {article.content && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="prose prose-invert max-w-none"
            >
              <div className="font-paragraph text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center"
          >
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
              Stay Prepared
            </h3>
            <p className="font-paragraph text-base text-foreground/70 mb-6">
              Access our comprehensive emergency guides and resources
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
