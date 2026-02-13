import { NextRequest, NextResponse } from "next/server";
import getClientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: "Newsletter service is not configured. Add MONGODB_URI to .env.local" },
        { status: 503 }
      );
    }

    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    const db = client.db("kfastest");
    const collection = db.collection("newsletter_subscribers");

    const existing = await collection.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { message: "You are already subscribed!" },
        { status: 200 }
      );
    }

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
