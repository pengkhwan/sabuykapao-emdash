// src/lib/schema/schemaGenerator.ts
import type { 
  ProductSchema, 
  ArticleSchema, 
  CollectionPageSchema, 
  BreadcrumbSchema,
  OrganizationSchema 
} from './baseSchema.js';

export class SchemaGenerator {
  private baseUrl: string;
  private organization: OrganizationSchema;

  constructor(baseUrl: string = 'https://sabuykapao.com') {
    this.baseUrl = baseUrl;
    this.organization = {
      '@type': 'Organization',
      name: 'SABUYKAPAO',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/sabuykapao-logo.svg`,
        width: 200,
        height: 60
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        areaServed: 'TH',
        availableLanguage: ['Thai', 'English']
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'TH'
      },
      sameAs: [
        'https://www.facebook.com/sabuykapao',
        'https://www.instagram.com/sabuykapao'
      ]
    };
  }

  generateProductSchema(product: {
    name: string;
    description?: string;
    price?: number;
    image?: string;
    slug: string;
    sku?: string;
    brand?: string;
    availability?: string;
  }): ProductSchema {
    const productUrl = `${this.baseUrl}/${product.slug}`;
    
    // Calculate priceValidUntil (1 year from today)
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    const priceValidUntil = nextYear.toISOString().split('T')[0];
    
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': productUrl,
      name: product.name,
      description: product.description || product.name || `เครื่องหนังแท้แฮนด์เมด ${product.name}`,
      url: productUrl,
      image: product.image,
      sku: product.sku,
      brand: {
        '@type': 'Brand',
        name: product.brand || 'SABUYKAPAO'
      },
      offers: product.price ? {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'THB',
        priceValidUntil: priceValidUntil,
        availability: product.availability || 'https://schema.org/InStock',
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'TH',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 7,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn'
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '50',
            currency: 'THB'
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'TH'
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 2,
              unitCode: 'DAY'
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 2,
              maxValue: 5,
              unitCode: 'DAY'
            }
          }
        },
        seller: {
          '@type': 'Organization',
          name: 'SABUYKAPAO'
        }
      } : undefined,
      publisher: this.organization
    };
  }

  generateArticleSchema(article: {
    title: string;
    description?: string;
    content?: string;
    image?: string;
    slug: string;
    publishedAt?: string;
    modifiedAt?: string;
    author?: string;
    keywords?: string[];
  }): ArticleSchema {
    const articleUrl = `${this.baseUrl}/${article.slug}`;
    
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': articleUrl,
      headline: article.title,
      description: article.description,
      url: articleUrl,
      image: article.image,
      datePublished: article.publishedAt,
      dateModified: article.modifiedAt,
      author: {
        '@type': 'Person',
        name: article.author || 'SABUYKAPAO'
      },
      publisher: this.organization,
      articleBody: article.content,
      keywords: article.keywords,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl
      }
    };
  }

  generateCollectionPageSchema(category: {
    name: string;
    description?: string;
    slug: string;
    products: Array<{
      name: string;
      slug: string;
      image?: string;
      price?: number;
      description?: string;
    }>;
  }): CollectionPageSchema {
    const categoryUrl = `${this.baseUrl}/${category.slug}`;
    
    // Calculate priceValidUntil (1 year from today)
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    const priceValidUntil = nextYear.toISOString().split('T')[0];
    
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': categoryUrl,
      name: category.name,
      description: category.description || `เครื่องหนังแท้แฮนด์เมด ${category.name}`,
      url: categoryUrl,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: category.products.length,
        itemListElement: category.products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: product.name,
            url: `${this.baseUrl}/${product.slug}`,
            image: product.image,
            description: product.description || product.name,
            brand: {
              '@type': 'Brand',
              name: 'SABUYKAPAO'
            },
            offers: product.price ? {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'THB',
              priceValidUntil: priceValidUntil,
              availability: 'https://schema.org/InStock',
              hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'TH',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: 7,
                returnMethod: 'https://schema.org/ReturnByMail',
                returnFees: 'https://schema.org/FreeReturn'
              },
              shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                  '@type': 'MonetaryAmount',
                  value: '50',
                  currency: 'THB'
                },
                shippingDestination: {
                  '@type': 'DefinedRegion',
                  addressCountry: 'TH'
                },
                deliveryTime: {
                  '@type': 'ShippingDeliveryTime',
                  handlingTime: {
                    '@type': 'QuantitativeValue',
                    minValue: 1,
                    maxValue: 2,
                    unitCode: 'DAY'
                  },
                  transitTime: {
                    '@type': 'QuantitativeValue',
                    minValue: 2,
                    maxValue: 5,
                    unitCode: 'DAY'
                  }
                }
              }
            } : undefined
          }
        }))
      },
      publisher: this.organization
    };
  }

  generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): BreadcrumbSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: `${this.baseUrl}${breadcrumb.url}`
      }))
    };
  }

  generateOrganizationSchema(): OrganizationSchema {
    return this.organization;
  }

  generateWebSiteSchema(): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${this.baseUrl}/#website`,
      url: this.baseUrl,
      name: 'SABUYKAPAO',
      description: 'เครื่องหนังแท้แฮนด์เมด สั่งทำพิเศษ สลักชื่อได้',
      publisher: this.organization,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${this.baseUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    };
  }
}
