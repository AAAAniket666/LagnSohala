import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  schema?: object
}

export default function SEO({ title, description, keywords, ogImage, schema }: SEOProps) {
  const location = useLocation()
  const url = `https://www.lagnasohalaa.com${location.pathname}`
  const defaultImage = '/og-image.jpg'

  useEffect(() => {
    // Update page title
    document.title = `${title} | Lagna Sohalaa`

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
    updateMeta('og:type', 'website', true)

    // Twitter
    updateMeta('twitter:title', title, true)
    updateMeta('twitter:description', description, true)
    updateMeta('twitter:image', ogImage || defaultImage, true)
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
