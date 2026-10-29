import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-modina-text flex flex-col items-center justify-center px-6 pt-[112px] sm:pt-[72px] public-page">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center"
      >
        {/* Ghost 404 */}
        <p aria-hidden="true" className="font-display font-bold text-modina-divider leading-none select-none tracking-tight" style={{ fontSize: 'clamp(120px, 20vw, 280px)' }}>
          404
        </p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
          className="w-24 h-0.5 bg-modina-red mx-auto -mt-6 mb-10"
        />

        <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4 public-meta">
          — Page Not Found
        </p>

        <h1 className="font-display font-bold text-modina-heading tracking-tight leading-tight mb-6 public-article-title" >
          This Page Does<br />Not Exist
        </h1>

        <p className="text-modina-muted text-base leading-relaxed max-w-md mb-12 public-body">
          The page you are looking for may have been moved, renamed, or is temporarily unavailable. Return to the homepage to continue.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/" className="btn-primary gap-3">
            <Home className="w-4 h-4" />
            Return Home
          </Link>
          <Link to="/products" className="btn-secondary gap-3">
            View Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col items-center gap-3 mt-20">
          <span className="w-px h-10 bg-modina-border" />
          <p className="text-modina-subtle text-xs font-medium uppercase tracking-widest public-meta">Modina Rim &amp; Parts Ltd.</p>
        </div>
      </motion.div>
    </div>
  );
}
