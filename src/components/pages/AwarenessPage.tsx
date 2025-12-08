import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { AwarenessArticles } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BookOpen, Search, Calendar, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

export default function AwarenessPage() {
  const [articles, setArticles] = useState<AwarenessArticles[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchArticles = async () => {
      const { items } = await BaseCrudService.getAll<AwarenessArticles>('awarenessarticles');
      setArticles(items);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const categories = ['All', ...Array.from(new Set(articles.map(a => a.category).filter(Boolean)))];
  
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                Awareness Articles
              </h1>
            </div>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Stay informed with expert insights on disaster preparedness, response strategies, and safety protocols
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 space-y-6"
          >
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="pl-12 bg-white/5 border-white/10 text-foreground h-14 rounded-xl"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
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
            </div>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/awareness/${article._id}`}>
                  <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                    {/* Image */}
                    {article.mainImage && (
                      <div className="aspect-video overflow-hidden bg-dark-grey/50">
                        <Image
                          src={article.mainImage}
                          alt={article.title || 'Article'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {article.category && (
                        <div className="inline-block px-3 py-1 bg-primary/20 rounded-lg mb-3 self-start">
                          <span className="font-paragraph text-xs text-primary uppercase tracking-wider">
                            {article.category}
                          </span>
                        </div>
                      )}

                      <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      {article.summary && (
                        <p className="font-paragraph text-base text-foreground/70 mb-4 line-clamp-3 flex-1">
                          {article.summary}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-foreground/60 text-sm pt-4 border-t border-white/10">
                        {article.author && (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span className="font-paragraph">{article.author}</span>
                          </div>
                        )}
                        {article.publicationDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="font-paragraph">
                              {format(new Date(article.publicationDate), 'MMM dd, yyyy')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
              <p className="font-paragraph text-lg text-foreground/60">
                No articles found matching your criteria
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
