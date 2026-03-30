import { UAParser } from "ua-parser-js";

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

        // fetch user network info 
        const res = await fetch("/api/ip");
        const test = await res.json();

        let city = "Unknown";
        let country = "Unknown";

        if (res.ok) {
            console.log(res, test);
            return;
            const data = await res.json();
            city = data?.city || city;
            country = data?.country || country;
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