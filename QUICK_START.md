# 🚀 Quick Start Guide - MongoDB Integration

## ✅ What's Been Set Up

Your Lagna Sohalaa project now has a complete full-stack architecture with MongoDB Atlas integration!

### Backend Components Created:
- ✅ Express server with TypeScript
- ✅ MongoDB connection configured
- ✅ 5 Mongoose models (Profile, Service, Blog, Story, Pricing)
- ✅ 5 REST API controllers with CRUD operations
- ✅ 5 API route handlers
- ✅ Database seeded with initial data
- ✅ API service for frontend integration

### Files Created/Modified:

**Backend Files:**
```
server/
├── config/database.ts
├── models/ (5 files)
├── controllers/ (5 files)
├── routes/ (5 files)
├── index.ts
└── seed.ts

.env (with your MongoDB connection string)
.env.example
tsconfig.server.json
BACKEND_SETUP.md (comprehensive documentation)
```

**Frontend Files:**
```
src/services/api.ts (API integration service)
```

**Configuration:**
- package.json (updated with backend scripts)
- .gitignore (protects .env file)

## 📊 Database Status

**Connected to:** MongoDB Atlas Cluster0
**Database Name:** lagna-sohalaa

**Data Seeded:**
- 6 Profiles (3 male, 3 female)
- 8 Wedding Services
- 6 Blog Posts  
- 3 Success Stories
- 3 Pricing Plans

## 🎯 How to Use

### 1. Backend Server (Already Running)

Your backend server is currently running on:
- **API URL:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/health

To restart the server:
```bash
npm run server
```

### 2. Test the API

Open your browser or Postman and test these endpoints:

**Get all profiles:**
```
http://localhost:5000/api/profiles
```

**Get profile stats:**
```
http://localhost:5000/api/profiles/stats
```

**Get wedding services:**
```
http://localhost:5000/api/services
```

**Get blog posts:**
```
http://localhost:5000/api/blog
```

**Get success stories:**
```
http://localhost:5000/api/stories
```

**Get pricing plans:**
```
http://localhost:5000/api/pricing
```

### 3. Frontend Integration

Your frontend can now use the API service. Here's an example:

```typescript
// In any page component
import { useEffect, useState } from 'react';
import api from '../services/api';

function MatrimonyPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await api.getProfiles({
          gender: 'female',
          verified: true,
          page: 1,
          limit: 12
        });
        setProfiles(response.data || []);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  // Rest of your component...
}
```

### 4. Run Frontend and Backend Together

```bash
npm run dev:full
```

This runs both servers concurrently:
- Frontend: http://localhost:5173 or http://localhost:5174
- Backend: http://localhost:5000

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend only |
| `npm run server` | Start backend only |
| `npm run seed` | Seed database with initial data |
| `npm run dev:full` | Run frontend + backend together |
| `npm run build` | Build for production |

## 📡 API Endpoints Summary

### Profiles
- `GET /api/profiles` - List with filters
- `GET /api/profiles/stats` - Statistics
- `GET /api/profiles/:id` - Single profile
- `POST /api/profiles` - Create new
- `PUT /api/profiles/:id` - Update
- `DELETE /api/profiles/:id` - Delete

### Services, Blog, Stories, Pricing
Similar CRUD endpoints for each resource type.

See [BACKEND_SETUP.md](BACKEND_SETUP.md) for complete API documentation.

## 🔐 Environment Variables

Your `.env` file is configured with:
```env
MONGODB_URI=mongodb+srv://aniketjagtap2110_db_user:***@cluster0.oidlgrg.mongodb.net/lagna-sohalaa
PORT=5000
VITE_API_URL=http://localhost:5000/api
```

**Security Note:** `.env` is in `.gitignore` and won't be committed to Git.

## 📝 Next Steps to Integrate Frontend

### Option 1: Update Pages Gradually

Update one page at a time to use the API:

1. **MatrimonyPage.tsx** - Replace mock profiles with API call
2. **ServicesPage.tsx** - Fetch services from API
3. **BlogPage.tsx** - Load blog posts from API
4. **SuccessStoriesPage.tsx** - Get stories from API
5. **PricingPage.tsx** - Fetch pricing plans from API

### Option 2: Keep Mock Data for Demo

Keep using mock data in `src/data/mockData.ts` for the demo, and use the API only when needed (e.g., for admin panel or user actions).

### Option 3: Hybrid Approach (Recommended)

Use API for:
- ✅ Dynamic data (profiles, services)
- ✅ User actions (create, update, delete)
- ✅ Search and filtering

Use mock data for:
- ✅ Static content (about page, success stories)
- ✅ Fast demo without backend dependency

## 🧪 Testing the Integration

1. **Start both servers:**
   ```bash
   npm run dev:full
   ```

2. **Test API in browser console:**
   ```javascript
   // Open browser console on http://localhost:5173
   
   // Test getting profiles
   const response = await fetch('http://localhost:5000/api/profiles');
   const data = await response.json();
   console.log(data);
   ```

3. **Check Network tab:**
   - Open DevTools > Network
   - Refresh the page
   - Look for API calls to localhost:5000

## 🛠️ Troubleshooting

### Server not starting?
```bash
# Check if port 5000 is already in use
netstat -ano | findstr :5000

# Kill the process if needed
taskkill /PID <PID> /F
```

### Can't connect to MongoDB?
1. Check MongoDB Atlas dashboard
2. Verify IP whitelist includes your IP
3. Confirm credentials in `.env`

### CORS errors?
Update `server/index.ts` to include your frontend URL:
```typescript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));
```

### Need to reseed database?
```bash
npm run seed
```

This will clear existing data and add fresh seed data.

## 📚 Documentation

- **[BACKEND_SETUP.md](BACKEND_SETUP.md)** - Complete backend documentation
- **[README.md](README.md)** - Project overview
- **[PROJECT_ANALYSIS.md](PROJECT_ANALYSIS.md)** - Full feature analysis

## 🎉 Summary

You now have:
- ✅ MongoDB Atlas database with data
- ✅ Express REST API running on port 5000
- ✅ 5 resource types with full CRUD operations
- ✅ Frontend API service ready to use
- ✅ Development and production scripts
- ✅ Comprehensive documentation

**Your API is live and ready to use!** 🚀

Test it now: [http://localhost:5000/health](http://localhost:5000/health)

---

**Need Help?** Check the console logs or read [BACKEND_SETUP.md](BACKEND_SETUP.md) for detailed information.
