// HPI 1.6-G
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Shield, 
  MapPin, 
  Heart, 
  Users, 
  BookOpen, 
  Phone, 
  ArrowRight, 
  Activity, 
  Radio, 
  Globe,
  ChevronRight,
  Siren
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';

// --- CANONICAL DATA SOURCES ---
const DISASTER_TICKER_DATA = [
  'Earthquake Alert: Magnitude 6.2 detected in Pacific Region',
  'Flood Warning: Heavy rainfall expected in coastal areas',
  'Wildfire Update: Evacuation orders issued for northern zones',
  'Hurricane Watch: Category 3 storm approaching eastern coast',
];

const QUICK_LINKS_DATA = [
  {
    icon: BookOpen,
    title: 'Emergency Guide',
    description: 'Step-by-step disaster response instructions',
    path: '/emergency-guide',
    color: 'primary',
    bgId: 'guide-bg'
  },
  {
    icon: MapPin,
    title: 'Safe Zone Map',
    description: 'Find nearest shelters and safe locations',
    path: '/safe-zone-map',
    color: 'safe-green',
    bgId: 'map-bg'
  },
  {
    icon: Heart,
    title: 'Donation',
    description: 'Support our rescue operations',
    path: '/donation',
    color: 'alert-red',
    bgId: 'donate-bg'
  },
  {
    icon: Users,
    title: 'Volunteer',
    description: 'Join our rescue teams',
    path: '/volunteer',
    color: 'secondary',
    bgId: 'volunteer-bg'
  },
];

const STATS_DATA = [
  { value: '50K+', label: 'Lives Saved', icon: Heart },
  { value: '120+', label: 'Countries Served', icon: Globe },
  { value: '24/7', label: 'Emergency Response', icon: Activity },
  { value: '5K+', label: 'Active Volunteers', icon: Users },
];

// --- UTILITY COMPONENTS ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedReveal: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref} className={`reveal-fade-up ${className || ''}`}>{children}</div>;
};

const ParallaxImage = ({ src, alt, className, id }: { src: string, alt: string, className?: string, id: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
        <Image
          src={`${src}?id=${id}`}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function HomePage() {
  const [tickerIndex, setTickerIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % DISASTER_TICKER_DATA.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-clip selection:bg-primary selection:text-white font-paragraph">
      <style>{`
        .reveal-fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-fade-up.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 #ff00c1;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: -1px 0 #00fff9;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { clip: rect(34px, 9999px, 11px, 0); }
          5% { clip: rect(68px, 9999px, 96px, 0); }
          10% { clip: rect(12px, 9999px, 83px, 0); }
          15% { clip: rect(94px, 9999px, 2px, 0); }
          20% { clip: rect(16px, 9999px, 55px, 0); }
          100% { clip: rect(4px, 9999px, 91px, 0); }
        }
        @keyframes glitch-anim2 {
          0% { clip: rect(2px, 9999px, 88px, 0); }
          5% { clip: rect(54px, 9999px, 12px, 0); }
          10% { clip: rect(89px, 9999px, 45px, 0); }
          15% { clip: rect(23px, 9999px, 67px, 0); }
          20% { clip: rect(76px, 9999px, 3px, 0); }
          100% { clip: rect(65px, 9999px, 19px, 0); }
        }
        .grid-bg {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      <Header />



      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage 
            src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png"
            id="hero-storm-bg"
            alt="Dark stormy sky over a city"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#121212_100%)]" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-4 md:px-8 flex flex-col items-center text-center">
          <AnimatedReveal className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-alert-red/10 border border-alert-red/30 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alert-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-alert-red"></span>
              </span>
              <span className="text-alert-red font-mono text-sm tracking-wider uppercase">System Status: Critical Alert</span>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={200} className="mb-8">
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-white mix-blend-overlay opacity-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none blur-sm">
              RESPONSE
            </h1>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white relative z-10">
              <span className="block glitch-text" data-text="DISASTER">DISASTER</span>
              <span className="block text-primary">RESCUE &</span>
              <span className="block">RESPONSE</span>
            </h1>
          </AnimatedReveal>

          <AnimatedReveal delay={400} className="max-w-2xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
              Global rapid response network. 24/7 emergency coordination. 
              <span className="text-white font-medium"> We are the line between chaos and safety.</span>
            </p>
          </AnimatedReveal>

          <AnimatedReveal delay={600}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link to="/sos">
                <Button className="h-16 px-10 bg-alert-red hover:bg-red-600 text-white rounded-none border-l-4 border-white/20 text-lg font-heading tracking-wide shadow-[0_0_40px_-10px_rgba(255,69,0,0.5)] group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    <Siren className="w-6 h-6 animate-pulse" />
                    INITIATE SOS SIGNAL
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/emergency-guide">
                <Button variant="outline" className="h-16 px-10 border-white/20 text-white hover:bg-white/10 hover:text-white rounded-none text-lg font-heading tracking-wide backdrop-blur-sm">
                  PROTOCOL GUIDE
                </Button>
              </Link>
            </div>
          </AnimatedReveal>
        </div>

        {/* Ticker - Absolute Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-background/90 border-t border-white/10 backdrop-blur-md">
          <div className="max-w-[120rem] mx-auto flex items-center h-14">
            <div className="bg-alert-red h-full px-6 flex items-center justify-center shrink-0">
              <AlertTriangle className="text-white w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1 overflow-hidden relative h-full flex items-center px-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={tickerIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="font-mono text-sm md:text-base text-white/90 truncate w-full"
                >
                  <span className="text-alert-red mr-3">/// LIVE FEED ///</span>
                  {DISASTER_TICKER_DATA[tickerIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="hidden md:flex items-center gap-4 px-6 border-l border-white/10 h-full text-xs font-mono text-white/50">
              <span>LAT: 34.0522° N</span>
              <span>LON: 118.2437° W</span>
              <span className="flex items-center gap-2 text-safe-green"><div className="w-2 h-2 rounded-full bg-safe-green animate-pulse" /> ONLINE</span>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="relative py-32 w-full bg-background overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Text Content */}
            <div className="lg:col-span-5 relative z-10">
              <AnimatedReveal>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-12 bg-primary" />
                  <span className="text-primary font-mono text-sm tracking-widest uppercase">Our Mandate</span>
                </div>
                <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                  Rapid Response. <br />
                  <span className="text-white/40">Global Reach.</span>
                </h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed border-l-2 border-white/10 pl-6">
                  The Disaster Rescue & Response Center (DRRC) is dedicated to saving lives and providing critical support during natural and man-made disasters. Our global network of trained professionals operates 24/7 to respond to emergencies.
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    "Advanced Satellite Coordination",
                    "Rapid Deployment Units",
                    "Humanitarian Aid Logistics"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-gray-300">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-12">
                  <Link to="/about">
                    <Button variant="link" className="text-white p-0 h-auto font-heading text-lg hover:text-primary transition-colors group">
                      Read Full Mission Statement 
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </AnimatedReveal>
            </div>

            {/* Visual Content */}
            <div className="lg:col-span-7 relative">
              <AnimatedReveal delay={200} className="relative">
                <div className="relative aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/10] w-full overflow-hidden rounded-sm border border-white/10 bg-dark-grey/50">
                  <ParallaxImage 
                    src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png"
                    id="mission-ops"
                    alt="Rescue team coordinating in a command center"
                    className="w-full h-full opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  
                  {/* HUD Overlays */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="w-2 h-2 bg-white/50" />
                    <div className="w-2 h-2 bg-white/50" />
                    <div className="w-2 h-2 bg-white/50" />
                  </div>
                  <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-md border border-white/10 p-6 max-w-xs">
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                      <span className="text-xs font-mono text-primary">ACTIVE UNITS</span>
                      <Activity className="w-4 h-4 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Alpha Team</span>
                        <span className="text-safe-green">Deployed</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-safe-green" />
                      </div>
                      <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>Bravo Team</span>
                        <span className="text-yellow-500">Standby</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-yellow-500" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary/30" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-primary/30" />
              </AnimatedReveal>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-[120rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS_DATA.map((stat, index) => (
              <AnimatedReveal key={index} delay={index * 100}>
                <div className="flex flex-col items-center md:items-start group">
                  <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/5 group-hover:border-primary/50 transition-colors">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="font-mono text-sm text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK ACCESS GRID */}
      <section className="py-32 relative">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <AnimatedReveal className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Command Center
            </h2>
            <p className="text-xl text-gray-400">
              Direct access to critical emergency protocols and resources.
            </p>
          </AnimatedReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_LINKS_DATA.map((link, index) => (
              <AnimatedReveal key={index} delay={index * 100} className="h-full">
                <Link to={link.path} className="block h-full">
                  <div className="group relative h-full bg-dark-grey/30 border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden">
                    {/* Hover Background Image */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                      <Image 
                        src={'https://static.wixstatic.com/media/cd3071_64fce7907ab94f20950f26d29a21fb0b~mv2.png?originWidth=576&originHeight=384'}
                        alt=""
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                    
                    <div className="relative z-10 p-8 flex flex-col h-full">
                      <div className={`w-14 h-14 rounded-none flex items-center justify-center bg-white/5 border border-white/10 mb-8 group-hover:bg-${link.color}/20 group-hover:border-${link.color}/50 transition-colors duration-300`}>
                        <link.icon className={`w-7 h-7 text-white group-hover:text-${link.color} transition-colors`} />
                      </div>
                      
                      <h3 className="font-heading text-2xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
                        {link.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-8 flex-grow leading-relaxed">
                        {link.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <span className="font-mono text-xs text-gray-500 group-hover:text-white transition-colors">ACCESS MODULE</span>
                        <ChevronRight className={`w-5 h-5 text-gray-500 group-hover:text-${link.color} group-hover:translate-x-1 transition-all`} />
                      </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-white/50 transition-colors" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-white/50 transition-colors" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-white/50 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-white/50 transition-colors" />
                  </div>
                </Link>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE OPERATIONS MAP PREVIEW (New Section) */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
           <ParallaxImage 
            src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png"
            id="tech-map-overlay"
            alt="Global map data visualization"
            className="w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

        <div className="max-w-[120rem] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
            <AnimatedReveal>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">
                Live Operations
              </h2>
              <p className="text-gray-400 font-mono">REAL-TIME GLOBAL MONITORING</p>
            </AnimatedReveal>
            <AnimatedReveal delay={200}>
              <Link to="/safe-zone-map">
                <Button variant="outline" className="mt-6 md:mt-0 border-primary text-primary hover:bg-primary hover:text-white rounded-none gap-2">
                  <Radio className="w-4 h-4 animate-pulse" />
                  VIEW INTERACTIVE MAP
                </Button>
              </Link>
            </AnimatedReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { region: "Pacific Rim", status: "High Alert", count: 3, color: "text-alert-red" },
              { region: "Central Europe", status: "Monitoring", count: 1, color: "text-yellow-500" },
              { region: "Southeast Asia", status: "Recovery", count: 5, color: "text-safe-green" }
            ].map((zone, i) => (
              <AnimatedReveal key={i} delay={i * 150}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-heading text-xl text-white">{zone.region}</h3>
                    <span className={`font-mono text-xs px-2 py-1 bg-white/5 rounded ${zone.color}`}>
                      {zone.status}
                    </span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-white">{zone.count}</span>
                    <span className="text-sm text-gray-500 mb-1">Active Missions</span>
                  </div>
                  <div className="mt-4 w-full bg-white/10 h-px relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/50 w-1/2 animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* VOLUNTEER CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-alert-red z-0">
          <Image 
            src="https://static.wixstatic.com/media/cd3071_4857ba2a3643411287f750cf274bb6f8~mv2.png?originWidth=1152&originHeight=768"
            alt="Volunteers working together"
            className="w-full h-full object-cover opacity-20 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-alert-red via-alert-red/90 to-alert-red/80" />
        </div>

        <div className="max-w-[100rem] mx-auto px-4 md:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedReveal>
              <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-8 leading-none">
                WE NEED <br />
                <span className="text-black/20">YOU</span> ON THE <br />
                GROUND.
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-lg leading-relaxed font-medium">
                Disasters don't wait. Neither do we. Join the global network of first responders, medical staff, and logistics experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/volunteer">
                  <Button className="h-14 px-8 bg-white text-alert-red hover:bg-gray-100 font-heading text-lg rounded-none border-0">
                    REGISTER AS VOLUNTEER
                  </Button>
                </Link>
                <Link to="/donation">
                  <Button variant="outline" className="h-14 px-8 border-white text-white hover:bg-white/20 font-heading text-lg rounded-none">
                    MAKE A DONATION
                  </Button>
                </Link>
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={200} className="hidden md:block">
              <div className="grid grid-cols-2 gap-4 opacity-50">
                <div className="aspect-square bg-black/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 flex flex-col justify-end">
                  <Shield className="w-10 h-10 text-white mb-4" />
                  <span className="font-heading text-2xl text-white">Training</span>
                </div>
                <div className="aspect-square bg-black/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 flex flex-col justify-end translate-y-8">
                  <Users className="w-10 h-10 text-white mb-4" />
                  <span className="font-heading text-2xl text-white">Community</span>
                </div>
                <div className="aspect-square bg-black/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 flex flex-col justify-end -translate-y-8">
                  <Globe className="w-10 h-10 text-white mb-4" />
                  <span className="font-heading text-2xl text-white">Impact</span>
                </div>
                <div className="aspect-square bg-black/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 flex flex-col justify-end">
                  <Heart className="w-10 h-10 text-white mb-4" />
                  <span className="font-heading text-2xl text-white">Purpose</span>
                </div>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}