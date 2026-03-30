
export async function GET(req) {
    const countryMap = {
        IN: "India",
        US: "United States",
        GB: "United Kingdom",
        CA: "Canada",
        AU: "Australia",
        DE: "Germany",
        FR: "France",
        IT: "Italy",
        ES: "Spain",
        NL: "Netherlands",
        SE: "Sweden",
        NO: "Norway",
        DK: "Denmark",
        FI: "Finland",
        CH: "Switzerland",
        AT: "Austria",
        BE: "Belgium",
        IE: "Ireland",
        PT: "Portugal",
        PL: "Poland",
        CZ: "Czech Republic",
        HU: "Hungary",
        RO: "Romania",
        GR: "Greece",
        TR: "Turkey",
        RU: "Russia",
        UA: "Ukraine",

        CN: "China",
        JP: "Japan",
        KR: "South Korea",
        SG: "Singapore",
        MY: "Malaysia",
        TH: "Thailand",
        ID: "Indonesia",
        PH: "Philippines",
        VN: "Vietnam",
        BD: "Bangladesh",
        PK: "Pakistan",
        LK: "Sri Lanka",
        NP: "Nepal",

        AE: "United Arab Emirates",
        SA: "Saudi Arabia",
        QA: "Qatar",
        KW: "Kuwait",
        OM: "Oman",
        IL: "Israel",
        IR: "Iran",

        ZA: "South Africa",
        NG: "Nigeria",
        KE: "Kenya",
        EG: "Egypt",
        MA: "Morocco",

        BR: "Brazil",
        AR: "Argentina",
        MX: "Mexico",
        CL: "Chile",
        CO: "Colombia",
        PE: "Peru",

        NZ: "New Zealand"
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