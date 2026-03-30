import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Article, CATEGORIES } from '../types';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [dragWidth, setDragWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          console.error('Fetch failed:', response.status, errData);
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        
        if (data.contents) {
          const mappedArticles: Article[] = data.contents.map((item: any) => ({
            id: item.id,
            title: item.title,
            date: new Date(item.publishedAt || item.createdAt).toLocaleDateString('ja-JP').replace(/\//g, '.'),
            image: item.image?.url || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
            category: item.category?.[0] || 'home'
          }));
          setArticles(mappedArticles);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      setDragWidth(sliderRef.current.scrollWidth - sliderRef.current.offsetWidth);
    }
  }, [articles]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <header className="relative min-h-screen flex flex-col justify-start overflow-hidden pt-48">
        <div className="max-w-screen-2xl w-full mx-auto px-8 md:px-16 mb-8">
          <div className="flex items-center gap-5">
            <div className="w-px h-7 bg-white/30" />
            <span className="font-light text-[1.2rem] tracking-[0.35em] text-white/70">NEW ARTICLE</span>
          </div>
        </div>

        <div className="w-screen overflow-hidden relative pb-24 cursor-grab active:cursor-grabbing">
          <motion.div 
            ref={sliderRef}
            drag="x"
            dragConstraints={{ right: 0, left: -dragWidth }}
            dragElastic={0.1}
            className="flex px-8 md:px-16"
          >
            {articles.map((article) => (
              <div 
                key={article.id} 
                onClick={() => navigate(`/article/${article.id}`)} 
                className="flex-none w-[300px] md:w-[450px] mr-12 group cursor-pointer select-none"
              >
                <div className="w-full aspect-square overflow-hidden bg-[#151921]">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover grayscale brightness-75 transition-all duration-800 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 pointer-events-none"
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

      <section className="flex flex-col items-center text-center px-[10%] pt-40 bg-bg relative">
        <div className="flex flex-col items-center mb-16">
          <div className="text-[13px] tracking-[0.5em] text-white uppercase font-extralight pb-3">About</div>
          <div className="w-[60px] h-px bg-white/60" />
        </div>
        
        <h2 className="brand-logo-styled text-[clamp(4rem,10vw,8rem)] mb-16">Libera</h2>
        <div className="text-[14px] leading-[3] font-extralight tracking-[0.25em] text-white/70 max-w-[800px] mb-32">
          孤独とは、誰にも邪魔されない自由のこと。<br />
          「Libera」は、勉強、音楽、美、そして日々の雫を記録し、<br />
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
                onClick={() => navigate(`/category/${cat.name}`)}
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
              onClick={() => navigate('/category/Study')}
              className="concept-grid-item hover:bg-white/8 hover:before:border-white/50 p-16 md:p-20 flex flex-col items-center text-center group w-full md:w-1/3"
            >
              <div className="text-2xl font-serif italic mb-8 opacity-70 transition-all duration-700 group-hover:text-white">Study</div>
              <p className="text-[9px] text-gray-500 leading-loose tracking-[0.3em] mb-10">孤独な闘い、夜明けを待つペン先。</p>
              <div className="w-10 h-px bg-white/10 group-hover:w-20 group-hover:bg-white transition-all duration-1000" />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
