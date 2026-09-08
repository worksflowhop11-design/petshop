import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  PawPrint,
  Sparkles,
  Award,
  ArrowRight
} from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/blogData';

interface BlogArticlePageProps {
  blog: BlogPost;
  onBackToBlogs: () => void;
  onBackToHome: (sectionId?: string) => void;
  onSelectRelatedBlog: (blog: BlogPost) => void;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({
  blog,
  onBackToBlogs,
  onBackToHome,
  onSelectRelatedBlog,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Find related blogs in same category or other featured blogs
  const relatedBlogs = BLOG_POSTS.filter((b) => b.id !== blog.id).slice(0, 3);

  return (
    <article className="min-h-screen bg-[#FFFDF8] text-[#2B2B2B] pb-24 text-left">
      
      {/* ========================================================================= */}
      {/* 1. BREADCRUMB NAVIGATION                                                  */}
      {/* ========================================================================= */}
      <div className="bg-[#FFF9EE] border-b border-[#FFE8A3]/80 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-center flex-wrap gap-2 text-xs sm:text-sm font-semibold text-[#2B2B2B]/70">
          <button
            onClick={() => onBackToHome('hero')}
            className="flex items-center gap-1.5 hover:text-[#D62828] transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-[#D62828]" />
            <span>Home</span>
          </button>
          
          <ChevronRight className="w-3.5 h-3.5 text-[#2B2B2B]/40" />
          
          <button
            onClick={onBackToBlogs}
            className="hover:text-[#D62828] transition-colors cursor-pointer"
          >
            Blogs
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-[#2B2B2B]/40" />

          <span className="text-[#D62828] font-bold truncate max-w-[200px] sm:max-w-xs">
            {blog.title}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ARTICLE HEADER                                                         */}
      {/* ========================================================================= */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 space-y-5">
        
        {/* TOP META ROW */}
        <div className="flex items-center flex-wrap justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#D62828] text-white text-xs font-black uppercase tracking-wider shadow-sm">
              {blog.category}
            </span>
            <span className="text-xs text-[#2B2B2B]/60 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#F4C430]" />
              {blog.readTime}
            </span>
          </div>

          {/* SHARE BUTTON */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#FFE8A3] text-xs font-bold text-[#2B2B2B] hover:text-[#D62828] hover:border-[#D62828] transition-all cursor-pointer shadow-xs"
            aria-label="Share article"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#D62828]" />
                <span>Share Guide</span>
              </>
            )}
          </button>
        </div>

        {/* ARTICLE H1 TITLE */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B2B2B] tracking-tight leading-[1.2]">
          {blog.title}
        </h1>

        {/* AUTHOR & DATE BAR */}
        <div className="flex items-center gap-4 pt-2 border-b border-[#FFE8A3]/80 pb-6">
          <div className="w-12 h-12 rounded-full bg-[#D62828] text-white flex items-center justify-center font-black text-base shadow-sm">
            {blog.author.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-black text-[#2B2B2B] flex items-center gap-1.5">
              <span>{blog.author.name}</span>
              <Award className="w-3.5 h-3.5 text-[#F4C430]" />
            </p>
            <p className="text-xs text-[#2B2B2B]/60 font-medium">
              {blog.author.role} • <time dateTime={blog.publishDate}>{blog.publishDate}</time>
            </p>
          </div>
        </div>

      </header>

      {/* ========================================================================= */}
      {/* 3. HERO IMAGE                                                             */}
      {/* ========================================================================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="rounded-3xl overflow-hidden border-2 border-[#FFE8A3] shadow-lg bg-white relative">
          <img
            src={blog.image}
            alt={blog.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. ARTICLE BODY CONTENT                                                   */}
      {/* ========================================================================= */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-[#2B2B2B]">
        
        {/* LEAD INTRO */}
        <p className="text-base sm:text-lg text-[#2B2B2B]/85 font-medium leading-relaxed bg-[#FFF9EE] p-6 rounded-2xl border-l-4 border-[#D62828]">
          {blog.content.intro}
        </p>

        {/* SECTIONS */}
        {blog.content.sections.map((sec, idx) => (
          <section key={idx} className="space-y-4 pt-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] tracking-tight">
              {sec.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#2B2B2B]/80 font-normal leading-relaxed">
              {sec.body}
            </p>

            {sec.bulletPoints && (
              <ul className="space-y-2.5 pt-2 pl-2">
                {sec.bulletPoints.map((bp, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#2B2B2B]/85 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#D62828] mt-2 shrink-0" />
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* KEY TAKEAWAYS BOX */}
        {blog.content.keyTakeaways && (
          <div className="my-10 p-6 sm:p-8 bg-gradient-to-r from-[#FFF4DB] via-[#FFFDF8] to-[#FFF4DB] rounded-3xl border-2 border-[#F4C430] shadow-md space-y-4">
            <div className="flex items-center gap-2 text-[#D62828] font-black text-sm uppercase tracking-wider">
              <Sparkles className="w-5 h-5 text-[#D62828]" />
              <span>Veterinary Key Takeaways</span>
            </div>
            <ul className="space-y-3">
              {blog.content.keyTakeaways.map((takeaway, tIdx) => (
                <li key={tIdx} className="flex items-start gap-3 text-sm sm:text-base font-semibold text-[#2B2B2B]">
                  <span className="w-5 h-5 rounded-full bg-[#D62828] text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CONCLUSION */}
        <div className="pt-4 border-t border-[#FFE8A3]/80 space-y-3">
          <h3 className="text-lg sm:text-xl font-black text-[#2B2B2B]">
            Final Thoughts for Pet Parents
          </h3>
          <p className="text-sm sm:text-base text-[#2B2B2B]/80 leading-relaxed font-normal">
            {blog.content.conclusion}
          </p>
        </div>

        {/* AUTHOR BIO CARD */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-[#FFE8A3] shadow-sm flex flex-col sm:flex-row items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#D62828] text-white flex items-center justify-center text-xl font-black shrink-0 shadow-md">
            {blog.author.name.charAt(0)}
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-black text-[#2B2B2B]">
              Written by {blog.author.name}
            </h4>
            <p className="text-xs font-bold text-[#D62828] uppercase tracking-wider">
              {blog.author.role}
            </p>
            <p className="text-xs text-[#2B2B2B]/70 leading-relaxed pt-1">
              Passionate about animal wellness, species-appropriate nutritional formulations, and guiding pet parents through evidence-based dietary recommendations.
            </p>
          </div>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="pt-10 flex items-center justify-between flex-wrap gap-4 border-t border-[#FFE8A3]">
          <button
            onClick={onBackToBlogs}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#D62828] hover:text-white border border-[#FFE8A3] text-[#2B2B2B] font-black text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to All Blogs</span>
          </button>

          <button
            onClick={() => onBackToHome('hero')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#FFF9EE] hover:bg-[#FFE8A3] text-[#2B2B2B] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 text-[#D62828]" />
            <span>PETSHOP Home</span>
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. RELATED ARTICLES SECTION                                               */}
      {/* ========================================================================= */}
      <aside className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t-2 border-[#FFE8A3]/70">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-black text-[#D62828] tracking-widest uppercase">
            CONTINUE READING
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#2B2B2B]">
            Related Pet Care Guides
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedBlogs.map((item) => (
            <article
              key={item.id}
              onClick={() => {
                onSelectRelatedBlog(item);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group bg-white rounded-[18px] border border-[#FFE8A3] shadow-sm hover:shadow-lg hover:border-[#F4C430] hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-44 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D62828] text-white text-[10px] font-black uppercase">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-semibold text-[#2B2B2B]/60 block">
                    {item.publishDate}
                  </span>
                  <h4 className="text-base font-black text-[#2B2B2B] group-hover:text-[#D62828] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#2B2B2B]/75 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 mt-auto">
                <span className="inline-flex items-center gap-1 text-xs font-black text-[#D62828] group-hover:text-[#B51F1F]">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </aside>

    </article>
  );
};
