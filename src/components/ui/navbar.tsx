
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-apple py-4 px-6 lg:px-10',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent',
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a 
            href="/" 
            className="text-2xl font-bold text-seftec-navy flex items-center"
          >
            <span className="mr-1 animate-fade-in">Seftec</span>
            <span className="text-seftec-gold animate-fade-in animate-delay-200">.Store</span>
          </a>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <NavCta />
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-seftec-navy p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 pt-20 px-6 transition-all duration-300 ease-apple",
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-8">
          <NavLinks onClick={() => setIsMobileMenuOpen(false)} />
          <NavCta />
        </nav>
      </div>
    </header>
  );
};

const NavLinks: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <>
      <a
        href="#features"
        className="text-seftec-navy/90 hover:text-seftec-navy font-medium transition-all duration-300"
        onClick={onClick}
      >
        Features
      </a>
      <a
        href="#solutions"
        className="text-seftec-navy/90 hover:text-seftec-navy font-medium transition-all duration-300"
        onClick={onClick}
      >
        Solutions
      </a>
      <a
        href="#about"
        className="text-seftec-navy/90 hover:text-seftec-navy font-medium transition-all duration-300"
        onClick={onClick}
      >
        About
      </a>
    </>
  );
};

const NavCta: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="outline"
        className="border-seftec-navy text-seftec-navy hover:bg-seftec-navy hover:text-white transition-all duration-300 custom-btn"
      >
        Sign In
      </Button>
      <Button
        className="bg-seftec-navy text-white hover:bg-seftec-navy/90 transition-all duration-300 custom-btn"
      >
        Book a Demo
      </Button>
    </div>
  );
};

export default Navbar;
