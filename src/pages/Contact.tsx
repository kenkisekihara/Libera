import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Contact form error:', error);
      setStatus('error');
      setErrorMessage(error.message || '予期せぬエラーが発生しました。');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-[180px] pb-[100px] min-h-[80vh] px-8 md:px-16 max-w-2xl mx-auto"
    >
      <div className="relative text-center mb-24 select-none pointer-events-none">
        <div className="font-serif italic text-[clamp(6rem,15vw,12rem)] leading-[0.8] text-white/5">
          CONTACT
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(2rem,5vw,4rem)] text-white tracking-[0.2em] whitespace-nowrap">
          CONTACT
        </div>
      </div>

      {status === 'success' ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="text-white text-xl font-light tracking-widest mb-8">お問い合わせありがとうございます。</div>
          <p className="text-white/60 text-sm tracking-wider mb-12">メッセージは正常に送信されました。内容を確認次第、ご連絡いたします。</p>
          <Link to="/" className="text-[10px] tracking-[0.5em] uppercase text-white/60 hover:text-white transition-colors border-b border-white/20 pb-1">Back to Home</Link>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-4">
            <label className="block text-[10px] tracking-[0.4em] text-white/40 uppercase">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent border-b border-white/10 py-4 text-white font-light tracking-widest focus:outline-none focus:border-white/40 transition-colors"
              placeholder="お名前"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] tracking-[0.4em] text-white/40 uppercase">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b border-white/10 py-4 text-white font-light tracking-widest focus:outline-none focus:border-white/40 transition-colors"
              placeholder="メールアドレス"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] tracking-[0.4em] text-white/40 uppercase">Message</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-transparent border-b border-white/10 py-4 text-white font-light tracking-widest focus:outline-none focus:border-white/40 transition-colors resize-none"
              placeholder="お問い合わせ内容"
            />
          </div>

          {status === 'error' && (
            <div className="text-red-400 text-[11px] tracking-widest text-center">{errorMessage}</div>
          )}

          <div className="pt-8 flex justify-center">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="group relative px-16 py-6 overflow-hidden border border-white/10 transition-all hover:border-white/40 disabled:opacity-50"
            >
              <span className="relative z-10 text-[11px] tracking-[0.6em] text-white uppercase font-light">
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </span>
              <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
