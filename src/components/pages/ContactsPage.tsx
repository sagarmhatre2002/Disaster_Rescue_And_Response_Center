import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { EmergencyContacts } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Phone, MapPin, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<EmergencyContacts[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchContacts = async () => {
      const { items } = await BaseCrudService.getAll<EmergencyContacts>('emergencycontacts');
      setContacts(items);
      setLoading(false);
    };
    fetchContacts();
  }, []);

  const categories = ['All', ...Array.from(new Set(contacts.map(c => c.category).filter(Boolean)))];
  
  const filteredContacts = selectedCategory === 'All' 
    ? contacts 
    : contacts.filter(c => c.category === selectedCategory);

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
              <Phone className="w-12 h-12 text-primary" />
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground">
                Emergency Contacts
              </h1>
            </div>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Quick access to emergency numbers worldwide - organized by category and region
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

          {/* Contacts Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      {contact.contactName}
                    </h3>
                    {contact.category && (
                      <div className="inline-block px-3 py-1 bg-primary/20 rounded-lg mb-3">
                        <span className="font-paragraph text-xs text-primary uppercase tracking-wider">
                          {contact.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                </div>

                {contact.phoneNumber && (
                  <a href={`tel:${contact.phoneNumber}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-4">
                      <Phone className="w-4 h-4 mr-2" />
                      {contact.phoneNumber}
                    </Button>
                  </a>
                )}

                <div className="space-y-2">
                  {contact.countryRegion && (
                    <div className="flex items-center gap-2 text-foreground/70">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-paragraph text-sm">{contact.countryRegion}</span>
                    </div>
                  )}
                  {contact.notes && (
                    <div className="flex items-start gap-2 text-foreground/70">
                      <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-sm">{contact.notes}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredContacts.length === 0 && (
            <div className="text-center py-16">
              <Phone className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
              <p className="font-paragraph text-lg text-foreground/60">
                No contacts found in this category
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
