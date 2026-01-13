import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  schema?: object
  breadcrumbs?: Array<{ name: string; url: string }>
  type?: 'website' | 'article' | 'profile'
}

export default function SEO({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  schema,
  breadcrumbs,
  type = 'website'
}: SEOProps) {
  const location = useLocation()
  const baseUrl = 'https://lagn-sohala-five.vercel.app'
  const url = `${baseUrl}${location.pathname}`
  const defaultImage = `${baseUrl}/og-image.jpg`

  useEffect(() => {
    // Update page title
    document.title = `${title} | Lagna Sohalaa - Find Your Life Partner`

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property?: boolean) => {
      const attr = property ? 'property' : 'name'
      let element = document.querySelector(`meta[${attr}="${name}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, name)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Primary meta tags
    updateMeta('title', title)
    updateMeta('description', description)
    if (keywords) updateMeta('keywords', keywords)

    // Open Graph
    updateMeta('og:title', title, true)
    updateMeta('og:description', description, true)
    updateMeta('og:url', url, true)
    updateMeta('og:image', ogImage || defaultImage, true)
    updateMeta('og:type', type, true)
    updateMeta('og:site_name', 'Lagna Sohalaa', true)
    updateMeta('og:locale', 'en_IN', true)

    // Twitter
    updateMeta('twitter:card', 'summary_large_image', true)
    updateMeta('twitter:title', title, true)
    updateMeta('twitter:description', description, true)
    updateMeta('twitter:image', ogImage || defaultImage, true)

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    // JSON-LD Structured Data
    const removeExistingSchema = () => {
      const existing = document.querySelectorAll('script[type="application/ld+json"]')
      existing.forEach(el => el.remove())
    }

    const addSchema = (schemaData: object) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(schemaData)
      document.head.appendChild(script)
    }

    removeExistingSchema()

    // Organization Schema (always include)
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Lagna Sohalaa',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      description: 'Premier Indian matrimonial service connecting families with verified profiles and comprehensive wedding services',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        availableLanguage: ['English', 'Marathi']
      },
      sameAs: [
        'https://facebook.com/lagnasohalaa',
        'https://instagram.com/lagnasohalaa',
        'https://twitter.com/lagnasohalaa'
      ]
    }
    addSchema(organizationSchema)

    // Website Schema
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Lagna Sohalaa',
      url: baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/matrimony?search={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }
    addSchema(websiteSchema)

    // Breadcrumb Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${baseUrl}${crumb.url}`
        }))
      }
      addSchema(breadcrumbSchema)
    }

    // Custom Schema (if provided)
    if (schema) {
      addSchema(schema)
    }
    updateMeta('twitter:card', 'summary_large_image', true)

    // Add structured data if provided
    if (schema) {
      const existingScript = document.querySelector('script[data-type="page-schema"]')
      if (existingScript) {
        existingScript.remove()
      }

      const script = document.createElement('script')
      script.setAttribute('type', 'application/ld+json')
      script.setAttribute('data-type', 'page-schema')
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    }

    // Cleanup function
    return () => {
      if (schema) {
        const script = document.querySelector('script[data-type="page-schema"]')
        if (script) script.remove()
      }
    }
  }, [title, description, keywords, ogImage, url, schema])

  return null
}
