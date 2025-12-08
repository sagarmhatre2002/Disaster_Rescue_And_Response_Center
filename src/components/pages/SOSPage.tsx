import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Phone, Radio, Smartphone, Wifi, WifiOff, AlertTriangle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SOSPage() {
  const sosSteps = [
    {
      icon: Phone,
      title: 'Call Emergency Services',
      description: 'Dial your local emergency number (911, 112, etc.) immediately',
      color: 'alert-red',
    },
    {
      icon: MessageSquare,
      title: 'Send Text Message',
      description: 'If calling is not possible, send SMS to emergency contacts with your location',
      color: 'primary',
    },
    {
      icon: Smartphone,
      title: 'Use Emergency Apps',
      description: 'Activate SOS feature on your smartphone or emergency alert apps',
      color: 'secondary',
    },
    {
      icon: Radio,
      title: 'Signal for Help',
      description: 'Use whistle, flashlight, or mirror to signal rescuers in your area',
      color: 'safe-green',
    },
  ];

  const offlineSteps = [
    {
      step: '1',
      title: 'Find High Ground',
      description: 'Move to an elevated position for better signal reception',
    },
    {
      step: '2',
      title: 'Use Visual Signals',
      description: 'Create SOS signal (3 short, 3 long, 3 short) with light or sound',
    },
    {
      step: '3',
      title: 'Stay Visible',
      description: 'Wear bright colors, use reflective materials, or create smoke signals',
    },
    {
      step: '4',
      title: 'Conserve Battery',
      description: 'Turn off unnecessary features, enable airplane mode when not signaling',
    },
  ];

  const emergencySignals = [
    {
      signal: 'SOS Morse Code',
      pattern: '• • • — — — • • •',
      description: '3 short, 3 long, 3 short signals (light or sound)',
    },
    {
      signal: 'Triangle Pattern',
      pattern: '△',
      description: 'Arrange 3 objects in triangle shape (visible from air)',
    },
    {
      signal: 'X Mark',
      pattern: '✕',
      description: 'Large X on ground indicates need for medical assistance',
    },
    {
      signal: 'Mirror Flash',
      pattern: '⚡',
      description: 'Reflect sunlight in groups of 3 flashes',
    },
  ];

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
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <AlertTriangle className="w-16 h-16 text-alert-red" />
              </motion.div>
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground">
                SOS Instructions
              </h1>
            </div>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
              Emergency procedures and signaling methods to get help when you need it most
            </p>

            {/* Emergency Call Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <a href="tel:911">
                <Button
                  size="lg"
                  className="bg-alert-red hover:bg-alert-red/90 text-white font-heading text-2xl px-16 py-10 rounded-2xl shadow-2xl shadow-alert-red/50 animate-pulse"
                >
                  <Phone className="w-10 h-10 mr-4" />
                  CALL 911 NOW
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* SOS Steps */}
          <div className="mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-4xl font-bold text-foreground mb-12 text-center"
            >
              How to Send SOS
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {sosSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center"
                >
                  <div
                    className={`w-20 h-20 rounded-2xl bg-${step.color}/20 flex items-center justify-center mx-auto mb-6`}
                  >
                    <step.icon className={`w-10 h-10 text-${step.color}`} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="font-paragraph text-base text-foreground/70">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Offline SOS Steps */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <WifiOff className="w-10 h-10 text-primary" />
                <h2 className="font-heading text-4xl font-bold text-foreground">
                  Offline SOS Steps
                </h2>
              </div>
              <p className="font-paragraph text-lg text-foreground/70">
                What to do when you have no phone signal or internet connection
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {offlineSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex gap-6"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <span className="font-heading text-3xl font-bold text-primary">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="font-paragraph text-base text-foreground/70">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Emergency Signals */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
                Emergency Signal Guide
              </h2>
              <p className="font-paragraph text-lg text-foreground/70">
                Universal distress signals recognized worldwide
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {emergencySignals.map((signal, index) => (
                <motion.div
                  key={signal.signal}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center"
                >
                  <div className="text-6xl mb-6">{signal.pattern}</div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    {signal.signal}
                  </h3>
                  <p className="font-paragraph text-sm text-foreground/70">
                    {signal.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-alert-red/10 backdrop-blur-md border border-alert-red/30 rounded-2xl p-8"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-alert-red flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  Important Safety Notice
                </h3>
                <ul className="font-paragraph text-base text-foreground/80 space-y-2 list-disc list-inside">
                  <li>Always call emergency services first if possible</li>
                  <li>Stay calm and assess your situation before taking action</li>
                  <li>Conserve your energy and resources while waiting for help</li>
                  <li>Never put yourself in additional danger while signaling</li>
                  <li>Keep emergency contacts and medical information easily accessible</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
