import { useState, useEffect, ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
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
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-bg selection:bg-white/20">
      <div className="grain" />

      <nav 
        className={`fixed top-0 left-0 w-full z-50 px-8 md:px-16 transition-all duration-500 flex justify-between items-center ${
          isScrolled 
            ? 'bg-bg/85 backdrop-blur-md py-6 border-b border-white/5' 
            : 'bg-transparent py-10'
        }`}
      >
        <Link to="/" className="flex flex-col group text-left">
          <span className="brand-logo-styled text-[2.8rem]">Libera</span>
        </Link>

        <div className="hidden md:flex space-x-12 text-[10px] tracking-[0.5em] uppercase items-center font-medium">
          <div className="nav-item group">
            <span>Hobby</span>
            <ChevronDown size={12} strokeWidth={1.5} />
            <div className="dropdown-menu">
              {['Beauty', 'Fashion', 'Food', 'Drink', 'Mrs. GREEN APPLE'].map((cat) => (
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
              {['Events', 'Study'].map((cat) => (
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
      </nav>

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
