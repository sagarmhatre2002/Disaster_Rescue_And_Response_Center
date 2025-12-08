import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMember } from '@/integrations';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, actions } = useMember();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/disasters', label: 'Disasters' },
    { path: '/emergency-guide', label: 'Emergency Guide' },
    { path: '/rescue-teams', label: 'Rescue Teams' },
    { path: '/safe-zone-map', label: 'Safe Zone Map' },
    { path: '/sos', label: 'SOS' },
    { path: '/donation', label: 'Donate' },
    { path: '/volunteer', label: 'Volunteer' },
    { path: '/contacts', label: 'Contacts' },
    { path: '/awareness', label: 'Awareness' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <AlertTriangle className="w-8 h-8 text-primary" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold text-foreground">DRRC</span>
              <span className="font-paragraph text-xs text-foreground/60">Disaster Response</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-sm px-3 py-2 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="border-primary/30 text-foreground hover:bg-primary/10">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={actions.logout}
                  size="sm"
                  variant="ghost"
                  className="text-foreground/80 hover:text-foreground"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={actions.login}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Login / Register
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-background/98 backdrop-blur-md"
          >
            <nav className="px-4 py-4 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-paragraph text-sm px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-primary/30 text-foreground">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        actions.logout();
                        setIsMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full text-foreground/80"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      actions.login();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Login / Register
                  </Button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
