import React from 'react';
import { ArrowRight, Clock, Calendar, PawPrint, Sparkles, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onSelectBlog: (blog: BlogPost) => void;
  onViewAllBlogs: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onSelectBlog,
  onViewAllBlogs,
}) => {
  // Present all 6 curated blog cards matching the user's recommended topics
  const blogs = BLOG_POSTS.slice(0, 6);

  return (
    <section
      id="pet-care-blog"
      className="py-16 sm:py-24 bg-white relative overflow-hidden text-left border-t border-[#FFE8A3]/60 scroll-mt-20"
      aria-labelledby="pet-care-blog-heading"
    >
      <span id="blog" className="sr-only" aria-hidden="true" />
      {/* BACKGROUND DECORATIVE WATERMARKS */}
      <div className="absolute top-12 -right-12 text-[#FFE8A3]/25 pointer-events-none -z-0">
        <PawPrint className="w-56 h-56 rotate-12" />
      </div>
      <div className="absolute -bottom-12 -left-12 text-[#FFE8A3]/20 pointer-events-none -z-0">
        <PawPrint className="w-52 h-52 -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-2xl space-y-2.5">
            {/* Small Pill Label */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D62828]/10 text-[#D62828] text-xs font-black tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D62828]" />
              <span>PETSHOP KNOWLEDGE</span>
            </div>

            {/* Section Title */}
            <h2
              id="pet-care-blog-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B2B2B] tracking-tight leading-[1.15]"
            >
              Pet Care <span className="text-[#D62828]">Blog</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#2B2B2B]/80 font-semibold leading-snug">
              Helpful Tips for Happier, Healthier Pets
            </p>

            <p className="text-xs sm:text-sm text-[#2B2B2B]/65 font-medium leading-relaxed">
              Explore evidence-based nutrition advice, grooming rituals, daily exercise guidelines, and veterinary wellness tips for your dogs and cats.
            </p>
          </div>

          {/* View All Blogs Button */}
          <div className="shrink-0 pt-2 md:pt-0">
            <button
              onClick={onViewAllBlogs}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#FFFDF8] hover:bg-[#D62828] text-[#2B2B2B] hover:text-white font-black text-xs sm:text-sm uppercase tracking-wider border border-[#FFE8A3] hover:border-[#D62828] shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer active:scale-95"
              aria-label="View all pet care articles"
            >
              <BookOpen className="w-4 h-4 text-[#D62828] group-hover:text-white transition-colors" />
              <span>View All Blogs</span>
              <ArrowRight className="w-4 h-4 text-[#D62828] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </button>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 6 CURATED BLOG CARDS GRID (3 cols desktop, 2 tablet, 1 mobile)            */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogs.map((blog, idx) => (
            <article
              key={blog.id}
              onClick={() => onSelectBlog(blog)}
              className="group bg-[#FFFDF8] rounded-[18px] border border-[#FFE8A3]/90 shadow-sm hover:shadow-xl hover:border-[#F4C430] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              <div>
                {/* LARGE FEATURED IMAGE */}
                <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-gray-100">
                  <img
                    src={blog.image}
                    alt={blog.imageAlt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  
                  {/* CATEGORY BADGE */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D62828] text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                      {blog.category}
                    </span>
                  </div>

                  {/* READ TIME BADGE */}
                  <div className="absolute bottom-3 right-3 z-10 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#F4C430]" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* CONTENT AREA */}
                <div className="p-6 sm:p-7 space-y-3 text-left">
                  
                  {/* PUBLICATION DATE */}
                  <div className="flex items-center gap-1.5 text-xs text-[#2B2B2B]/60 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#D62828]" />
                    <time dateTime={blog.publishDate}>{blog.publishDate}</time>
                  </div>

                  {/* BLOG TITLE */}
                  <h3 className="text-lg sm:text-xl font-black text-[#2B2B2B] group-hover:text-[#D62828] transition-colors duration-200 leading-snug line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* SHORT 2-3 LINE DESCRIPTION */}
                  <p className="text-xs sm:text-sm text-[#2B2B2B]/75 font-medium leading-relaxed line-clamp-3">
                    {blog.description}
                  </p>
                </div>
              </div>

              {/* READ MORE BUTTON / LINK */}
              <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#FFE8A3]/50 flex items-center justify-between mt-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBlog(blog);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#D62828] group-hover:text-[#B51F1F] uppercase tracking-wider group/link transition-colors duration-200 cursor-pointer"
                  aria-label={`Read more about ${blog.title}`}
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                </button>

                <span className="text-[11px] font-bold text-[#2B2B2B]/40 group-hover:text-[#F4C430] transition-colors">
                  0{idx + 1}
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
