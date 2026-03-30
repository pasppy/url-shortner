
export async function GET(req) {
    try {
        const city = req.headers.get("x-vercel-ip-city") || "Unknown";
        const country = req.headers.get("x-vercel-ip-country") || "Unknown";

        return Response.json({ city, country });

    } catch (error) {
        console.error("IP API ERROR:", error);
        return Response.json({ error, status: 500 });
    }
}