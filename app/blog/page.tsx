// app/blog/page.tsx
import Link from 'next/link';
import { SITE, POSTS } from '@/config/site';
import JsonLd from '@/src/components/JsonLd';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata = {
  title: '0mg Vaping Guides & Hardware Insights Australia',
  description:
    'Educational articles, hardware breakdowns, Uwell pod maintenance tips, and zero-nicotine sensory guide by Nicotine Free Vapes Australia.',
  alternates: {
    canonical: `https://${SITE.domain}/blog/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function BlogIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://${SITE.domain}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `https://${SITE.domain}/blog/`,
      },
    ],
  };

  return (
    <main id="main" className="min-h-screen bg-slate-950 py-10 sm:py-16 text-slate-100">
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">Blog & Guides</span>
        </nav>

        {/* Single H1 */}
        <div className="mb-12 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Educational Resource Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            0mg Vaping Guides & Technical Hardware Reviews
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            In-depth guides crafted by Australian vape technicians and flavorists. Learn how to maintain open pod systems, master coil longevity, and understand pure zero-nicotine formulations.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/30"
            >
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-slate-100 hover:text-emerald-400 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="p-6 sm:p-8 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">
                  Sydney Tech Team
                </span>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="text-xs font-bold font-mono text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
