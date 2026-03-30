const ipApi = process.env.IP_API

/**
 * @route GET /api/ip
 * @desc get user's network details
 * @access Public
 */
export async function GET() {
    try {
        const res = await fetch(process.env.IP_API);

        if (!res.ok) {
            return Response.json({ error: "Failed to fetch IP data" }, { status: 500 });
        }

        const data = await res.json();

        return Response.json(data);

    } catch (error) {
        return Response.json({ error: "Server error", status: 500 });
    }
}
