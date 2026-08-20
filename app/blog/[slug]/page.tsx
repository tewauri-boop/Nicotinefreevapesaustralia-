// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SITE, POSTS } from '@/config/site';
import JsonLd from '@/src/components/JsonLd';
import { Calendar, Clock, ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export async function generateStaticParams() {
  return POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | ${SITE.name}`,
    description: post.excerpt,
    alternates: {
      canonical: `https://${SITE.domain}/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: `${post.date}T00:00:00.000Z`,
      authors: [SITE.name],
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const blogSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: `${post.date}T00:00:00.000Z`,
      dateModified: new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: SITE.name,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE.name,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://${SITE.domain}/blog/${post.slug}/`,
      },
    },
    {
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
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `https://${SITE.domain}/blog/${post.slug}/`,
        },
      ],
    },
  ];

  return (
    <main id="main" className="min-h-screen bg-slate-950 py-10 sm:py-16 text-slate-100">
      <JsonLd data={blogSchema} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog/" className="hover:text-emerald-400 transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold truncate max-w-xs">{post.title}</span>
        </nav>

        <Link
          href="/blog/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all guides</span>
        </Link>

        {/* Article Header */}
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          {/* Exactly One H1 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed border-l-2 border-emerald-500 pl-4">
            {post.excerpt}
          </p>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-100 prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300 prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline bg-slate-900/60 p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
          <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed">
            {post.content}
          </div>

          {/* Callout Box */}
          <div className="not-prose my-8 p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Explore Zero-Nicotine Hardware in Australia</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Looking for authentic Uwell Caliburn pod devices, sub-ohm replacement coils, or lab-tested 0mg disposable vapes? Browse our certified Australian inventory with same-day Sydney dispatch.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/shop/disposable-0mg-vapes/"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors"
              >
                Shop 0mg Disposables
              </Link>
              <Link
                href="/shop/refillable-pod-systems/"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
              >
                Browse Pod Systems
              </Link>
            </div>
          </div>
        </article>

        {/* Post Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex items-center justify-between">
          <Link
            href="/blog/"
            className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </Link>
          <Link
            href="/shop/"
            className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Visit 0mg Store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
