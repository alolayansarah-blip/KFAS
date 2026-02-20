import { NextResponse } from "next/server";

const PURE_API_URL = "https://pure.kfas.org.kw/ws/api";
const API_KEY = process.env.PURE_API_KEY || "181b5f03-d95d-47be-9fe8-96342b42deab";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
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
          return { value: 0, label: endpoint.label };
        }

        const data = await response.json();
        return { value: data?.count ?? 0, label: endpoint.label };
      } catch (error) {
        console.error(` Error fetching ${endpoint.label}:`, error);
        return { value: 0, label: endpoint.label };
      }
    });

    const allData = await Promise.all(promises);

    // Build stats array
    const stats = allData.map((data) => ({
      value: Number(data?.value) || 0,
      label: data.label,
    }));

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error(" Critical error in API route:", error);

    // Return fallback data
    const fallbackStats = [
      { value: 0, label: "Profiles" },
      { value: 0, label: "Organizations" },
      { value: 0, label: "Research Outputs" },
      { value: 0, label: "Projects" },
      { value: 0, label: "Impacts" },
      { value: 0, label: "Prizes" },
      { value: 0, label: "Equipment" },
    ];

    return NextResponse.json(fallbackStats, {
      status: 200,
      headers: {
        "X-Error": "true",
      },
    });
  }
}
