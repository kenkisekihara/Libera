import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-48 pb-40 px-8 md:px-16 max-w-screen-xl mx-auto min-h-screen"
    >
      <Helmet>
        <title>Contact | Libera</title>
      </Helmet>

      <div className="flex items-center gap-5 mb-16">
        <div className="w-px h-7 bg-white/30" />
        <span className="font-light text-[1.2rem] tracking-[0.35em] text-white/70 uppercase">Contact</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
        <div>
          <h1 className="brand-logo-styled text-6xl mb-12">Get in Touch</h1>
          <p className="text-gray-400 font-light tracking-widest leading-loose mb-12">
            「Libera」の世界観や、記録された雫についてのご質問、<br />
            あるいは共鳴する何かを感じた方は、こちらからご連絡ください。
          </p>
          
          <div className="space-y-8">
            <div>
              <div className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-2">Email</div>
              <div className="text-white font-light tracking-widest">info@libera-y.com</div>
            </div>
          </div>
        </div>

        <form className="space-y-12">
          <div className="space-y-2">
            <label className="text-[10px] tracking-[0.5em] text-white/30 uppercase">Name</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-white/10 py-4 text-white font-light tracking-widest focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] tracking-[0.5em] text-white/30 uppercase">Email</label>
            <input 
              type="email" 
              className="w-full bg-transparent border-b border-white/10 py-4 text-white font-light tracking-widest focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] tracking-[0.5em] text-white/30 uppercase">Message</label>
            <textarea 
              rows={4}
              className="w-full bg-transparent border-b border-white/10 py-4 text-white font-light tracking-widest focus:outline-none focus:border-white/40 transition-colors resize-none"
            />
          </div>
          <button className="contact-btn w-full py-6 uppercase tracking-[0.5em] text-[10px]">
            Send Message
          </button>
        </form>
      </div>
    </motion.div>
  );
}
