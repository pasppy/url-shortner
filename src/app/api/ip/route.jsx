
export async function GET(req) {
    const countryMap = {
        IN: "India",
        US: "United States",
    };

    try {
        let city = req.headers.get("x-vercel-ip-city") || null;
        let countryCode = req.headers.get("x-vercel-ip-country") || null;

        city = city ? decodeURIComponent(city) : "Unknown";
        const country = countryMap[countryCode] || countryCode || "Unknown";

        return Response.json({ city, country });

    } catch (error) {
        console.error("IP API ERROR:", error);
        return Response.json({ error, status: 500 });
    }
}