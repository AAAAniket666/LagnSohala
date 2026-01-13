import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'mr'

interface Translations {
  [key: string]: {
    en: string
    mr: string
  }
}

export const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', mr: 'मुख्यपृष्ठ' },
  'nav.about': { en: 'About', mr: 'आमच्याबद्दल' },
  'nav.matrimony': { en: 'Matrimony', mr: 'वधू-वर' },
  'nav.services': { en: 'Services', mr: 'सेवा' },
  'nav.successStories': { en: 'Success Stories', mr: 'यशोगाथा' },
  'nav.blog': { en: 'Blog', mr: 'ब्लॉग' },
  'nav.contact': { en: 'Contact', mr: 'संपर्क' },
  'nav.login': { en: 'Login', mr: 'लॉगिन' },
  'nav.register': { en: 'Register', mr: 'नोंदणी' },
  
  // Hero Section
  'hero.tagline': { 
    en: 'Find Your Life Partner & Wedding Support Services with Trust', 
    mr: 'विश्वासाने तुमचा जीवनसाथी आणि लग्नाच्या सेवा शोधा' 
  },
  'hero.subtitle': { 
    en: 'Verified profiles and comprehensive wedding services for your special day', 
    mr: 'तुमच्या खास दिवसासाठी सत्यापित प्रोफाइल आणि संपूर्ण लग्न सेवा' 
  },
  'hero.getStarted': { en: 'Get Started', mr: 'सुरू करा' },
  'hero.searchProfiles': { en: 'Search Profiles', mr: 'प्रोफाइल शोधा' },
  'hero.contactTeam': { en: 'Contact Our Team', mr: 'आमच्या टीमशी संपर्क करा' },
  
  // How It Works
  'howItWorks.title': { en: 'How It Works', mr: 'हे कसे काम करते' },
  'howItWorks.subtitle': { 
    en: 'Find your perfect match in three simple steps', 
    mr: 'तीन सोप्या पायऱ्यांमध्ये तुमचा योग्य साथी शोधा' 
  },
  'howItWorks.browse': { en: 'Browse', mr: 'ब्राउझ करा' },
  'howItWorks.browseDesc': { 
    en: 'Explore thousands of verified profiles matching your preferences', 
    mr: 'तुमच्या पसंतीनुसार हजारो सत्यापित प्रोफाइल एक्सप्लोर करा' 
  },
  'howItWorks.connect': { en: 'Connect', mr: 'कनेक्ट करा' },
  'howItWorks.connectDesc': { 
    en: 'Send interests and chat with potential matches', 
    mr: 'आवड पाठवा आणि संभाव्य जोडीशी गप्पा मारा' 
  },
  'howItWorks.celebrate': { en: 'Celebrate', mr: 'उत्सव साजरा करा' },
  'howItWorks.celebrateDesc': { 
    en: 'Plan your wedding with our comprehensive services', 
    mr: 'आमच्या संपूर्ण सेवांसह तुमच्या लग्नाची योजना करा' 
  },
  
  // Services
  'services.title': { en: 'Wedding Services', mr: 'लग्न सेवा' },
  'services.subtitle': { 
    en: 'Everything you need for your perfect wedding', 
    mr: 'तुमच्या परफेक्ट लग्नासाठी सर्वकाही' 
  },
  'services.requestQuote': { en: 'Request Quote', mr: 'कोट विनंती करा' },
  'services.viewMore': { en: 'View More', mr: 'अधिक पहा' },
  
  // Footer
  'footer.tagline': { 
    en: 'Making marriages, creating memories', 
    mr: 'विवाह जुळवणे, आठवणी निर्माण करणे' 
  },
  'footer.quickLinks': { en: 'Quick Links', mr: 'जलद दुवे' },
  'footer.services': { en: 'Services', mr: 'सेवा' },
  'footer.contact': { en: 'Contact Us', mr: 'आमच्याशी संपर्क साधा' },
  'footer.privacy': { en: 'Privacy Policy', mr: 'गोपनीयता धोरण' },
  'footer.terms': { en: 'Terms & Conditions', mr: 'अटी आणि नियम' },
  'footer.rights': { en: 'All rights reserved', mr: 'सर्व हक्क राखीव' },
  
  // Common
  'common.learnMore': { en: 'Learn More', mr: 'अधिक जाणून घ्या' },
  'common.readMore': { en: 'Read More', mr: 'अधिक वाचा' },
  'common.submit': { en: 'Submit', mr: 'सबमिट करा' },
  'common.search': { en: 'Search', mr: 'शोध' },
  'common.filter': { en: 'Filter', mr: 'फिल्टर' },
  'common.verified': { en: 'Verified', mr: 'सत्यापित' },
  'common.premium': { en: 'Premium', mr: 'प्रीमियम' },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    const translation = translations[key]
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`)
      return key
    }
    return translation[language]
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
