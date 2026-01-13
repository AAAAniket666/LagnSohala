# MongoDB Backend Integration

This document explains the MongoDB backend integration for the Lagna Sohalaa project.

## 🏗️ Architecture

The project now has a full-stack architecture:

```
Frontend (React + Vite) → API Layer → Backend (Express + TypeScript) → MongoDB Atlas
```

## 📁 Project Structure

```
server/
├── config/
│   └── database.ts          # MongoDB connection
├── models/
│   ├── Profile.ts           # Profile schema
│   ├── WeddingService.ts    # Service schema
│   ├── BlogPost.ts          # Blog schema
│   ├── SuccessStory.ts      # Story schema
│   └── PricingPlan.ts       # Pricing schema
├── controllers/
│   ├── profileController.ts # Profile CRUD operations
│   ├── serviceController.ts # Service CRUD operations
│   ├── blogController.ts    # Blog CRUD operations
│   ├── storyController.ts   # Story CRUD operations
│   └── pricingController.ts # Pricing CRUD operations
├── routes/
│   ├── profileRoutes.ts     # Profile API routes
│   ├── serviceRoutes.ts     # Service API routes
│   ├── blogRoutes.ts        # Blog API routes
│   ├── storyRoutes.ts       # Story API routes
│   └── pricingRoutes.ts     # Pricing API routes
├── index.ts                 # Express server entry point
└── seed.ts                  # Database seeding script

src/
└── services/
    └── api.ts               # Frontend API service
```

## 🚀 Getting Started

### 1. Environment Setup

The `.env` file has been created with your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://aniketjagtap2110_db_user:dpqOB4MDtNVJijGC@cluster0.oidlgrg.mongodb.net/lagna-sohalaa?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
VITE_API_URL=http://localhost:5000/api
```

### 2. Seed the Database

Populate MongoDB with initial data:

```bash
npm run seed
```

This will create:
- 6 sample profiles
- 8 wedding services
- 6 blog posts
- 3 success stories
- 3 pricing plans

### 3. Start the Backend Server

```bash
npm run server
```

The server will start on `http://localhost:5000`

### 4. Start the Frontend

In a new terminal:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` or `http://localhost:5174`

### 5. Run Both Together

```bash
npm run dev:full
```

This runs frontend and backend concurrently.

## 📡 API Endpoints

### Profiles

- `GET /api/profiles` - Get all profiles (with filters)
- `GET /api/profiles/stats` - Get profile statistics
- `GET /api/profiles/:id` - Get single profile
- `POST /api/profiles` - Create new profile
- `PUT /api/profiles/:id` - Update profile
- `DELETE /api/profiles/:id` - Delete profile

**Query Parameters for GET /api/profiles:**
- `gender` - Filter by gender (male/female)
- `minAge` - Minimum age
- `maxAge` - Maximum age
- `religion` - Filter by religion
- `community` - Filter by community
- `location` - Filter by location (partial match)
- `education` - Filter by education
- `occupation` - Filter by occupation (partial match)
- `verified` - Filter verified profiles (true/false)
- `premium` - Filter premium profiles (true/false)
- `search` - Text search (name, location, occupation)
- `sort` - Sort order (default: `-createdAt`)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)

### Wedding Services

- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

**Query Parameters:**
- `category` - Filter by category
- `minRating` - Minimum rating
- `sort` - Sort order (default: `-rating`)

### Blog Posts

- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:slug` - Get single blog post by slug
- `POST /api/blog` - Create new blog post
- `PUT /api/blog/:slug` - Update blog post
- `DELETE /api/blog/:slug` - Delete blog post

**Query Parameters:**
- `category` - Filter by category
- `search` - Text search (title, content)
- `sort` - Sort order (default: `-date`)
- `page` - Page number
- `limit` - Items per page (default: 9)

### Success Stories

- `GET /api/stories` - Get all success stories
- `GET /api/stories/:id` - Get single story
- `POST /api/stories` - Create new story
- `PUT /api/stories/:id` - Update story
- `DELETE /api/stories/:id` - Delete story

### Pricing Plans

- `GET /api/pricing` - Get all pricing plans
- `GET /api/pricing/:id` - Get single plan
- `POST /api/pricing` - Create new plan
- `PUT /api/pricing/:id` - Update plan
- `DELETE /api/pricing/:id` - Delete plan

## 🔧 Frontend Integration

The frontend now uses the API service located at `src/services/api.ts`.

### Example Usage

```typescript
import api from '@/services/api';

// Get profiles with filters
const response = await api.getProfiles({
  gender: 'female',
  minAge: 25,
  maxAge: 30,
  religion: 'Hindu',
  verified: true,
  page: 1,
  limit: 12
});

// Access data
const profiles = response.data;
const total = response.total;
const pages = response.pages;
```

### Updating Pages to Use API

To update a page to use the backend API instead of mock data:

1. Import the API service:
```typescript
import api from '../services/api';
```

2. Use React hooks to fetch data:
```typescript
const [profiles, setProfiles] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await api.getProfiles();
      setProfiles(response.data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

## 🗄️ Database Models

### Profile Schema

```typescript
{
  name: string (required)
  age: number (required, 18-100)
  gender: 'male' | 'female' (required)
  height: string (required)
  religion: string (required)
  community: string (required)
  location: string (required)
  education: string (required)
  occupation: string (required)
  about: string (required, max 1000 chars)
  image: string (required)
  verified: boolean (default: false)
  premium: boolean (default: false)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

### WeddingService Schema

```typescript
{
  name: string (required)
  category: string (required)
  description: string (required, max 500 chars)
  icon: string (required)
  image: string (required)
  priceRange: string (required)
  rating: number (required, 0-5)
  reviews: number (default: 0)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

### BlogPost Schema

```typescript
{
  title: string (required)
  slug: string (required, unique)
  excerpt: string (required, max 300 chars)
  content: string (required)
  image: string (required)
  author: string (required)
  date: string (required)
  category: string (required)
  readTime: string (required)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

### SuccessStory Schema

```typescript
{
  coupleName: string (required)
  weddingDate: string (required)
  location: string (required)
  story: string (required, max 2000 chars)
  quote: string (required, max 300 chars)
  image: string (required)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

### PricingPlan Schema

```typescript
{
  name: string (required)
  price: number (required, >= 0)
  period: string (required)
  popular: boolean (default: false)
  features: string[] (required, min 1 feature)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

## 🔍 Testing the API

### Using cURL

```bash
# Get all profiles
curl http://localhost:5000/api/profiles

# Get profiles with filters
curl "http://localhost:5000/api/profiles?gender=female&minAge=25&maxAge=30"

# Get single profile
curl http://localhost:5000/api/profiles/PROFILE_ID

# Get profile stats
curl http://localhost:5000/api/profiles/stats

# Health check
curl http://localhost:5000/health
```

### Using Postman or Thunder Client

1. Import the following base URL: `http://localhost:5000/api`
2. Test each endpoint with different query parameters
3. Try creating, updating, and deleting resources

## 🛠️ Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend only (Vite) |
| `npm run server` | Start backend only (Express) with hot reload |
| `npm run server:prod` | Start backend in production mode |
| `npm run seed` | Seed database with initial data |
| `npm run dev:full` | Run frontend + backend concurrently |
| `npm run build` | Build frontend for production |

## 🔐 Security Notes

1. **Environment Variables**: Never commit `.env` file to Git. It's already in `.gitignore`.

2. **MongoDB Credentials**: Your connection string contains credentials. Consider:
   - Using IP whitelist in MongoDB Atlas
   - Rotating credentials periodically
   - Using separate databases for dev/staging/production

3. **CORS**: Currently allows `localhost:5173` and `localhost:5174`. Update for production domain.

4. **Validation**: All models include validation. Add more as needed.

5. **Authentication**: Currently no authentication. Add JWT/session-based auth for production.

## 🚢 Deployment

### Backend Deployment

**Option 1: Render.com**
1. Create new Web Service
2. Connect GitHub repo
3. Set build command: `npm install`
4. Set start command: `npm run server:prod`
5. Add environment variable: `MONGODB_URI`

**Option 2: Railway.app**
1. New Project from GitHub
2. Add service
3. Set start command: `npm run server:prod`
4. Add `MONGODB_URI` variable

**Option 3: Heroku**
```bash
heroku create lagna-sohalaa-api
heroku config:set MONGODB_URI="your_connection_string"
git push heroku main
```

### Frontend Deployment

Update `VITE_API_URL` in `.env` to point to your deployed backend:

```env
VITE_API_URL=https://your-backend-url.com/api
```

Then deploy to Vercel/Netlify as usual.

## 📊 Database Indexes

The following indexes are created automatically:

### Profile Model
- Text index: `name`, `location`, `occupation`
- Compound index: `gender`, `age`, `religion`, `community`

### WeddingService Model
- Compound index: `category`, `rating` (descending)

### BlogPost Model
- Text index: `title`, `content`
- Compound index: `category`, `date` (descending)
- Single index: `slug`

### SuccessStory Model
- Single index: `weddingDate` (descending)

## 🐛 Troubleshooting

### Cannot connect to MongoDB

1. Check internet connection
2. Verify MongoDB Atlas IP whitelist (add `0.0.0.0/0` for development)
3. Confirm credentials in `.env` file
4. Check MongoDB Atlas cluster status

### Port already in use

```bash
# Change PORT in .env file or kill the process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS errors

Update `server/index.ts` CORS configuration:

```typescript
app.use(cors({
  origin: ['http://localhost:5173', 'http://your-frontend-url.com'],
  credentials: true,
}));
```

### API returns 404

- Ensure backend server is running
- Check `VITE_API_URL` in `.env`
- Verify route paths in `server/routes/`

## 📚 Next Steps

1. **Add Authentication**
   - Implement JWT-based authentication
   - Create user registration/login
   - Protect routes with middleware

2. **Image Upload**
   - Integrate Cloudinary or AWS S3
   - Handle file uploads in controllers
   - Update schemas for cloud URLs

3. **Real-time Features**
   - Add Socket.io for live chat
   - Implement online status tracking
   - Real-time notifications

4. **Email Integration**
   - Setup Nodemailer or SendGrid
   - Send email verification
   - Contact form emails

5. **Payment Gateway**
   - Integrate Razorpay/Stripe
   - Handle premium subscriptions
   - Process service bookings

6. **Admin Dashboard**
   - Create admin routes
   - Profile moderation
   - Analytics and reports

## 🤝 Contributing

When adding new features:

1. Create new model in `server/models/`
2. Create controller in `server/controllers/`
3. Create routes in `server/routes/`
4. Register routes in `server/index.ts`
5. Update `src/services/api.ts` with new methods
6. Test API endpoints before frontend integration

---

**Need Help?** Check the console logs for detailed error messages. The backend server logs all requests and errors for debugging.
