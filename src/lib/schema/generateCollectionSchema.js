// src/lib/schema/generateCollectionSchema.js
/**
 * Generate JSON-LD (@graph) for listing pages (Product Category or Blog Index).
 * - CollectionPage
 * - BreadcrumbList
 * - ItemList (items: Product | BlogPosting)
 *
 * Usage in an Astro page (HEAD):
 * ---
 * import { generateCollectionSchema } from "@/lib/schema/generateCollectionSchema.js";
 * const schema = generateCollectionSchema({
 *   pageType: "blogIndex", // "productCategory" | "blogIndex"
 *   site: Astro.site?.href || "https://sabuykapao.com",
 *   pageTitle: "บทความทั้งหมด",
 *   pageDescription: "รวมบทความล่าสุดจาก SabuyKapao",
 *   pageUrl: Astro.url.href, // absolute
 *   breadcrumb: [
 *     { name: "Home", url: "/" },
 *     { name: "บทความ", url: "/content/" },
 *   ],
 *   items: first16Items.map((x, i) => ({
 *     // BLOG ITEM SHAPE (for pageType === "blogIndex")
 *     type: "blog",
 *     title: x.title,
 *     url: `/content/${x.slug}`,
 *     image: x.mainImageSquare600, // absolute or path; will be resolved
 *     datePublished: x.publishedAt, // ISO
 *     dateModified: x.updatedAt || x.publishedAt, // ISO
 *     authorName: x.authorName || "SabuyKapao",
 *     description: x.excerpt || "",
 *   })),
 * });
 * ---
 * <script type="application/ld+json" set:html={schema}></script>
 */

const ABS_URL_RE = /^https?:\/\//i;

/**
 * @param {string} site - e.g., https://sabuykapao.com (no trailing slash OK)
 * @param {string} pathOrUrl - "/path" or absolute URL
 * @returns {string} absolute URL
 */
function absUrl(site, pathOrUrl) {
  if (!pathOrUrl) return site;
  if (ABS_URL_RE.test(pathOrUrl)) return pathOrUrl;
  const cleanSite = site.endsWith("/") ? site.slice(0, -1) : site;
  const cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${cleanSite}${cleanPath}`;
}

/**
 * @typedef {Object} BreadcrumbItem
 * @property {string} name
 * @property {string} url // absolute or path
 */

/**
 * BLOG item for the index page
 * @typedef {Object} BlogIndexItem
 * @property {"blog"} type
 * @property {string} title
 * @property {string} url // absolute or path
 * @property {string} image // 600×600 1:1 (absolute or path)
 * @property {string} [datePublished] // ISO
 * @property {string} [dateModified] // ISO
 * @property {string} [authorName]
 * @property {string} [description]
 */

/**
 * PRODUCT item for category page
 * @typedef {Object} ProductItem
 * @property {"product"} type
 * @property {string} title
 * @property {string} url // absolute or path
 * @property {string} image // 1:1 (absolute or path)
 * @property {string} [description]
 * @property {string|number} [price] // include offers only if present
 * @property {string} [priceCurrency] // e.g., "THB"
 * @property {string} [availability] // e.g., "https://schema.org/InStock"
 * @property {string} [brandName] // optional
 */

/**
 * CATEGORY item for category hub page
 * @typedef {Object} CategoryItem
 * @property {"category"} type
 * @property {string} title
 * @property {string} url // absolute or path
 * @property {string} image // 1:1 (absolute or path)
 * @property {string} [description]
 */

/**
 * @param {{
 *   pageType: "productCategory" | "blogIndex" | "categoryHub",
 *   site: string,
 *   pageTitle: string,
 *   pageDescription?: string,
 *   pageUrl: string, // absolute
 *   breadcrumb: BreadcrumbItem[],
 *   items: Array<BlogIndexItem | ProductItem | CategoryItem>, // first 16 already
 * }} opts
 * @returns {string} JSON string for <script type="application/ld+json">
 */
export function generateCollectionSchema(opts) {
  const {
    pageType,
    site,
    pageTitle,
    pageDescription = "",
    pageUrl,
    breadcrumb = [],
    items = [],
  } = opts;

  // Safety: limit to 16 for ItemList
  const first16 = items.slice(0, 16);

  // CollectionPage
  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    "url": pageUrl,
    "name": pageTitle,
    ...(pageDescription ? { "description": pageDescription } : {}),
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${site}#website`,
      "url": site,
      "name": "SabuyKapao",
    },
  };

  // BreadcrumbList
  const breadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    "itemListElement": breadcrumb.map((bc, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": bc.name,
      "item": absUrl(site, bc.url),
    })),
  };

  // Calculate priceValidUntil (1 year from today)
  const today = new Date();
  const nextYear = new Date(today);
  nextYear.setFullYear(today.getFullYear() + 1);
  const priceValidUntil = nextYear.toISOString().split('T')[0];

  // Per-item generator
  const makeItemThing = (it) => {
    // Blog Item
    if (pageType === "blogIndex" || it.type === "blog") {
      const blogUrl = absUrl(site, it.url);
      const imgUrl = absUrl(site, it.image);
      const blogThing = {
        "@type": "BlogPosting",
        "@id": `${blogUrl}#blogposting`,
        "url": blogUrl,
        "mainEntityOfPage": blogUrl,
        "headline": it.title,
        "image": [imgUrl],
      };
      if (it.description) blogThing.description = it.description;
      if (it.authorName) {
        blogThing.author = { "@type": "Person", "name": it.authorName };
      }
      if (it.datePublished) blogThing.datePublished = it.datePublished;
      if (it.dateModified) blogThing.dateModified = it.dateModified;
      return blogThing;
    }

    // Category Item (for Category Hub page)
    if (pageType === "categoryHub" || it.type === "category") {
      const categoryUrl = absUrl(site, it.url);
      const imgUrl = absUrl(site, it.image);
      return {
        "@type": "CollectionPage",
        "@id": `${categoryUrl}#collection`,
        "url": categoryUrl,
        "name": it.title,
        "description": it.description || it.title,
        "image": imgUrl,
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${site}#website`,
          "url": site,
          "name": "SabuyKapao",
        },
      };
    }

    // Product Item
    const prodUrl = absUrl(site, it.url);
    const imgUrl = absUrl(site, it.image);
    const productThing = {
      "@type": "Product",
      "@id": `${prodUrl}#product`,
      "url": prodUrl,
      "name": it.title,
      "image": [imgUrl],
      "description": it.description || it.title,
    };
    productThing.brand = { "@type": "Brand", "name": it.brandName || "SABUYKAPAO" };
    if (it.price !== undefined && it.price !== null && `${it.price}` !== "") {
      productThing.offers = {
        "@type": "Offer",
        "url": prodUrl,
        "price": typeof it.price === "number" ? it.price : `${it.price}`.trim(),
        "priceValidUntil": priceValidUntil,
        "priceCurrency": it.priceCurrency || "THB",
        "availability": it.availability || "https://schema.org/InStock",
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "TH",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 7,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/FreeReturn"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "50",
            "currency": "THB"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "TH"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 2,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 2,
              "maxValue": 5,
              "unitCode": "DAY"
            }
          }
        }
      };
    }
    return productThing;
  };

  // ItemList
  const itemList = {
    "@type": "ItemList",
    "@id": `${pageUrl}#itemlist`,
    "numberOfItems": first16.length,
    "itemListElement": first16.map((it, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": makeItemThing(it),
    })),
  };

  const graph = [collectionPage, breadcrumbList, itemList];

  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": graph,
    },
    null,
    0 // compact to save bytes in HEAD
  );
}

export default generateCollectionSchema;
