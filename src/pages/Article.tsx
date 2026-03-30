import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Article } from '../types';

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          console.error('Fetch failed:', response.status, errData);
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        const found = data.contents.find((item: any) => item.id === id);
        if (found) {
          const getCategoryName = (cat: any) => {
            if (!cat) return 'home';
            if (typeof cat === 'string') return cat;
            if (Array.isArray(cat)) return typeof cat[0] === 'string' ? cat[0] : (cat[0]?.name || 'home');
            return cat.name || 'home';
          };

          setArticle({
            id: found.id,
            title: found.title,
            date: new Date(found.publishedAt || found.createdAt).toLocaleDateString('ja-JP').replace(/\//g, '.'),
            image: found.image?.url,
            category: getCategoryName(found.category),
            content: found.content || found.body || ''
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <div className="pt-48 text-center text-white/20">Loading...</div>;
  if (!article) return <div className="pt-48 text-center text-white/20">Article not found.</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-48 pb-32 px-8 md:px-16 max-w-4xl mx-auto"
    >
      <Helmet>
        <title>{article.title} | Libera</title>
        <meta name="description" content={article.content?.substring(0, 120).replace(/<[^>]*>?/gm, '') + '...'} />
        <meta property="og:title" content={`${article.title} | Libera`} />
        <meta property="og:description" content={article.content?.substring(0, 120).replace(/<[^>]*>?/gm, '') + '...'} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        {article.image && <meta property="og:image" content={article.image} />}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="mb-12 text-center">
        <div className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-4">{article.category}</div>
        <h1 className="text-3xl md:text-5xl font-light text-white tracking-widest leading-tight mb-6">{article.title}</h1>
        <div className="text-[11px] tracking-[0.2em] text-white/60">{article.date}</div>
      </div>
      
      <div className="aspect-video w-full overflow-hidden mb-16">
        <img src={article.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>

      <div 
        className="text-white/80 leading-relaxed tracking-wider font-light text-lg article-content"
        dangerouslySetInnerHTML={{ __html: article.content || '' }}
      />

      <div className="mt-32 text-center">
        <Link to="/" className="inline-block px-12 py-4 border border-white/60 text-[10px] tracking-[0.5em] uppercase text-white/90 hover:text-white hover:border-white transition-all duration-300">Back Home</Link>
      </div>
    </motion.div>
  );
}
