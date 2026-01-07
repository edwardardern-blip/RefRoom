# 🎓 RefRoom - Student Reference Library

## ✨ Real Multi-User Platform with Live Database!

Welcome to **RefRoom** - your community-powered academic resource platform!

---

## 📦 What's In This Package:

```
refroom-final/
  ├── index.html          ← Frontend website
  ├── package.json        ← Node.js dependencies
  ├── .env               ← Supabase credentials (already configured!)
  ├── README.md          ← This file
  └── api/               ← Backend API folder
      ├── auth.js        ← Login/signup endpoint
      ├── add-reference.js ← Add resources endpoint
      ├── references.js  ← Get all resources endpoint
      └── vote-api.js    ← Voting endpoint
```

---

## 🚀 DEPLOYMENT GUIDE (Step-by-Step)

### Step 1: Clean Slate on GitHub

1. **Delete your old RefRoom2 repository:**
   - Go to: https://github.com/edwardardern-blip/RefRoom2
   - Click **Settings** (bottom of left sidebar)
   - Scroll down to "Danger Zone"
   - Click **"Delete this repository"**
   - Type the repo name to confirm
   - Delete it

2. **Create a new repository:**
   - Go to: https://github.com
   - Click **"+"** → **"New repository"**
   - Name it: **`refroom`** (all lowercase, no spaces)
   - Keep it **Public**
   - **Don't check any boxes**
   - Click **"Create repository"**

---

### Step 2: Upload Files to GitHub

**IMPORTANT: Upload files in the correct structure!**

1. **Extract this ZIP file** on your computer

2. **Go to your new repository** on GitHub

3. **Upload ALL files at once:**
   - Click **"uploading an existing file"**
   - **Drag the ENTIRE contents** of the refroom-final folder:
     - index.html
     - package.json
     - .env
     - README.md
     - **The entire `api` folder** (with all 4 .js files inside)
   
4. **Make sure the api folder uploads as a folder** (not individual files)

5. **Commit changes**

6. **Verify the structure:**
   - You should see `api` as a folder
   - Click on it - you should see 4 .js files inside

---

### Step 3: Deploy to Vercel

1. **Go to Vercel:** https://vercel.com/dashboard

2. **Delete the old ref-room2 project** (to avoid confusion):
   - Click on ref-room2
   - Settings → Delete project

3. **Create new deployment:**
   - Click **"Add New..."** → **"Project"**
   - **Import your new `refroom` repository**
   - Click **"Deploy"**

---

### Step 4: Add Environment Variables

**CRITICAL STEP - Don't skip this!**

1. Once deployed, go to your project settings
2. Click **"Environment Variables"**
3. **Add two variables:**

   **Variable 1:**
   - Key: `SUPABASE_URL`
   - Value: `https://afpqstmesnobtweysiuw.supabase.co`
   - Click "Add"

   **Variable 2:**
   - Key: `SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmcHFzdG1lc25vYnR3ZXlzaXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MzUwNjIsImV4cCI6MjA4MzMxMTA2Mn0.mTsSXwn23n1XokGr0XMSyNw2SIzzlqezFJ7MgDB8UTw`
   - Click "Add"

4. **Save the variables**

5. **Redeploy:**
   - Go to "Deployments" tab
   - Click **"..."** on the latest deployment
   - Click **"Redeploy"**
   - Wait 1 minute

---

### Step 5: Test Your Site!

1. **Visit your new URL** (something like `refroom.vercel.app`)

2. **Try these features:**
   - ✅ Click **"Login / Sign Up"**
   - ✅ Create an account with your email
   - ✅ Add a reference
   - ✅ Vote on resources
   - ✅ Open on a different device - see the same data!

---

## ✨ Features You'll Have:

- ✅ **Real user authentication** - Email/password signup
- ✅ **Shared database** - Everyone sees the same data
- ✅ **Voting system** - Upvote/downvote resources
- ✅ **Add references** - Share study materials
- ✅ **Search & filter** - Find what you need
- ✅ **Auto-refresh** - Updates every 30 seconds
- ✅ **User profiles** - Reputation points
- ✅ **Real-time** - Changes appear for everyone
- ✅ **Professional backend** - Vercel serverless functions

---

## 🎯 How It Works:

```
Your Browser  →  Vercel API  →  Supabase Database
(RefRoom UI)     (Node.js)       (PostgreSQL)
```

- **Frontend:** Pure HTML/CSS/JS (no blocking issues!)
- **Backend:** Runs on Vercel's servers (can't be blocked!)
- **Database:** Supabase PostgreSQL (already set up!)

---

## 🆘 Troubleshooting:

### Site won't load?
- Wait 2 minutes after deployment
- Hard refresh: Ctrl + Shift + R
- Check Vercel deployment status

### Can't login?
- Make sure environment variables are set in Vercel
- Check Vercel deployment logs for errors

### Can't add references?
- Make sure you're logged in
- Check browser console (F12) for errors

---

## 🎓 What's Next:

Once this is working, you can add:
- Review system with star ratings
- Tag filtering
- Moderation tools
- Email notifications
- Mobile app
- And much more!

---

## 📞 Need Help?

If something isn't working:
1. Check Vercel deployment logs
2. Check browser console (F12)
3. Make sure environment variables are set
4. Verify the `api` folder structure is correct

---

**Built with ❤️ for students, by students**

🚀 **Let's make RefRoom the best resource platform!**