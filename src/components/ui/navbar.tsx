
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import DarkModeToggle from '@/components/ui/dark-mode-toggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // This would normally be from authentication
    // For demo purposes, we'll just set a name
    setUserName("Guest");

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm dark:bg-seftec-darkNavy/90' : 'py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold flex items-center text-seftec-navy dark:text-white"
        >
          <Shield className="h-6 w-6 mr-2 text-seftec-gold" />
          Seftec<span className="text-seftec-gold">.Store</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-seftec-navy/80 hover:text-seftec-navy transition-colors duration-300 dark:text-white/80 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {userName && (
              <div className="text-sm text-seftec-navy/80 dark:text-white/80 animate-fade-in">
                <span className="font-normal">Welcome,</span> <span className="font-medium">{userName}</span>
              </div>
            )}
            
            <div className="security-badge">
              <Shield size={16} className="animate-pulse" />
              <span className="text-white">Secured by AI</span>
            </div>

            <DarkModeToggle />

            <Button
              variant="outline"
              className="border-seftec-navy text-seftec-navy hover:bg-seftec-navy/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
              Log In
            </Button>
            
            <Button
              className="bg-gradient-teal-purple hover:opacity-90 text-white custom-btn relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 overflow-hidden">
                <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-20 group-hover:animate-sparkle bg-white"></span>
              </span>
            </Button>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <DarkModeToggle />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 bg-white shadow-md dark:bg-seftec-darkNavy animate-fade-in">
          <div className="container mx-auto px-6">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-seftec-navy/80 hover:text-seftec-navy py-2 transition-colors duration-300 dark:text-white/80 dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full border-seftec-navy text-seftec-navy hover:bg-seftec-navy/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                >
                  Log In
                </Button>
                <Button
                  className="w-full bg-gradient-teal-purple hover:opacity-90 text-white"
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default Navbar;
