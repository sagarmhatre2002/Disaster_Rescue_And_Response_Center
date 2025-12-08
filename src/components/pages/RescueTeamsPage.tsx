import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { RescueTeams } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

export default function RescueTeamsPage() {
  const [teams, setTeams] = useState<RescueTeams[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      const { items } = await BaseCrudService.getAll<RescueTeams>('rescueteams');
      setTeams(items);
      setLoading(false);
    };
    fetchTeams();
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
              <Shield className="w-12 h-12 text-primary" />
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground">
                Rescue Teams
              </h1>
            </div>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Meet our dedicated rescue teams operating worldwide to save lives and provide emergency support
            </p>
          </motion.div>

          {/* Teams Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {teams.map((team, index) => (
              <motion.div
                key={team._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/rescue-teams/${team._id}`}>
                  <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-primary/30 transition-all duration-300 h-full">
                    <div className="p-8">
                      {/* Badge */}
                      {team.teamBadge && (
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="w-24 h-24 mb-6 rounded-2xl overflow-hidden bg-dark-grey/50 border-2 border-primary/30"
                        >
                          <Image
                            src={team.teamBadge}
                            alt={team.teamName || 'Team badge'}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      )}

                      {/* Team Name */}
                      <h3 className="font-heading text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                        {team.teamName}
                      </h3>

                      {/* Roles */}
                      {team.rolesAndResponsibilities && (
                        <p className="font-paragraph text-base text-foreground/70 mb-6 line-clamp-3">
                          {team.rolesAndResponsibilities}
                        </p>
                      )}

                      {/* Contact Info */}
                      <div className="space-y-3">
                        {team.contactEmail && (
                          <div className="flex items-center gap-3 text-foreground/70">
                            <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="font-paragraph text-sm">{team.contactEmail}</span>
                          </div>
                        )}
                        {team.contactPhone && (
                          <div className="flex items-center gap-3 text-foreground/70">
                            <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="font-paragraph text-sm">{team.contactPhone}</span>
                          </div>
                        )}
                        {team.deploymentAreas && (
                          <div className="flex items-center gap-3 text-foreground/70">
                            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="font-paragraph text-sm">{team.deploymentAreas}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex items-center gap-2 text-primary">
                        <span className="font-paragraph text-sm font-medium">View Details</span>
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
