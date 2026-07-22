import { NextResponse } from "next/server";
import { COUNTER_FALLBACKS, fallbackFor } from "@/lib/counterFallbacks";

const PURE_API_URL = "https://pure.kfas.org.kw/ws/api";
// SECURITY: the key must come from the environment only.
// Local: .env.local → PURE_API_KEY=...
// DigitalOcean: App → Settings → Environment Variables → PURE_API_KEY
const API_KEY = process.env.PURE_API_KEY;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (!API_KEY) {
    console.error(
      " PURE_API_KEY is not set — returning snapshot fallbacks. Set it in .env.local / DigitalOcean environment variables.",
    );
    return NextResponse.json(COUNTER_FALLBACKS, {
      status: 200,
      headers: { "Cache-Control": "no-store, max-age=0", "X-Fallback": "missing-key" },
    });
  }

  try {
    // Define all endpoints
    const endpoints = [
      { url: `${PURE_API_URL}/persons?size=0`, label: "Profiles" },
      { url: `${PURE_API_URL}/organizations?size=0`, label: "Organizations" },
      {
        url: `${PURE_API_URL}/research-outputs?size=0`,
        label: "Research Outputs",
      },
      { url: `${PURE_API_URL}/projects?size=0`, label: "Projects" },
      { url: `${PURE_API_URL}/impacts?size=0`, label: "Impacts" },
      { url: `${PURE_API_URL}/prizes?size=0`, label: "Prizes" },
      { url: `${PURE_API_URL}/equipment?size=0`, label: "Equipment" },
    ];

    // Fetch all data in parallel using GET method (PURE API returns 405 for POST)
    const promises = endpoints.map(async (endpoint) => {
      try {
        const response = await fetch(endpoint.url, {
          method: "GET",
          headers: { "api-key": API_KEY },
          cache: "no-store",
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            ` Failed ${endpoint.label}:`,
            response.status,
            errorText.substring(0, 200),
          );
          return { value: fallbackFor(endpoint.label), label: endpoint.label };
        }

        const data = await response.json();
        return {
          value: data?.count ?? fallbackFor(endpoint.label),
          label: endpoint.label,
        };
      } catch (error) {
        console.error(` Error fetching ${endpoint.label}:`, error);
        return { value: fallbackFor(endpoint.label), label: endpoint.label };
      }
    });

    const allData = await Promise.all(promises);

    // Build stats array — a zero from PURE is treated as invalid and
    // replaced by the real snapshot number so visitors never see zeros.
    const stats = allData.map((data) => ({
      value: Number(data?.value) || fallbackFor(data.label),
      label: data.label,
    }));

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error(" Critical error in API route:", error);

    // Return real snapshot numbers, never zeros
    return NextResponse.json(COUNTER_FALLBACKS, {
      status: 200,
      headers: {
        "X-Error": "true",
      },
    });
  }
}
