# TikTok Agency - Abdullah Agency

This is a [Next.js](https://nextjs.org) project with authentication, MongoDB, Cloudinary, and Redis integration.

## Features

- 🔐 NextAuth.js authentication with credentials provider
- 👤 User registration and login
- 👨‍💼 Admin user management
- 🗄️ MongoDB database integration
- ☁️ Cloudinary image upload
- ⚡ Redis caching
- 🎨 Tailwind CSS styling
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Redis server
- Cloudinary account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd abdullah-tiktokagency-master
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/your-database-name

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Redis
REDIS_URL=redis://localhost:6379
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication

### User Registration
- Visit `/auth/signup` to create a new account
- All new users are created as non-admin by default

### User Login
- Visit `/auth/login` to sign in
- Admin users will be redirected to `/dashboard`
- Regular users will be redirected to the home page

### Admin Features
- Admin users have access to the dashboard at `/dashboard`
- Admin status is stored in the `isAdmin` field of the User model

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  isAdmin: Boolean (default: false),
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

## API Routes

- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth handlers
- `GET /api/test-db` - Database connection test

## File Structure

```
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   └── register/
│   │   └── test-db/
│   ├── auth/
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/
│   └── layout.js
├── components/
│   ├── SessionProvider.js
│   └── ...
├── lib/
│   ├── mongodb.js
│   ├── cloudinary.js
│   ├── redis.js
│   └── utils.js
├── models/
│   └── User.js
├── middleware.js
├── .env.example
└── package.json
```

## Technologies Used

- **Next.js 15** - React framework
- **NextAuth.js** - Authentication
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Cloudinary** - Image hosting
- **Redis** - Caching
- **Tailwind CSS** - Styling
- **bcryptjs** - Password hashing

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [NextAuth.js Documentation](https://next-auth.js.org) - authentication setup guide.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
