"use server";

import { headers } from "next/headers";

interface RedditEventProps {
  eventName: string;
  conversionId: string;
  email?: string;
  value?: number;
}

export async function sendRedditEvent({ eventName, conversionId, email, value }: RedditEventProps) {
  const token = process.env.REDDIT_CAPI_KEY;
  const pixelId = process.env.NEXT_PUBLIC_PIXEL_ID;

  if (!token || !pixelId) {
    console.error("Missing Reddit CAPI credentials");
    return;
  }

  // Extract IP and User Agent to improve Reddit's matching algorithm
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip");
  const userAgent = headersList.get("user-agent");

  const payload = {
    // test_mode: true, // Uncomment this while testing to prevent messing up live ad data
    events: [
      {
        event_at: new Date().toISOString(),
        tracking_type: eventName,
        conversion_id: conversionId, 
        user: {
          email: email,
          ip: ip,
          user_agent: userAgent,
        },
        event_metadata: value ? { value: value, currency: "USD" } : undefined,
      }
    ]
  };

  try {
    const response = await fetch(`https://ads-api.reddit.com/api/v2.0/conversions/events/${pixelId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Reddit CAPI Error:", errorData);
    }
  } catch (error) {
    console.error("Failed to send to Reddit CAPI", error);
  }
}