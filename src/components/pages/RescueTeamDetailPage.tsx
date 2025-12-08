import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { RescueTeams } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Shield, Mail, Phone, MapPin, ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RescueTeamDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<RescueTeams | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      if (!id) return;
      const item = await BaseCrudService.getById<RescueTeams>('rescueteams', id);
      setTeam(item);
      setLoading(false);
    };
    fetchTeam();
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

  if (!team) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="font-paragraph text-xl text-foreground/70">Team not found</p>
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
          <Link to="/rescue-teams">
            <Button variant="ghost" className="mb-8 text-foreground/70 hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Teams
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Badge */}
              {team.teamBadge && (
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-48 h-48 rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border-4 border-primary/30 mx-auto lg:mx-0"
                >
                  <Image
                    src={team.teamBadge}
                    alt={team.teamName || 'Team badge'}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}

              {/* Contact Card */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {team.contactEmail && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-primary" />
                        <span className="font-paragraph text-sm text-foreground/60">Email</span>
                      </div>
                      <a
                        href={`mailto:${team.contactEmail}`}
                        className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
                      >
                        {team.contactEmail}
                      </a>
                    </div>
                  )}
                  {team.contactPhone && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <span className="font-paragraph text-sm text-foreground/60">Phone</span>
                      </div>
                      <a
                        href={`tel:${team.contactPhone}`}
                        className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
                      >
                        {team.contactPhone}
                      </a>
                    </div>
                  )}
                  {team.deploymentAreas && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-paragraph text-sm text-foreground/60">Deployment Areas</span>
                      </div>
                      <p className="font-paragraph text-base text-foreground">
                        {team.deploymentAreas}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* Team Name */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-10 h-10 text-primary" />
                  <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                    {team.teamName}
                  </h1>
                </div>
              </div>

              {/* Roles & Responsibilities */}
              {team.rolesAndResponsibilities && (
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                  <h2 className="font-heading text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-primary" />
                    Roles & Responsibilities
                  </h2>
                  <p className="font-paragraph text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                    {team.rolesAndResponsibilities}
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="bg-primary/10 backdrop-blur-md border border-primary/30 rounded-2xl p-8">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  Want to Join Our Team?
                </h3>
                <p className="font-paragraph text-base text-foreground/70 mb-6">
                  We're always looking for dedicated volunteers to join our rescue operations
                </p>
                <Link to="/volunteer">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Become a Volunteer
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
