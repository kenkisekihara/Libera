import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

// --- Types ---
type Category = 'Beauty' | 'Fashion' | 'Food' | 'Drink' | 'Mrs. GREEN APPLE' | 'Events' | 'Study' | 'home';

interface Article {
  id: number;
  title: string;
  date: string;
  image: string;
  category: Category;
}

// --- Mock Data ---
const ARTICLES: Article[] = [
  {
    id: 1,
    title: '人生初の12時間勉強',
    date: '2026.03.25',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    category: 'Study'
  },
  {
    id: 2,
    title: '自分を定義する一着',
    date: '2026.03.22',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800',
    category: 'Fashion'
  },
  {
    id: 3,
    title: 'キャラメルマキアートの誘惑',
    date: '2026.03.18',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    category: 'Drink'
  }
];

const CATEGORIES = [
  { name: 'Beauty', label: '自分を慈しむ、鏡の中の哲学。', color: 'hover:bg-wine-red/12 hover:before:border-wine-red', textColor: 'group-hover:text-red-300', lineColor: 'group-hover:bg-red-300' },
  { name: 'Fashion', label: '纏うものは、意志の表明。', color: 'hover:bg-royal-blue/12 hover:before:border-royal-blue', textColor: 'group-hover:text-blue-300', lineColor: 'group-hover:bg-blue-300' },
  { name: 'Food', label: '啜る熱気、心の奥まで満たす一杯。', color: 'hover:bg-golden-yellow/12 hover:before:border-golden-yellow', textColor: 'group-hover:text-golden-yellow', lineColor: 'group-hover:bg-golden-yellow' },
  { name: 'Drink', label: '氷の音と、溶けてゆく雑念。', color: 'hover:bg-sky-blue/12 hover:before:border-sky-blue', textColor: 'group-hover:text-sky-300', lineColor: 'group-hover:bg-sky-300' },
  { name: 'Mrs. GREEN APPLE', label: '鳴り響く青、人生を彩るファンファーレ。', color: 'hover:bg-deep-green/12 hover:before:border-deep-green', textColor: 'group-hover:text-green-300', lineColor: 'group-hover:bg-green-300' },
  { name: 'Events', label: '刻まれる青春、瞬きの合間の記憶。', color: 'hover:bg-royal-purple/12 hover:before:border-royal-purple', textColor: 'group-hover:text-purple-300', lineColor: 'group-hover:bg-purple-300' },
  { name: 'Study', label: '孤独な闘い、夜明けを待つペン先。', color: 'hover:bg-white/8 hover:before:border-white/50', textColor: 'group-hover:text-white', lineColor: 'group-hover:bg-white' },
];

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<Category>('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (cat: Category) => {
    setCurrentCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bg selection:bg-white/20">
      <div className="grain" />

      {/* --- Navigation --- */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 px-8 md:px-16 transition-all duration-500 flex justify-between items-center ${
          isScrolled 
            ? 'bg-bg/85 backdrop-blur-md py-6 border-b border-white/5' 
            : 'bg-transparent py-10'
        }`}
      >
        <button onClick={() => navigateTo('home')} className="flex flex-col group text-left">
          <span className="brand-logo-styled text-[2.8rem]">Líbera</span>
        </button>

        <div className="hidden md:flex space-x-12 text-[10px] tracking-[0.5em] uppercase items-center font-medium">
          <div className="nav-item group">
            <span>Hobby</span>
            <ChevronDown size={12} strokeWidth={1.5} />
            <div className="dropdown-menu">
              <button onClick={() => navigateTo('Beauty')} className="dropdown-link text-left">Beauty</button>
              <button onClick={() => navigateTo('Fashion')} className="dropdown-link text-left">Fashion</button>
              <button onClick={() => navigateTo('Food')} className="dropdown-link text-left">Food</button>
              <button onClick={() => navigateTo('Drink')} className="dropdown-link text-left">Drink</button>
              <button onClick={() => navigateTo('Mrs. GREEN APPLE')} className="dropdown-link text-left" style={{ textTransform: 'none' }}>Mrs. GREEN APPLE</button>
            </div>
          </div>
          <div className="nav-item group">
            <span>Daily</span>
            <ChevronDown size={12} strokeWidth={1.5} />
            <div className="dropdown-menu">
              <button onClick={() => navigateTo('Events')} className="dropdown-link text-left">Events</button>
              <button onClick={() => navigateTo('Study')} className="dropdown-link text-left">Study</button>
            </div>
          </div>
          <div className="pl-12 relative flex items-center">
            <a href="#" className="contact-btn uppercase">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentCategory === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* --- Hero Slider --- */}
            <header className="relative min-h-screen flex flex-col justify-start overflow-hidden pt-48">
              <div className="max-w-screen-2xl w-full mx-auto px-8 md:px-16 mb-8">
                <div className="flex items-center gap-5">
                  <div className="w-px h-7 bg-white/30" />
                  <span className="font-light text-[1.2rem] tracking-[0.35em] text-white/70">NEW ARTICLE</span>
                </div>
              </div>

              <div className="w-screen overflow-hidden relative pb-24">
                <motion.div 
                  className="flex"
                  animate={{ x: [0, -1494] }} // (450 + 48) * 3 = 1494
                  transition={{ 
                    duration: 30, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  {[...ARTICLES, ...ARTICLES].map((article, idx) => (
                    <div key={`${article.id}-${idx}`} className="flex-none w-[450px] mr-12 group cursor-pointer">
                      <div className="w-full aspect-square overflow-hidden bg-[#151921]">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover grayscale brightness-75 transition-all duration-800 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="mt-6 text-left">
                        <div className="text-white text-lg font-light tracking-widest mb-1">{article.title}</div>
                        <div className="text-gray-400 text-[10px] tracking-[0.3em]">{article.date}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </header>

            {/* --- About Section --- */}
            <section className="flex flex-col items-center text-center px-[10%] pt-40 bg-bg relative">
              <div className="flex flex-col items-center mb-16">
                <div className="text-[13px] tracking-[0.5em] text-white uppercase font-extralight pb-3">About</div>
                <div className="w-[60px] h-px bg-white/60" />
              </div>
              
              <h2 className="brand-logo-styled text-[clamp(4rem,10vw,8rem)] mb-16">Líbera</h2>
              <div className="text-[14px] leading-[3] font-extralight tracking-[0.25em] text-white/70 max-w-[800px] mb-32">
                孤独とは、誰にも邪魔されない自由のこと。<br />
                「Líbera」は、勉強、音楽、美、そして日々の雫を記録し、<br />
                僕だけの世界観を記録的に構築するためのアーカイブ。
              </div>

              <div className="w-full flex flex-col items-center mb-16">
                <div className="w-px h-[280px] bg-gradient-to-b from-transparent via-white/5 to-white relative mb-16 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-white after:rounded-full after:shadow-[0_0_15px_2px_white]" />
              </div>

              <div className="flex flex-col items-center mb-16">
                <div className="text-[13px] tracking-[0.5em] text-white uppercase font-extralight pb-3">Menu</div>
                <div className="w-[60px] h-px bg-white/60" />
              </div>

              <div className="w-full max-w-6xl mx-auto px-8 mt-12 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {CATEGORIES.slice(0, 6).map((cat) => (
                    <div 
                      key={cat.name}
                      onClick={() => navigateTo(cat.name as Category)}
                      className={`concept-grid-item ${cat.color} p-16 md:p-20 flex flex-col items-center text-center group`}
                    >
                      <div className={`text-2xl font-serif italic mb-8 opacity-70 transition-all duration-700 ${cat.textColor}`}>{cat.name}</div>
                      <p className="text-[9px] text-gray-500 leading-loose tracking-[0.3em] mb-10">{cat.label}</p>
                      <div className={`w-10 h-px bg-white/10 group-hover:w-20 transition-all duration-1000 ${cat.lineColor}`} />
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-center">
                  <div 
                    onClick={() => navigateTo('Study')}
                    className="concept-grid-item hover:bg-white/8 hover:before:border-white/50 p-16 md:p-20 flex flex-col items-center text-center group w-full md:w-1/3"
                  >
                    <div className="text-2xl font-serif italic mb-8 opacity-70 transition-all duration-700 group-hover:text-white">Study</div>
                    <p className="text-[9px] text-gray-500 leading-loose tracking-[0.3em] mb-10">孤独な闘い、夜明けを待つペン先。</p>
                    <div className="w-10 h-px bg-white/10 group-hover:w-20 group-hover:bg-white transition-all duration-1000" />
                  </div>
                </div>

                <div className="w-full flex flex-col items-center mt-20">
                  <div className="w-px h-[280px] bg-gradient-to-b from-transparent via-white/5 to-white relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-white after:rounded-full after:shadow-[0_0_15px_2px_white]" />
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="category"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="pt-[180px] pb-[100px] min-h-[80vh]"
          >
            <div className="relative text-center mb-16 select-none pointer-events-none">
              <div className="font-serif italic text-[clamp(6rem,15vw,12rem)] leading-[0.8] text-white/5">
                {currentCategory.toUpperCase()}
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(2rem,5vw,4rem)] text-white tracking-[0.2em] whitespace-nowrap">
                {currentCategory.toUpperCase()}
              </div>
            </div>

            <div className="text-center text-[11px] text-white/40 tracking-[0.3em] mt-[10vh] font-light">
              まだ記事が存在しません。
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-40 text-center">
        <button onClick={() => navigateTo('home')} className="brand-logo-styled text-4xl mb-8 opacity-60 cursor-pointer">Líbera</button>
        <p className="text-[7px] text-gray-700 tracking-[1.2em] uppercase">© 2026 LÍBERA.</p>
      </footer>
    </div>
  );
}
