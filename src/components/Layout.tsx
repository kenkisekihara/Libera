import { useState, useEffect, ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  }, [location.pathname]);

  const categories = {
    Hobby: ['Beauty', 'Fashion', 'Food', 'Drink', 'Mrs. GREEN APPLE'],
    Daily: ['Events', 'Study']
  };

  return (
    <div className="min-h-screen bg-bg selection:bg-white/20">
      <div className="grain" />

      <nav 
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-16 transition-all duration-500 flex justify-between items-center ${
          isScrolled 
            ? 'bg-bg/85 backdrop-blur-md py-4 md:py-6' 
            : 'bg-transparent py-8 md:py-10'
        }`}
      >
        <Link to="/" className="flex flex-col group text-left">
          <span className="brand-logo-styled text-[2rem] md:text-[2.8rem]">Libera</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 text-[10px] tracking-[0.5em] uppercase items-center font-medium">
          <div className="nav-item group">
            <span>Hobby</span>
            <ChevronDown size={12} strokeWidth={1.5} />
            <div className="dropdown-menu">
              {categories.Hobby.map((cat) => (
                <Link key={cat} to={`/category/${cat}`} className="dropdown-link text-left" style={cat === 'Mrs. GREEN APPLE' ? { textTransform: 'none' } : {}}>
                  {cat}
                </Link>
              ))}
            </div>
          </div>
          <div className="nav-item group">
            <span>Daily</span>
            <ChevronDown size={12} strokeWidth={1.5} />
            <div className="dropdown-menu">
              {categories.Daily.map((cat) => (
                <Link key={cat} to={`/category/${cat}`} className="dropdown-link text-left">
                  {cat}
                </Link>
              ))}
            </div>
          </div>
          <div className="pl-12 relative flex items-center">
            <Link to="/contact" className="contact-btn uppercase">
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white/60 hover:text-white transition-colors p-2"
        >
          {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-bg pt-32 px-8 flex flex-col"
          >
            <div className="space-y-12">
              <div>
                <div className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-6">Hobby</div>
                <div className="grid grid-cols-1 gap-4">
                  {categories.Hobby.map((cat) => (
                    <Link key={cat} to={`/category/${cat}`} className="text-lg font-light tracking-widest text-white/80 hover:text-white transition-colors">
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-6">Daily</div>
                <div className="grid grid-cols-1 gap-4">
                  {categories.Daily.map((cat) => (
                    <Link key={cat} to={`/category/${cat}`} className="text-lg font-light tracking-widest text-white/80 hover:text-white transition-colors">
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="pt-8 border-t border-white/5">
                <Link to="/contact" className="text-lg font-light tracking-[0.3em] text-white uppercase">
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      <footer className="py-40 text-center flex flex-col items-center">
        <Link to="/" className="brand-logo-styled text-4xl mb-8 opacity-60 cursor-pointer">Libera</Link>
        <div className="flex space-x-8 mb-12">
          <Link to="/contact" className="text-[9px] tracking-[0.5em] uppercase text-white/30 hover:text-white transition-colors">Contact</Link>
        </div>
        <p className="text-[7px] text-gray-700 tracking-[1.2em] uppercase">© 2026 LIBERA.</p>
      </footer>
    </div>
  );
}
