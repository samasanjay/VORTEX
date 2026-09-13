import React, { useEffect } from 'react';
import { SITE_URL, DEFAULT_SEO } from '../config/seo';

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const updateOrCreateMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const updateOrCreateLinkTag = (rel: string, href: string) => {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

export const SEO: React.FC<SEOProps> = ({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  canonical = DEFAULT_SEO.canonical,
  keywords = DEFAULT_SEO.keywords,
  ogImage = DEFAULT_SEO.ogImage,
  ogType = DEFAULT_SEO.ogType,
  noindex = false,
  schema,
}) => {
  useEffect(() => {
    // 1. Title
    const formattedTitle = title.includes('WORKVORTEX') ? title : `${title} — WORKVORTEX`;
    document.title = formattedTitle;

    // 2. Primary Meta Tags
    updateOrCreateMetaTag('name', 'description', description);
    updateOrCreateMetaTag('name', 'keywords', keywords);
    updateOrCreateMetaTag(
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    // 3. Canonical URL
    const cleanCanonical = canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`;
    updateOrCreateLinkTag('canonical', cleanCanonical);

    // 4. Open Graph Tags
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;
    updateOrCreateMetaTag('property', 'og:site_name', DEFAULT_SEO.siteName);
    updateOrCreateMetaTag('property', 'og:type', ogType);
    updateOrCreateMetaTag('property', 'og:title', formattedTitle);
    updateOrCreateMetaTag('property', 'og:description', description);
    updateOrCreateMetaTag('property', 'og:url', cleanCanonical);
    updateOrCreateMetaTag('property', 'og:image', fullOgImage);
    updateOrCreateMetaTag('property', 'og:locale', DEFAULT_SEO.locale);

    // 5. Twitter / X Card Tags
    updateOrCreateMetaTag('name', 'twitter:card', DEFAULT_SEO.twitterCard);
    updateOrCreateMetaTag('name', 'twitter:title', formattedTitle);
    updateOrCreateMetaTag('name', 'twitter:description', description);
    updateOrCreateMetaTag('name', 'twitter:image', fullOgImage);
    updateOrCreateMetaTag('name', 'twitter:creator', DEFAULT_SEO.twitterCreator);

    // 6. JSON-LD Structured Data
    const scriptId = 'dynamic-seo-json-ld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Optional cleanup on unmount if needed
    };
  }, [title, description, canonical, keywords, ogImage, ogType, noindex, schema]);

  return null;
};
