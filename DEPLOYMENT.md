# 🚀 Deploy to Vercel

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/lagna-sohalaa-demo)

---

## Prerequisites

Before deploying to Vercel, ensure you have:

1. ✅ **Vercel Account** - [Sign up](https://vercel.com/signup) for free
2. ✅ **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas/register) for free
3. ✅ **GitHub/GitLab/Bitbucket Repository** - Push your code to a Git repository

---

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

#### 1. **Connect Repository**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your Git repository
4. Select **"Lagna Sohalaa Demo"**

#### 2. **Configure Project**

Vercel will auto-detect the configuration. Verify these settings:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

#### 3. **Add Environment Variables**

Click **"Environment Variables"** and add:

```bash
# Required
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/lagna-sohalaa?retryWrites=true&w=majority

# Optional (for future authentication)
JWT_SECRET=your-super-secret-key-change-this

# Auto-configured by Vercel
VITE_API_URL=/api
NODE_ENV=production
```

**Important:** Use your actual MongoDB connection string from MongoDB Atlas.

#### 4. **Deploy**

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Your app will be live at `https://your-project.vercel.app`

---

### Method 2: Deploy via Vercel CLI

#### 1. **Install Vercel CLI**

```bash
npm install -g vercel
```

#### 2. **Login to Vercel**

```bash
vercel login
```

#### 3. **Deploy**

```bash
# Development deployment
vercel

# Production deployment
vercel --prod
```

#### 4. **Set Environment Variables**

```bash
vercel env add MONGODB_URI
# Paste your MongoDB connection string when prompted

vercel env add JWT_SECRET
# Enter a secure secret key
```

---

## MongoDB Atlas Setup

### 1. **Create Cluster**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a **FREE M0 cluster**
3. Choose a cloud provider (AWS/Google/Azure)
4. Select a region close to your users

### 2. **Create Database User**

1. Go to **Database Access**
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Username: `lagna_user` (or your choice)
5. Password: Generate a secure password
6. Set role: **Read and write to any database**

### 3. **Whitelist IP Addresses**

1. Go to **Network Access**
2. Click **"Add IP Address"**
3. Select **"Allow access from anywhere"** (0.0.0.0/0)
   - This is required for Vercel's serverless functions
   - MongoDB Atlas has built-in security, so this is safe

### 4. **Get Connection String**

1. Go to **Database** → **Connect**
2. Choose **"Connect your application"**
3. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<username>` and `<password>` with your credentials
5. Add database name: `/lagna-sohalaa`
   ```
   mongodb+srv://lagna_user:yourpassword@cluster0.xxxxx.mongodb.net/lagna-sohalaa?retryWrites=true&w=majority
   ```

---

## Post-Deployment

### 1. **Seed Database (Optional)**

You can seed the database from your local machine:

```bash
# Set environment variable
export MONGODB_URI="your-production-mongodb-uri"

# Run seed script
npm run seed
```

Or create an API endpoint to seed data remotely.

### 2. **Test Your Deployment**

Visit your deployed app:

```
https://your-project.vercel.app
```

Test these pages:
- ✅ Homepage
- ✅ Matrimony page (profiles load from MongoDB)
- ✅ Registration (creates user in MongoDB)
- ✅ Login (authenticates against MongoDB)
- ✅ Create Profile (saves to MongoDB)

### 3. **Custom Domain (Optional)**

1. Go to your Vercel project settings
2. Navigate to **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

---

## Project Structure for Vercel

```
lagna-sohalaa-demo/
├── api/                    # Vercel Serverless Functions
│   └── index.js           # API entry point
├── server/                # Express backend code
│   ├── config/
│   ├── controllers/
│   ├── models/
│   └── routes/
├── src/                   # React frontend
├── public/
├── dist/                  # Build output (auto-generated)
├── vercel.json            # Vercel configuration
├── .vercelignore          # Files to ignore
├── package.json
└── vite.config.ts
```

---

## Vercel Configuration Explained

### `vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

**What it does:**
- Builds the Vite frontend → `dist/`
- Routes `/api/*` → serverless backend
- Routes everything else → React SPA

---

## Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution:**
1. Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
2. Verify connection string in Vercel environment variables
3. Ensure database user has correct permissions
4. Check MongoDB cluster is active

### Issue: "API routes return 404"

**Solution:**
1. Verify `vercel.json` routes configuration
2. Check that `/api/index.js` exists
3. Redeploy the project

### Issue: "Build fails"

**Solution:**
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify TypeScript compiles locally: `npm run build`
4. Check for missing environment variables

### Issue: "Serverless function timeout"

**Solution:**
1. Optimize MongoDB queries
2. Add database connection pooling (already configured)
3. Increase timeout in `vercel.json` (max 10s on free plan)

### Issue: "CORS errors"

**Solution:**
1. Vercel auto-configures CORS for same domain
2. For custom domains, update CORS in `api/index.js`
3. Add your domain to allowed origins

---

## Performance Optimization

### 1. **Database Indexing**

Ensure indexes are set on frequently queried fields:
- Users: `email`, `phone`
- Profiles: `gender`, `age`, `religion`, `location`

### 2. **Image Optimization**

Consider using:
- Vercel Image Optimization
- Cloudinary for profile images
- WebP format for better compression

### 3. **Caching**

Add cache headers in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 4. **Cold Starts**

Serverless functions may have cold starts. To minimize:
- Keep functions lightweight
- Reuse database connections (already configured)
- Consider Vercel Pro for faster cold starts

---

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGODB_URI` | ✅ Yes | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | ⚠️ Recommended | Secret for JWT tokens | `your-secret-key` |
| `VITE_API_URL` | ✅ Yes | API base URL | `/api` (auto-set) |
| `NODE_ENV` | ✅ Yes | Environment | `production` (auto-set) |
| `PORT` | ❌ No | Server port | Vercel handles this |

---

## Monitoring & Analytics

### Vercel Analytics (Free)

1. Go to project settings
2. Enable **"Analytics"**
3. View real-time traffic, performance metrics

### MongoDB Atlas Monitoring

1. Check database metrics in Atlas dashboard
2. Set up alerts for:
   - High CPU usage
   - Connection limits
   - Storage capacity

---

## Cost Estimation

### Free Tier Includes:

**Vercel:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Serverless functions (100GB-hrs)
- ✅ Automatic HTTPS
- ✅ Custom domains

**MongoDB Atlas:**
- ✅ 512MB storage
- ✅ Shared RAM
- ✅ Sufficient for 1000s of profiles

**Estimated Cost:** $0/month for small-medium traffic

---

## Security Checklist

Before going live:

- ✅ Use environment variables for secrets
- ✅ Enable HTTPS (automatic on Vercel)
- ✅ Implement rate limiting (consider Vercel Edge Config)
- ✅ Add password hashing (bcrypt) for production
- ✅ Implement JWT authentication
- ✅ Enable MongoDB IP whitelist (0.0.0.0/0 for Vercel)
- ✅ Add input validation and sanitization
- ✅ Set up error monitoring (Sentry recommended)

---

## Continuous Deployment

Every push to your main branch will:

1. ✅ Automatically trigger a new deployment
2. ✅ Run tests (if configured)
3. ✅ Build the project
4. ✅ Deploy to production
5. ✅ Update your live site

Preview deployments are created for pull requests!

---

## Support & Resources

- 📚 [Vercel Documentation](https://vercel.com/docs)
- 📚 [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- 💬 [Vercel Discord](https://vercel.com/discord)
- 💬 [MongoDB Community](https://www.mongodb.com/community)

---

## Quick Commands

```bash
# Deploy to production
vercel --prod

# View logs
vercel logs

# Open project in browser
vercel open

# List deployments
vercel list

# Remove deployment
vercel remove [deployment-url]
```

---

**🎉 Your Lagna Sohalaa app is now live on Vercel!**

Share your deployment URL and start helping people find their perfect match! ❤️
