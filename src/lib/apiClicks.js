import { UAParser } from "ua-parser-js";
const isProd = process.env.NODE_ENV === "production";
const { supabaseBrowserClient } = require("./supabase/client");
const supabase = supabaseBrowserClient();

const getClicks = async (urlIds) => {
    const { data, error } = await supabase.from("clicks").select("*").in("url_id", urlIds);

    if (error) {
        console.log("error getting stats-", error?.message || error);
        throw new Error("Unable to load stats");
    }

    return data;
}

const parser = new UAParser();
const storeClicksAndRedirect = async ({ id, original_url }) => {

    try {
        // get device info
        const device = parser.getResult()?.device?.type || "desktop"
        let city = 'unknown', country = 'unknown';

        if (!isProd) {
            // fetch user network info 
            const res = await fetch("https://ipapi.co");
            const { city, country_name } = await res.json();
            city = city;
            country = country_name;
        }
        else {
            const res = await fetch("/api/ip");
            const { city, country } = await res.json();
            city = city;
            country = country;
        }


        // create entry
        await supabase.from("clicks").insert([{
            url_id: id,
            city,
            country,
            device
        }])

    } catch (error) {
        console.log("error storing clicks-", error?.error || error);
    }

    // always redirect to original url
    window.location.href = original_url;
}

export { getClicks, storeClicksAndRedirect }