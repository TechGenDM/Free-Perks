# FreePerks

A robust, high-performance web directory that aggregates free AI tools, software, hosting, cloud credits, and perks specifically for student developers.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Database:** MongoDB & Mongoose
- **Styling:** Tailwind CSS & Vanilla CSS
- **State Management:** Zustand
- **Animations:** Framer Motion

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy `.env.example` to `.env.local` and add your MongoDB connection string and a secret key for admin access.
   ```bash
   cp .env.example .env.local
   ```

3. **Seed Database (Optional):**
   ```bash
   npm run seed
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

## Admin Access
To access the admin panel at `/admin`, you must authenticate using the `ADMIN_SECRET` defined in your `.env.local` file.
