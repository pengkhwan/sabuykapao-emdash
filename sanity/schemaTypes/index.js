// sanity/schemaTypes/index.js

// Import Document Types ที่เราใช้งานจริง
import article from './article'
import category from './category'
import product from './product'
import portfolio from './portfolio'
import portfolioPage from './portfolioPage'
import shopPage from './shopPage'
import contactUsPage from './contactUsPage'
import aboutPage from './aboutPage'
import contentPage from './contentPage'
import homePage from './homePage'
import siteSettings from './siteSettings'
import redirect from './redirect'

// Import Object Types ที่เราใช้งานจริง
import seo from './seo'

// Export Schema ทั้งหมดในรูปแบบ Array ที่ถูกต้อง
export const schemaTypes = [
    article,
    category,
    product,
    portfolio,
    portfolioPage,
    shopPage,
    contactUsPage,
    aboutPage,
    contentPage,
    homePage,
    siteSettings,
    redirect,
    seo,
]