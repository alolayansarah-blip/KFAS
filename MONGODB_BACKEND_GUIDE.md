# Step-by-Step: MongoDB Backend + Next.js Frontend

This guide walks you through creating a backend with MongoDB and connecting it to your Next.js frontend. We'll use the **newsletter signup** feature as a practical example.

---

## Part 1: Set Up MongoDB

### Option A: MongoDB Atlas (Cloud - Recommended)

1. **Create a free account**
   - Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up with email or Google

2. **Create a cluster**
   - Click "Build a Database"
   - Choose "M0 FREE" tier
   - Select a region (e.g. AWS, closest to your users)
   - Click "Create"

3. **Create a database user**
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Username: `kfas_admin` (or any name)
   - Password: Generate a strong password and **save it**
   - Role: "Atlas Admin" or "Read and write to any database"
   - Click "Add User"

4. **Allow network access**
   - Go to "Network Access" → "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add only your server IP
   - Click "Confirm"

5. **Get your connection string**
   - Go to "Database" → "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string like:
     ```
     mongodb+srv://kfas_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password

---

### Option B: MongoDB Local (Your Computer)

1. Install MongoDB Community: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Connection string: `mongodb://localhost:27017`
3. Database name: `kfastest`

---

## Part 2: Install Dependencies

```bash
npm install mongodb
```

Or if you prefer Mongoose (adds schema validation):

```bash
npm install mongoose
```

---

## Part 3: Environment Variables

Create or edit `.env.local` in your project root:

```env
# MongoDB Connection (MongoDB Atlas)
MONGODB_URI=mongodb+srv://kfas_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/kfastest?retryWrites=true&w=majority

# For local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/kfastest
```

**Important:** Add `.env.local` to `.gitignore` (Next.js does this by default) so you never commit secrets.

---

## Part 4: Create MongoDB Connection Utility

Create `lib/mongodb.ts`:

```typescript
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Please add MONGODB_URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to preserve the connection
  const globalWithMongo = global as typeof globalThis & { _mongoClientPromise?: Promise<MongoClient> };
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
```

---

## Part 5: Create the API Route (Backend)

Create `app/api/newsletter/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("kfastest");
    const collection = db.collection("newsletter_subscribers");

    // Check if email already exists
    const existing = await collection.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { message: "You are already subscribed!" },
        { status: 200 }
      );
    }

    // Insert new subscriber
    await collection.insertOne({
      email: email.toLowerCase(),
      subscribedAt: new Date(),
      source: "footer",
    });

    return NextResponse.json(
      { message: "Thank you! You will receive updates from KFAS." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}
```

---

## Part 6: Connect the Frontend

In your Footer component (or any client component):

```typescript
"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to subscribe");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        disabled={status === "loading"}
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
```

---

## Part 7: Data Flow Diagram

```
┌─────────────────┐     POST /api/newsletter     ┌─────────────────┐
│   Frontend       │  ─────────────────────────►  │   Next.js API    │
│   (Footer form)  │     { email: "user@..." }    │   Route          │
└─────────────────┘                              └────────┬─────────┘
                                                          │
                                                          │ client.db()
                                                          │ .insertOne()
                                                          ▼
┌─────────────────┐                              ┌─────────────────┐
│   User sees     │  ◄─────────────────────────  │   MongoDB        │
│   success msg   │     { message: "Thank you" } │   Collection     │
└─────────────────┘                              └─────────────────┘
```

---

## Part 8: View Your Data in MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Browse Collections" on your cluster
3. Database: `kfastest`
4. Collection: `newsletter_subscribers`
5. You'll see documents like:
   ```json
   {
     "_id": "...",
     "email": "user@example.com",
     "subscribedAt": "2025-02-12T...",
     "source": "footer"
   }
   ```

---

## Part 9: Security Best Practices

1. **Never commit** `.env.local` or connection strings
2. **Validate input** on the server (we check email format)
3. **Rate limit** the API to prevent abuse (e.g. via `@upstash/ratelimit`)
4. **Add CAPTCHA** (e.g. reCAPTCHA) for production to block bots

---

## Part 10: Quick Reference

| Step | What | Where |
|------|------|-------|
| 1 | MongoDB connection | `lib/mongodb.ts` |
| 2 | API route (backend) | `app/api/newsletter/route.ts` |
| 3 | Form component (frontend) | `components/Footer.tsx` or separate component |
| 4 | Environment variable | `.env.local` → `MONGODB_URI` |

---

## Part 11: Get Google Maps Embed URL

Your map link: https://maps.app.goo.gl/ahSd2JURuochJzC17

To embed it:
1. Open the link in your browser
2. Click the **Share** button
3. Click **Embed a map**
4. Copy the `src` from the iframe (starts with `https://www.google.com/maps/embed?pb=...`)

---

## Troubleshooting

- **"MongoServerError: bad auth"** → Wrong credentials in `.env.local`
- **"Connection timeout"** → Check Network Access in Atlas (allow your IP)
- **"Cannot find module 'mongodb'"** → Run `npm install mongodb`
- **API returns 500** → Check server logs: `npm run dev` and look at terminal output
