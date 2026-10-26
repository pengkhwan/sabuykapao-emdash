// src/lib/schema/baseSchema.ts
export interface BaseSchema {
  '@context': string;
  '@type': string;
  '@id'?: string;
  name: string;
  description?: string;
  url?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    '@type': string;
    name: string;
    url?: string;
  };
  publisher?: {
    '@type': string;
    name: string;
    url?: string;
    logo?: {
      '@type': string;
      url: string;
      width?: number;
      height?: number;
    };
  };
}

export interface ProductSchema extends BaseSchema {
  '@type': 'Product';
  sku?: string;
  brand?: {
    '@type': 'Brand';
    name: string;
  };
  offers?: {
    '@type': 'Offer';
    price: number;
    priceCurrency: string;
    availability: string;
    seller?: {
      '@type': 'Organization';
      name: string;
    };
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
  };
  review?: Array<{
    '@type': 'Review';
    author: {
      '@type': 'Person';
      name: string;
    };
    reviewRating: {
      '@type': 'Rating';
      ratingValue: number;
    };
    reviewBody?: string;
  }>;
}

export interface ArticleSchema extends BaseSchema {
  '@type': 'Article';
  headline: string;
  articleBody?: string;
  wordCount?: number;
  articleSection?: string;
  keywords?: string[];
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
}

export interface CollectionPageSchema extends BaseSchema {
  '@type': 'CollectionPage';
  mainEntity?: {
    '@type': 'ItemList';
    numberOfItems?: number;
    itemListElement?: Array<{
      '@type': 'ListItem';
      position: number;
      item: {
        '@type': 'Product';
        name: string;
        url: string;
        image?: string;
        description?: string;
        offers?: {
          '@type': 'Offer';
          price: number;
          priceCurrency: string;
          availability: string;
        };
      };
    }>;
  };
}

export interface BreadcrumbSchema {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface OrganizationSchema {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: {
    '@type': 'ImageObject';
    url: string;
    width?: number;
    height?: number;
  };
  contactPoint?: {
    '@type': 'ContactPoint';
    telephone?: string;
    contactType: string;
    areaServed?: string;
    availableLanguage?: string[];
  };
  address?: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
}
