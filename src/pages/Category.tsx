import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { Article } from '../types';

export default function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const decodedCategory = decodeURIComponent(categoryName || '');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          console.error('Fetch failed:', response.status, errData);
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        
        if (data.contents) {
          const getCategoryName = (cat: any) => {
            if (!cat) return 'home';
            if (typeof cat === 'string') return cat;
            if (Array.isArray(cat)) return typeof cat[0] === 'string' ? cat[0] : (cat[0]?.name || 'home');
            return cat.name || 'home';
          };

          const mappedArticles: Article[] = data.contents
            .map((item: any) => ({
              id: item.id,
              title: item.title,
              date: new Date(item.publishedAt || item.createdAt).toLocaleDateString('ja-JP').replace(/\//g, '.'),
              image: item.image?.url || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
              category: getCategoryName(item.category)
            }))
            .filter((article: Article) => 
              decodedCategory === 'home' ? true : article.category.toLowerCase() === decodedCategory.toLowerCase()
            );
          setArticles(mappedArticles);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [categoryName]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-[180px] pb-[100px] min-h-[80vh] px-8 md:px-16"
    >
      <div className="relative text-center mb-24 select-none pointer-events-none">
        <div className="font-serif italic text-[clamp(6rem,15vw,12rem)] leading-[0.8] text-white/5">
          {decodedCategory.toUpperCase()}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(2rem,5vw,4rem)] text-white tracking-[0.2em] whitespace-nowrap">
          {decodedCategory.toUpperCase()}
        </div>
      </div>

      {loading ? (
        <div className="text-center text-white/20 tracking-widest uppercase text-[10px]">Loading...</div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
          {articles.map((article) => (
            <Link key={article.id} to={`/article/${article.id}`} className="group">
              <div className="aspect-square overflow-hidden bg-[#151921] mb-6">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <h3 className="text-white text-lg font-light tracking-widest mb-2 group-hover:text-white/80 transition-colors">{article.title}</h3>
                <p className="text-gray-500 text-[10px] tracking-[0.3em]">{article.date}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-[11px] text-white/40 tracking-[0.3em] mt-[10vh] font-light">
          まだ記事が存在しません。
        </div>
      )}
    </motion.div>
  );
}
