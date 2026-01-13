import dotenv from 'dotenv';
import connectDB from './config/database';
import Profile from './models/Profile';
import WeddingService from './models/WeddingService';
import BlogPost from './models/BlogPost';
import SuccessStory from './models/SuccessStory';
import PricingPlan from './models/PricingPlan';

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Profile.deleteMany({});
    await WeddingService.deleteMany({});
    await BlogPost.deleteMany({});
    await SuccessStory.deleteMany({});
    await PricingPlan.deleteMany({});

    // Seed Profiles
    console.log('👥 Seeding profiles...');
    const profiles = await Profile.insertMany([
      {
        name: 'Priya Sharma',
        age: 26,
        gender: 'female',
        height: "5'4\"",
        religion: 'Hindu',
        community: 'Brahmin',
        location: 'Pune, Maharashtra',
        education: 'MBA',
        occupation: 'Software Engineer',
        about: 'Family-oriented person who loves music and traveling. Looking for a caring and understanding life partner.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
        verified: true,
        premium: true,
      },
      {
        name: 'Rahul Patil',
        age: 29,
        gender: 'male',
        height: "5'10\"",
        religion: 'Hindu',
        community: 'Maratha',
        location: 'Mumbai, Maharashtra',
        education: 'B.Tech',
        occupation: 'Business Analyst',
        about: 'Ambitious professional with a passion for cricket and cooking. Seeking a life partner who values family traditions.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
        verified: true,
        premium: false,
      },
      {
        name: 'Sneha Kulkarni',
        age: 24,
        gender: 'female',
        height: "5'3\"",
        religion: 'Hindu',
        community: 'Brahmin',
        location: 'Nagpur, Maharashtra',
        education: 'M.Sc',
        occupation: 'Research Scientist',
        about: 'Curious mind with love for reading and nature. Looking for someone who shares similar values and interests.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
        verified: true,
        premium: true,
      },
      {
        name: 'Amit Deshmukh',
        age: 31,
        gender: 'male',
        height: "5'11\"",
        religion: 'Hindu',
        community: 'Maratha',
        location: 'Pune, Maharashtra',
        education: 'CA',
        occupation: 'Chartered Accountant',
        about: 'Finance professional who enjoys traveling and photography. Looking for a supportive and caring life partner.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
        verified: true,
        premium: true,
      },
      {
        name: 'Pooja Joshi',
        age: 27,
        gender: 'female',
        height: "5'5\"",
        religion: 'Hindu',
        community: 'Brahmin',
        location: 'Mumbai, Maharashtra',
        education: 'MBBS',
        occupation: 'Doctor',
        about: 'Healthcare professional with a kind heart. Enjoys music, yoga, and spending quality time with family.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
        verified: true,
        premium: false,
      },
      {
        name: 'Vikram Pawar',
        age: 28,
        gender: 'male',
        height: "5'9\"",
        religion: 'Hindu',
        community: 'Mali',
        location: 'Nashik, Maharashtra',
        education: 'B.E.',
        occupation: 'Civil Engineer',
        about: 'Down-to-earth person who values honesty and simplicity. Looking for a life partner to build a beautiful future.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
        verified: true,
        premium: false,
      },
    ]);
    console.log(`✅ ${profiles.length} profiles created`);

    // Seed Wedding Services
    console.log('💍 Seeding wedding services...');
    const services = await WeddingService.insertMany([
      {
        name: 'Premium Catering Services',
        category: 'Catering',
        description: 'Delicious multi-cuisine catering with traditional and modern dishes',
        icon: 'UtensilsCrossed',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=600&fit=crop',
        priceRange: '₹500-₹2,000/plate',
        rating: 4.8,
        reviews: 234,
      },
      {
        name: 'Luxury Wedding Venues',
        category: 'Venue Booking',
        description: 'Beautiful venues with modern amenities and stunning decor',
        icon: 'Building2',
        image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c776?w=800&h=600&fit=crop',
        priceRange: '₹1L-₹10L',
        rating: 4.9,
        reviews: 189,
      },
      {
        name: 'Floral Decoration & Mandap',
        category: 'Decoration',
        description: 'Stunning floral arrangements and traditional mandap decoration',
        icon: 'Flower2',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
        priceRange: '₹50K-₹5L',
        rating: 4.7,
        reviews: 156,
      },
      {
        name: 'Live Music & DJ Services',
        category: 'Music & DJ',
        description: 'Professional musicians and DJs for sangeet and reception',
        icon: 'Music',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
        priceRange: '₹25K-₹2L',
        rating: 4.6,
        reviews: 142,
      },
      {
        name: 'Traditional Pandit Services',
        category: 'Pandit Services',
        description: 'Experienced pandits for all Hindu wedding rituals',
        icon: 'Flame',
        image: 'https://images.unsplash.com/photo-1583391733981-5ebb0bc41fca?w=800&h=600&fit=crop',
        priceRange: '₹11K-₹51K',
        rating: 4.9,
        reviews: 278,
      },
      {
        name: 'Bridal Makeup & Styling',
        category: 'Bridal Makeup',
        description: 'Professional makeup artists for bridal and guest makeup',
        icon: 'Sparkles',
        image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop',
        priceRange: '₹15K-₹1L',
        rating: 4.8,
        reviews: 321,
      },
      {
        name: 'Wedding Photography & Videography',
        category: 'Photography',
        description: 'Capture your special moments with cinematic photography',
        icon: 'Camera',
        image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop',
        priceRange: '₹50K-₹5L',
        rating: 4.9,
        reviews: 412,
      },
      {
        name: 'Bridal Jewelry & Accessories',
        category: 'Jewelry',
        description: 'Exquisite traditional and contemporary bridal jewelry',
        icon: 'Gem',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop',
        priceRange: '₹10K-₹50L',
        rating: 4.7,
        reviews: 198,
      },
    ]);
    console.log(`✅ ${services.length} wedding services created`);

    // Seed Blog Posts
    console.log('📝 Seeding blog posts...');
    const blogs = await BlogPost.insertMany([
      {
        title: 'Complete Wedding Planning Checklist 2024',
        slug: 'wedding-planning-checklist-2024',
        excerpt: 'A comprehensive guide to planning your dream wedding with timeline and budget tips.',
        content: 'Planning a wedding can be overwhelming. Here is your complete guide...',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
        author: 'Meera Kulkarni',
        date: '2024-01-15',
        category: 'Planning',
        readTime: '8 min read',
      },
      {
        title: 'How to Choose the Right Life Partner',
        slug: 'how-to-choose-right-life-partner',
        excerpt: 'Expert advice on finding compatibility and building a strong foundation for marriage.',
        content: 'Choosing a life partner is one of the most important decisions...',
        image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop',
        author: 'Dr. Rajesh Sharma',
        date: '2024-01-10',
        category: 'Relationships',
        readTime: '6 min read',
      },
      {
        title: 'Top 10 Wedding Tips for Brides & Grooms',
        slug: 'top-10-wedding-tips',
        excerpt: 'Essential tips every couple should know before their big day.',
        content: 'Your wedding day should be stress-free and memorable...',
        image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop',
        author: 'Anjali Desai',
        date: '2024-01-05',
        category: 'Planning',
        readTime: '5 min read',
      },
      {
        title: 'Traditional vs Modern Wedding: Which is Right for You?',
        slug: 'traditional-vs-modern-wedding',
        excerpt: 'Exploring the pros and cons of traditional and contemporary wedding styles.',
        content: 'Indian weddings have evolved over the years...',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
        author: 'Priya Singh',
        date: '2023-12-28',
        category: 'Traditions',
        readTime: '7 min read',
      },
      {
        title: 'Budget-Friendly Wedding Ideas That Look Expensive',
        slug: 'budget-friendly-wedding-ideas',
        excerpt: 'Creative ways to have a stunning wedding without breaking the bank.',
        content: 'You dont need a massive budget to have a beautiful wedding...',
        image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&h=600&fit=crop',
        author: 'Rohit Mehta',
        date: '2023-12-20',
        category: 'Budget',
        readTime: '6 min read',
      },
      {
        title: 'Latest Mehendi Designs for 2024',
        slug: 'latest-mehendi-designs-2024',
        excerpt: 'Trending mehendi patterns and designs for modern brides.',
        content: 'Mehendi is an integral part of Indian weddings...',
        image: 'https://images.unsplash.com/photo-1610699159588-83e59a01e52f?w=800&h=600&fit=crop',
        author: 'Kavita Patel',
        date: '2023-12-15',
        category: 'Beauty',
        readTime: '4 min read',
      },
    ]);
    console.log(`✅ ${blogs.length} blog posts created`);

    // Seed Success Stories
    console.log('💝 Seeding success stories...');
    const stories = await SuccessStory.insertMany([
      {
        coupleName: 'Rahul & Priya',
        weddingDate: 'December 15, 2023',
        location: 'Pune, Maharashtra',
        story: 'We met through Lagna Sohalaa in early 2023. From the first conversation, we knew there was something special. After months of getting to know each other, we decided to take the next step. Our families connected beautifully, and we had a wonderful wedding celebration in Pune.',
        quote: 'Thank you Lagna Sohalaa for helping us find each other! Our journey from strangers to life partners has been magical.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
      },
      {
        coupleName: 'Amit & Sneha',
        weddingDate: 'November 20, 2023',
        location: 'Mumbai, Maharashtra',
        story: 'Finding the right match seemed impossible until we joined Lagna Sohalaa. The platform made it easy to connect with like-minded individuals. We bonded over our shared love for travel and food, and the rest is history!',
        quote: 'Forever grateful to Lagna Sohalaa for bringing us together. We couldn\'t have asked for better life partners!',
        image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop',
      },
      {
        coupleName: 'Vikram & Pooja',
        weddingDate: 'October 8, 2023',
        location: 'Nagpur, Maharashtra',
        story: 'Our families were searching for matches for years without success. Lagna Sohalaa\'s AI-powered matching system connected us based on our compatibility. We are now happily married and expecting our first child!',
        quote: 'The best decision we made was trusting Lagna Sohalaa. They made finding true love effortless!',
        image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop',
      },
    ]);
    console.log(`✅ ${stories.length} success stories created`);

    // Seed Pricing Plans
    console.log('💰 Seeding pricing plans...');
    const plans = await PricingPlan.insertMany([
      {
        name: 'Free',
        price: 0,
        period: 'month',
        popular: false,
        features: [
          'Basic profile search',
          '5 profile contacts per month',
          'Standard customer support',
          'View limited profiles',
        ],
      },
      {
        name: 'Premium',
        price: 2499,
        period: 'month',
        popular: true,
        features: [
          'AI-powered matching',
          'Unlimited profile contacts',
          'Priority customer support',
          'Advanced filters & search',
          'Verified badge on profile',
          'Profile highlighting',
          'Wedding services access',
        ],
      },
      {
        name: 'Business',
        price: 9999,
        period: 'month',
        popular: false,
        features: [
          'All Premium features',
          'Vendor profile listing',
          'Featured in search results',
          'Lead generation tools',
          'Analytics dashboard',
          'Dedicated account manager',
          'Priority support 24/7',
        ],
      },
    ]);
    console.log(`✅ ${plans.length} pricing plans created`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Profiles: ${profiles.length}`);
    console.log(`   Services: ${services.length}`);
    console.log(`   Blog Posts: ${blogs.length}`);
    console.log(`   Success Stories: ${stories.length}`);
    console.log(`   Pricing Plans: ${plans.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
