// src/lib/schema/mapArticleToSchema.js
/**
 * Reusable function to transform raw article/blog data into Schema.org BlogPosting format
 * Ensures consistency across all content listing pages
 * 
 * @param {Object} article - Raw article data from CMS
 * @param {string} article.title - Article title (headline)
 * @param {Object} article.slug - Article slug object
 * @param {string} article.slug.current - Article slug string
 * @param {string} [article.excerpt] - Article excerpt/description
 * @param {Object} [article.featuredImage] - Featured image object
 * @param {string} [article.publishedAt] - Published date (ISO format)
 * @param {string} [article._updatedAt] - Updated date (ISO format)
 * @param {string} [article._createdAt] - Created date (ISO format)
 * @param {Object} [article.author] - Author object (optional)
 * @param {string} [article.author.name] - Author name (optional)
 * @param {Function} urlForImage - Function to generate image URL (from sanityImageUrl)
 * @param {string} site - Base site URL (e.g., 'https://sabuykapao.com')
 * @returns {Object} Schema-ready blog object
 */
export function mapArticleToSchema(article, urlForImage, site = 'https://sabuykapao.com') {
  // ✅ Null Safety: Validate required fields
  if (!article?.title || !article?.slug?.current) {
    console.warn('⚠️ Schema Warning: Invalid article data (missing title or slug):', article);
    return null; // Return null to indicate failure
  }
  
  const cleanSite = site.endsWith('/') ? site.slice(0, -1) : site;
  
  // Generate image URL (400x400 for schema)
  let imageUrl;
  if (article.featuredImage && urlForImage) {
    imageUrl = urlForImage(article.featuredImage)
      .width(400)
      .height(400)
      .fit('crop')
      .format('webp')
      .quality(90)
      .url();
  }
  
  // Date handling - prefer publishedAt, fallback to _createdAt
  const datePublished = article.publishedAt || article._createdAt;
  const dateModified = article._updatedAt || article.publishedAt || article._createdAt;
  
  // Author handling - use author name if available, otherwise default to organization
  const authorName = article.author?.name || 'SabuyKapao';
  
  /** @type {{type: "blog", title: string, url: string, image: string | undefined, description: string, datePublished: string | undefined, dateModified: string | undefined, authorName: string}} */
  const schemaBlog = {
    type: /** @type {"blog"} */ ("blog"),
    title: article.title,
    url: `/${article.slug?.current}`,
    image: imageUrl,
    description: article.excerpt || article.title || '',
    datePublished: datePublished,
    dateModified: dateModified,
    authorName: authorName,
  };
  
  return schemaBlog;
}

/**
 * Map multiple articles to schema format (for ItemList)
 * Handles pagination by only mapping the articles provided
 * 
 * @param {Array} articles - Array of articles from CMS (already paginated)
 * @param {Function} urlForImage - Function to generate image URL
 * @param {string} site - Base site URL
 * @param {number} limit - Maximum items to include in schema (default: 16)
 * @returns {Array} Array of schema-ready blog objects
 */
export function mapArticlesToSchema(articles, urlForImage, site = 'https://sabuykapao.com', limit = 16) {
  if (!Array.isArray(articles) || articles.length === 0) {
    return [];
  }
  
  // Only take first {limit} items for schema (SEO best practice)
  // ✅ Null Safety: Filter out invalid articles that failed validation
  return articles
    .slice(0, limit)
    .map(article => mapArticleToSchema(article, urlForImage, site))
    .filter(Boolean); // Remove null entries from failed validations
}
