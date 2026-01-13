// Profile Types
export interface Profile {
  id: string
  name: string
  age: number
  gender: 'male' | 'female'
  height: string
  religion: string
  community: string
  location: string
  education: string
  occupation: string
  about: string
  image: string
  verified: boolean
  premium: boolean
}

// Service Types
export interface WeddingService {
  id: string
  name: string
  category: string
  description: string
  icon: string
  image: string
  priceRange: string
  rating: number
  reviews: number
}

// Blog Types
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
  readTime: string
}

// Success Story Types
export interface SuccessStory {
  id: string
  coupleName: string
  weddingDate: string
  location: string
  quote: string
  story: string
  image: string
  images: string[]
}

// Plan Types
export interface PricingPlan {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: string[]
  highlighted: boolean
  buttonText: string
}

// Contact Form Types
export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

// Auth Types
export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  gender: 'male' | 'female'
  dateOfBirth: string
  agreeToTerms: boolean
}

// Filter Types
export interface ProfileFilters {
  gender: string
  ageMin: number
  ageMax: number
  religion: string
  community: string
  location: string
  education: string
  occupation: string
}
