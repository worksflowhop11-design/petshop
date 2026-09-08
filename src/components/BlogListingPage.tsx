import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowRight,
  Clock,
  Calendar,
  PawPrint,
  Home,
  ChevronRight,
  Filter,
  X,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data/blogData';
import { BlogPost, BlogCategory } from '../types';

interface BlogListingPageProps {
  onBackToHome: (sectionId?: string) => void;
  onSelectBlog: (blog: BlogPost) => void;
}

export const BlogListingPage: React.FC<BlogListingPageProps> = ({
  onBackToHome,
  onSelectBlog,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter blog posts by search query and selected category
  const filteredBlogs = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const displayedBlogs = filteredBlogs.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#2B2B2B] pb-24 text-left">
      
      {/* ========================================================================= */}
      {/* 1. BREADCRUMB NAVIGATION                                                  */}
      {/* ========================================================================= */}
      <div className="bg-[#FFF9EE] border-b border-[#FFE8A3]/80 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#2B2B2B]/70">
          <button
            onClick={() => onBackToHome('hero')}
            className="flex items-center gap-1.5 hover:text-[#D62828] transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-[#D62828]" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#2B2B2B]/40" />
          <span className="text-[#D62828] font-bold">PETSHOP Blog</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BLOG HERO BANNER                                                       */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-r from-[#FFF4DB] via-[#FFFDF8] to-[#FFF4DB] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#FFE8A3] relative overflow-hidden">
        {/* Background Paw Watermarks */}
        <div className="absolute top-6 right-12 text-[#FFE8A3]/30 pointer-events-none -z-0">
          <PawPrint className="w-44 h-44 rotate-12" />
        </div>
        <div className="absolute -bottom-10 left-10 text-[#FFE8A3]/20 pointer-events-none -z-0">
          <PawPrint className="w-40 h-40 -rotate-12" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#D62828]/10 text-[#D62828] text-xs font-black tracking-widest uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D62828]" />
            <span>PET PARENT KNOWLEDGE BASE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B2B2B] tracking-tight">
            PETSHOP <span className="text-[#D62828]">Pet Care</span> &amp;{' '}
            <span className="text-[#F4C430]">Nutrition</span> Blog
          </h1>

          <p className="text-sm sm:text-base text-[#2B2B2B]/75 font-medium max-w-2xl mx-auto leading-relaxed">
            Evidence-based veterinary tips, practical care guides, and nutrition insights to help your beloved companions live healthier, happier, and longer lives.
          </p>

          {/* SEARCH BAR */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#D62828] absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(6);
                }}
                placeholder="Search dog care, cat nutrition, grooming tips..."
                className="w-full pl-12 pr-10 py-3.5 rounded-full bg-white border border-[#FFE8A3] focus:border-[#D62828] focus:ring-2 focus:ring-[#D62828]/20 text-sm font-semibold text-[#2B2B2B] shadow-sm outline-none transition-all placeholder:text-[#2B2B2B]/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-[#2B2B2B]/40 hover:text-[#D62828] p-1 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CATEGORY FILTERS                                                       */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#2B2B2B]/60 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#D62828]" />
            <span>Categories:</span>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setVisibleCount(6);
            }}
            className={`px-4 py-2 rounded-full text-xs font-black tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer shadow-xs ${
              selectedCategory === 'All'
                ? 'bg-[#D62828] text-white shadow-md'
                : 'bg-white text-[#2B2B2B]/75 hover:bg-[#FFE8A3]/40 border border-[#FFE8A3]'
            }`}
          >
            All Articles ({BLOG_POSTS.length})
          </button>

          {BLOG_CATEGORIES.map((cat) => {
            const count = BLOG_POSTS.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(6);
                }}
                className={`px-4 py-2 rounded-full text-xs font-black tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer shadow-xs flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#D62828] text-white shadow-md'
                    : 'bg-white text-[#2B2B2B]/75 hover:bg-[#FFE8A3]/40 border border-[#FFE8A3]'
                }`}
              >
                <span>{cat}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-[#2B2B2B]/60'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BLOG POSTS GRID                                                        */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {displayedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {displayedBlogs.map((blog) => (
              <article
                key={blog.id}
                onClick={() => onSelectBlog(blog)}
                className="group bg-white rounded-[18px] border border-[#FFE8A3] shadow-sm hover:shadow-xl hover:border-[#F4C430] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div>
                  {/* IMAGE */}
                  <div className="relative w-full h-52 overflow-hidden bg-gray-100">
                    <img
                      src={blog.image}
                      alt={blog.imageAlt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* CATEGORY PILL */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#D62828] text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                        {blog.category}
                      </span>
                    </div>

                    {/* READ TIME */}
                    <div className="absolute bottom-3 right-3 z-10 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#F4C430]" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#2B2B2B]/60 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#D62828]" />
                      <time dateTime={blog.publishDate}>{blog.publishDate}</time>
                    </div>

                    <h2 className="text-lg sm:text-xl font-black text-[#2B2B2B] group-hover:text-[#D62828] transition-colors leading-snug line-clamp-2">
                      {blog.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#2B2B2B]/75 font-medium leading-relaxed line-clamp-2">
                      {blog.description}
                    </p>
                  </div>
                </div>

                {/* FOOTER ACTION */}
                <div className="px-6 pb-6 pt-2 border-t border-[#FFE8A3]/50 flex items-center justify-between mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#D62828] group-hover:text-[#B51F1F] uppercase tracking-wider transition-colors duration-200">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                  </span>
                  <span className="text-xs text-[#2B2B2B]/50 font-medium truncate max-w-[120px]">
                    By {blog.author.name.split(' ')[0]}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* EMPTY SEARCH STATE */
          <div className="text-center py-16 bg-white rounded-3xl border border-[#FFE8A3] p-8 max-w-lg mx-auto shadow-sm">
            <PawPrint className="w-14 h-14 text-[#D62828] mx-auto mb-3 opacity-60" />
            <h3 className="text-xl font-black text-[#2B2B2B]">No articles match your criteria</h3>
            <p className="text-sm text-[#2B2B2B]/70 mt-1">
              We couldn’t find any articles matching "{searchQuery}". Try searching for another topic like nutrition, puppies, or grooming.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-5 px-6 py-2.5 rounded-full bg-[#D62828] hover:bg-[#B51F1F] text-white font-black text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* LOAD MORE BUTTON / PAGINATION */}
        {filteredBlogs.length > displayedBlogs.length && (
          <div className="text-center pt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#D62828] hover:bg-[#B51F1F] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>Load More Articles</span>
            </button>
          </div>
        )}

        {/* BOTTOM BACK TO HOME BAR */}
        <div className="mt-16 pt-8 border-t border-[#FFE8A3] text-center">
          <button
            onClick={() => onBackToHome('hero')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#2B2B2B] hover:text-[#D62828] transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4 text-[#D62828]" />
            <span>← Back to PETSHOP Home Page</span>
          </button>
        </div>

      </div>
    </div>
  );
};
