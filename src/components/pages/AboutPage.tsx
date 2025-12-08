import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { LeadershipTeam, OrganizationTimeline, Achievements } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Shield, Target, Eye, Award, Linkedin, Calendar, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

export default function AboutPage() {
  const [leadership, setLeadership] = useState<LeadershipTeam[]>([]);
  const [timeline, setTimeline] = useState<OrganizationTimeline[]>([]);
  const [achievements, setAchievements] = useState<Achievements[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [leadershipData, timelineData, achievementsData] = await Promise.all([
        BaseCrudService.getAll<LeadershipTeam>('leadershipteam'),
        BaseCrudService.getAll<OrganizationTimeline>('organizationtimeline'),
        BaseCrudService.getAll<Achievements>('achievements'),
      ]);
      setLeadership(leadershipData.items);
      setTimeline(timelineData.items.sort((a, b) => 
        new Date(b.eventDate || 0).getTime() - new Date(a.eventDate || 0).getTime()
      ));
      setAchievements(achievementsData.items);
      setLoading(false);
    };
    fetchData();
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
                About DRRC
              </h1>
            </div>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Dedicated to saving lives and building resilient communities worldwide
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                To provide rapid, effective disaster response and rescue operations worldwide, saving lives and supporting affected communities through coordinated emergency services, advanced technology, and dedicated volunteer networks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Our Vision
              </h2>
              <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                A world where every community is prepared for disasters, where response times are minimized, and where no one faces emergencies alone. We envision resilient societies equipped with knowledge, resources, and support systems.
              </p>
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="font-heading text-4xl font-bold text-foreground mb-12 text-center">
              Our Journey
            </h2>
            <div className="space-y-8">
              {timeline.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
                >
                  <div className="grid md:grid-cols-3 gap-8 p-8">
                    {event.eventImage && (
                      <div className="md:col-span-1">
                        <div className="aspect-square rounded-xl overflow-hidden bg-dark-grey/50">
                          <Image
                            src={event.eventImage}
                            alt={event.eventTitle || 'Timeline event'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div className={event.eventImage ? 'md:col-span-2' : 'md:col-span-3'}>
                      {event.eventDate && (
                        <div className="flex items-center gap-2 text-primary mb-3">
                          <Calendar className="w-4 h-4" />
                          <span className="font-paragraph text-sm">
                            {format(new Date(event.eventDate), 'MMMM yyyy')}
                          </span>
                        </div>
                      )}
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                        {event.eventTitle}
                      </h3>
                      {event.eventDescription && (
                        <p className="font-paragraph text-base text-foreground/80 leading-relaxed mb-4">
                          {event.eventDescription}
                        </p>
                      )}
                      {event.learnMoreUrl && (
                        <a
                          href={event.learnMoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                        >
                          <span className="font-paragraph text-sm font-medium">Learn More</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership Team */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="font-heading text-4xl font-bold text-foreground mb-12 text-center">
              Leadership Team
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadership.map((leader, index) => (
                <motion.div
                  key={leader._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-primary/30 transition-all"
                >
                  {leader.profilePicture && (
                    <div className="aspect-square overflow-hidden bg-dark-grey/50">
                      <Image
                        src={leader.profilePicture}
                        alt={leader.name || 'Team member'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                      {leader.name}
                    </h3>
                    {leader.role && (
                      <p className="font-paragraph text-sm text-primary mb-4">
                        {leader.role}
                      </p>
                    )}
                    {leader.biography && (
                      <p className="font-paragraph text-sm text-foreground/70 mb-4 line-clamp-3">
                        {leader.biography}
                      </p>
                    )}
                    {leader.linkedInUrl && (
                      <a
                        href={leader.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span className="font-paragraph text-sm">LinkedIn</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-foreground mb-12 text-center">
              Our Achievements
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center"
                >
                  {achievement.icon && (
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="w-20 h-20 mx-auto mb-6"
                    >
                      <Image
                        src={achievement.icon}
                        alt={achievement.title || 'Achievement'}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  )}
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {achievement.title}
                  </h3>
                  {achievement.description && (
                    <p className="font-paragraph text-sm text-foreground/70 mb-4">
                      {achievement.description}
                    </p>
                  )}
                  {achievement.impactMetric && (
                    <div className="font-heading text-3xl font-bold text-primary mb-2">
                      {achievement.impactMetric.toLocaleString()}
                    </div>
                  )}
                  {achievement.dateAchieved && (
                    <div className="font-paragraph text-xs text-foreground/60">
                      {format(new Date(achievement.dateAchieved), 'MMMM yyyy')}
                    </div>
                  )}
                  {achievement.callToActionUrl && (
                    <a
                      href={achievement.callToActionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mt-4"
                    >
                      <span className="font-paragraph text-sm font-medium">Learn More</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
