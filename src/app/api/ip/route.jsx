const ipApi = process.env.IP_API

export async function GET() {
    try {
        const res = await fetch(ipApi);

        if (!res.ok) {
            throw new Error("Failed to fetch IP data");
        }

        const data = await res.json();

        return Response.json(data);
    } catch (error) {
        console.error("IP API ERROR:", error);
        return Response.json({ error: error.message, status: 500 });
    }
}