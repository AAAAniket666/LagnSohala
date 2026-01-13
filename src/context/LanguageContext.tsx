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
  
  // Registration Form
  'register.title': { en: 'Create Account', mr: 'खाते तयार करा' },
  'register.subtitle': { en: 'Fill in your details to get started', mr: 'सुरुवात करण्यासाठी तुमचे तपशील भरा' },
  'register.step1': { en: 'Basic Info', mr: 'मूलभूत माहिती' },
  'register.step2': { en: 'Account Setup', mr: 'खाते सेटअप' },
  'register.firstName': { en: 'First Name', mr: 'पहिले नाव' },
  'register.lastName': { en: 'Last Name', mr: 'आडनाव' },
  'register.email': { en: 'Email Address', mr: 'ईमेल पत्ता' },
  'register.phone': { en: 'Phone Number', mr: 'फोन नंबर' },
  'register.gender': { en: 'I am a', mr: 'मी आहे' },
  'register.selectGender': { en: 'Select Gender', mr: 'लिंग निवडा' },
  'register.male': { en: 'Male', mr: 'पुरुष' },
  'register.female': { en: 'Female', mr: 'स्त्री' },
  'register.groom': { en: 'Groom', mr: 'वर' },
  'register.bride': { en: 'Bride', mr: 'वधू' },
  'register.dateOfBirth': { en: 'Date of Birth', mr: 'जन्मतारीख' },
  'register.password': { en: 'Create a password', mr: 'पासवर्ड तयार करा' },
  'register.confirmPassword': { en: 'Confirm Password', mr: 'पासवर्ड पुष्टी करा' },
  'register.agreeToTerms': { en: 'I agree to the', mr: 'मी सहमत आहे' },
  'register.termsOfService': { en: 'Terms of Service', mr: 'सेवा अटी' },
  'register.and': { en: 'and', mr: 'आणि' },
  'register.privacyPolicy': { en: 'Privacy Policy', mr: 'गोपनीयता धोरण' },
  'register.continue': { en: 'Continue', mr: 'पुढे जा' },
  'register.back': { en: 'Back', mr: 'मागे' },
  'register.createAccount': { en: 'Create Account', mr: 'खाते तयार करा' },
  'register.creating': { en: 'Creating...', mr: 'तयार करत आहे...' },
  'register.alreadyHaveAccount': { en: 'Already have an account?', mr: 'आधीच खाते आहे?' },
  'register.signIn': { en: 'Sign in', mr: 'साइन इन करा' },
  'register.joinCommunity': { en: 'Join Our Community', mr: 'आमच्या समुदायात सामील व्हा' },
  'register.joinDesc': { en: 'Create your profile and start your journey to finding true love', mr: 'तुमचे प्रोफाइल तयार करा आणि खऱ्या प्रेमाचा शोध सुरू करा' },
  
  // Login Form
  'login.title': { en: 'Welcome Back', mr: 'परत स्वागत आहे' },
  'login.subtitle': { en: 'Sign in to continue your journey', mr: 'तुमचा प्रवास चालू ठेवण्यासाठी साइन इन करा' },
  'login.emailPlaceholder': { en: 'Enter your email', mr: 'तुमचा ईमेल एंटर करा' },
  'login.passwordPlaceholder': { en: 'Enter your password', mr: 'तुमचा पासवर्ड एंटर करा' },
  'login.rememberMe': { en: 'Remember me', mr: 'मला लक्षात ठेवा' },
  'login.forgotPassword': { en: 'Forgot Password?', mr: 'पासवर्ड विसरलात?' },
  'login.signInButton': { en: 'Sign In', mr: 'साइन इन करा' },
  'login.signingIn': { en: 'Signing in...', mr: 'साइन इन करत आहे...' },
  'login.noAccount': { en: "Don't have an account?", mr: 'खाते नाही?' },
  'login.createAccount': { en: 'Create one', mr: 'एक तयार करा' },
  'login.welcomeBack': { en: 'Welcome Back!', mr: 'परत स्वागत आहे!' },
  'login.welcomeDesc': { en: 'Sign in to access your account and continue your search', mr: 'तुमचे खाते ऍक्सेस करण्यासाठी आणि शोध सुरू ठेवण्यासाठी साइन इन करा' },
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
