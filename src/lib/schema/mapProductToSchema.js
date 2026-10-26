// src/lib/schema/mapProductToSchema.js
/**
 * Reusable function to transform raw product data into Schema.org Product format
 * Ensures consistency across all category pages
 * 
 * @param {Object} product - Raw product data from CMS
 * @param {string} product.name - Product name
 * @param {string} product.slug - Product slug for URL generation
 * @param {string} product.imageUrl - Product image URL
 * @param {number} [product.price] - Product price (optional)
 * @param {string} [product.shortDescription] - Product description (optional)
 * @param {string} site - Base site URL (e.g., 'https://sabuykapao.com')
 * @returns {{type: "product", title: string, url: string, image: string, description: string, brandName: string, price?: number, priceCurrency?: string, availability?: string}} Schema-ready product object
 */
export function mapProductToSchema(product, site = 'https://sabuykapao.com') {
  // ✅ Null Safety: Validate required fields
  if (!product?.name || !product?.slug) {
    console.warn('⚠️ Schema Warning: Invalid product data (missing name or slug):', product);
    return null; // Return null to indicate failure
  }
  
  const cleanSite = site.endsWith('/') ? site.slice(0, -1) : site;
  
  /** @type {{type: "product", title: any, url: string, image: any, description: string, brandName: string, price?: number, priceCurrency?: string, availability?: string}} */
  const schemaProduct = {
    type: /** @type {"product"} */ ("product"),
    title: product.name,
    url: `/${product.slug}`,
    image: product.imageUrl,
    description: product.shortDescription || product.name || '',
    brandName: 'SabuyKapao',
  };
  
  // Only include price info if price exists
  if (typeof product.price === 'number' && !isNaN(product.price)) {
    schemaProduct.price = product.price;
    schemaProduct.priceCurrency = 'THB';
    schemaProduct.availability = 'https://schema.org/InStock';
  }
  
  return schemaProduct;
}

/**
 * Map multiple products to schema format (for ItemList)
 * Handles pagination by only mapping the products provided
 * 
 * @param {Array} products - Array of products from CMS (already paginated)
 * @param {string} site - Base site URL
 * @param {number} limit - Maximum items to include in schema (default: 16)
 * @returns {Array} Array of schema-ready product objects
 */
export function mapProductsToSchema(products, site = 'https://sabuykapao.com', limit = 16) {
  if (!Array.isArray(products) || products.length === 0) {
    return [];
  }
  
  // Only take first {limit} items for schema (SEO best practice)
  // ✅ Null Safety: Filter out invalid products that failed validation
  return products
    .slice(0, limit)
    .map(product => mapProductToSchema(product, site))
    .filter(Boolean); // Remove null entries from failed validations
}
