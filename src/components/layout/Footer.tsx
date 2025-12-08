import { Link } from 'react-router-dom';
import { AlertTriangle, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/disasters', label: 'Types of Disasters' },
    { path: '/emergency-guide', label: 'Emergency Guide' },
    { path: '/safe-zone-map', label: 'Safe Zone Map' },
    { path: '/sos', label: 'SOS Instructions' },
  ];

  const supportLinks = [
    { path: '/donation', label: 'Donate Now' },
    { path: '/volunteer', label: 'Become a Volunteer' },
    { path: '/contacts', label: 'Emergency Contacts' },
    { path: '/awareness', label: 'Awareness Articles' },
  ];

  const aboutLinks = [
    { path: '/about', label: 'About DRRC' },
    { path: '/rescue-teams', label: 'Our Teams' },
    { path: '/gallery', label: 'Gallery' },
  ];

  return (
    <footer className="bg-dark-grey border-t border-white/10">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-10 h-10 text-primary" />
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-bold text-foreground">DRRC</span>
                <span className="font-paragraph text-sm text-foreground/60">Disaster Rescue & Response Center</span>
              </div>
            </Link>
            <p className="font-paragraph text-base text-foreground/70 mb-6 max-w-md">
              Dedicated to saving lives and providing critical support during disasters. Available 24/7 for emergency response and rescue operations worldwide.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-foreground/70">
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-paragraph text-sm">Emergency: 911</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/70">
                <Mail className="w-5 h-5 text-primary" />
                <span className="font-paragraph text-sm">contact@drrc.org</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/70">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-paragraph text-sm">Global Operations Center</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Support Us</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">About</h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-paragraph text-sm text-foreground/60">
            © {currentYear} Disaster Rescue & Response Center. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 text-foreground/70 hover:text-primary transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 text-foreground/70 hover:text-primary transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 text-foreground/70 hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 text-foreground/70 hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
