// app/sitemap.ts
import { MetadataRoute } from 'next';
import { SITE, CATEGORIES, PRODUCTS, POSTS } from '@/config/site';

export async function generateSitemaps() {
  return [
    { id: 'pages' },
    { id: 'products' },
    { id: 'categories' },
    { id: 'blog' },
  ];
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${SITE.domain}`;
  const now = new Date();

  if (id === 'pages') {
    return [
      {
        url: `${baseUrl}/`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/shop/`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/faq/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/wholesale/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/search/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/blog/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ];
  }

  if (id === 'products') {
    return PRODUCTS.map((product) => ({
      url: `${baseUrl}/shop/${product.category}/${product.slug}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
      images: product.images.map((img) => `${baseUrl}/images/${img}`),
    }));
  }

  if (id === 'categories') {
    return CATEGORIES.map((category) => ({
      url: `${baseUrl}/shop/${category.slug}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  }

  if (id === 'blog') {
    return POSTS.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  }

  return [];
}
