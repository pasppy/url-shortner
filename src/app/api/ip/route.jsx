const ipApi = process.env.NEXT_PUBLIC_IP_API

/**
 * @route GET /api/ip
 * @desc get user's network details
 * @access Public
 */
export async function GET() {
    const res = await fetch(ipApi);
    const data = await res.json();

    return Response.json(data);
}
