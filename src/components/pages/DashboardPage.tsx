import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useMember } from '@/integrations';
import { User, Award, Calendar, Bell, CheckCircle, MapPin } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function DashboardPage() {
  const { member } = useMember();

  const upcomingEvents = [
    {
      id: '1',
      title: 'Emergency Response Training',
      date: '2024-01-15',
      location: 'Training Center A',
      status: 'Registered',
    },
    {
      id: '2',
      title: 'Community Awareness Workshop',
      date: '2024-01-22',
      location: 'Community Hall',
      status: 'Pending',
    },
    {
      id: '3',
      title: 'Disaster Simulation Exercise',
      date: '2024-02-05',
      location: 'Field Operations Base',
      status: 'Registered',
    },
  ];

  const tasks = [
    { id: '1', title: 'Complete Safety Training Module', status: 'In Progress', priority: 'High' },
    { id: '2', title: 'Update Emergency Contact Information', status: 'Pending', priority: 'Medium' },
    { id: '3', title: 'Review Disaster Response Protocols', status: 'Completed', priority: 'Low' },
    { id: '4', title: 'Attend Team Briefing Session', status: 'Pending', priority: 'High' },
  ];

  const certificates = [
    { id: '1', title: 'First Aid & CPR Certification', issueDate: '2023-06-15', validUntil: '2025-06-15' },
    { id: '2', title: 'Emergency Response Level 1', issueDate: '2023-08-20', validUntil: '2025-08-20' },
    { id: '3', title: 'Disaster Management Basics', issueDate: '2023-09-10', validUntil: '2025-09-10' },
  ];

  const alerts = [
    { id: '1', type: 'warning', message: 'Severe weather alert in your region - Be prepared', time: '2 hours ago' },
    { id: '2', type: 'info', message: 'New training materials available in your dashboard', time: '5 hours ago' },
    { id: '3', type: 'success', message: 'Your volunteer hours have been logged successfully', time: '1 day ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-[120rem] mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-md border border-primary/30 rounded-2xl p-8">
              <div className="flex items-center gap-6">
                {member?.profile?.photo?.url ? (
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/10 flex-shrink-0">
                    <Image
                      src={member.profile.photo.url}
                      alt={member.profile.nickname || 'Profile'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-10 h-10 text-foreground/40" />
                  </div>
                )}
                <div>
                  <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                    Welcome back, {member?.profile?.nickname || member?.contact?.firstName || 'Volunteer'}!
                  </h1>
                  <p className="font-paragraph text-base text-foreground/70">
                    Ready to make a difference today
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tasks */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
              >
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  My Tasks
                </h2>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            task.status === 'Completed'
                              ? 'bg-safe-green'
                              : task.status === 'In Progress'
                              ? 'bg-primary'
                              : 'bg-foreground/30'
                          }`}
                        ></div>
                        <div>
                          <h3 className="font-heading text-base font-semibold text-foreground">
                            {task.title}
                          </h3>
                          <p className="font-paragraph text-sm text-foreground/60">
                            Status: {task.status}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          task.priority === 'High'
                            ? 'bg-alert-red/20 text-alert-red'
                            : task.priority === 'Medium'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-foreground/10 text-foreground/60'
                        }`}
                      >
                        {task.priority}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
              >
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  Upcoming Events
                </h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          {event.title}
                        </h3>
                        <div
                          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            event.status === 'Registered'
                              ? 'bg-safe-green/20 text-safe-green'
                              : 'bg-primary/20 text-primary'
                          }`}
                        >
                          {event.status}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-foreground/60 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="font-paragraph">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="font-paragraph">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Certificates */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
              >
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  My Certificates
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-6"
                    >
                      <Award className="w-8 h-8 text-primary mb-3" />
                      <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                        {cert.title}
                      </h3>
                      <div className="space-y-1 text-xs text-foreground/60 font-paragraph">
                        <p>Issued: {cert.issueDate}</p>
                        <p>Valid Until: {cert.validUntil}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 sticky top-32"
              >
                <h2 className="font-heading text-xl font-bold text-foreground mb-6">
                  Profile
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60 mb-1">Name</p>
                    <p className="font-paragraph text-base text-foreground">
                      {member?.contact?.firstName} {member?.contact?.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60 mb-1">Email</p>
                    <p className="font-paragraph text-base text-foreground">
                      {member?.loginEmail || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60 mb-1">Status</p>
                    <div className="inline-block px-3 py-1 bg-safe-green/20 rounded-lg">
                      <span className="font-paragraph text-sm text-safe-green">Active Volunteer</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60 mb-1">Member Since</p>
                    <p className="font-paragraph text-base text-foreground">
                      {member?._createdDate
                        ? new Date(member._createdDate).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Alerts */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
              >
                <h2 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Alerts
                </h2>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`border-l-4 pl-4 py-2 ${
                        alert.type === 'warning'
                          ? 'border-alert-red'
                          : alert.type === 'success'
                          ? 'border-safe-green'
                          : 'border-secondary'
                      }`}
                    >
                      <p className="font-paragraph text-sm text-foreground mb-1">
                        {alert.message}
                      </p>
                      <p className="font-paragraph text-xs text-foreground/50">
                        {alert.time}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
