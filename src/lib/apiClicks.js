import { UAParser } from "ua-parser-js";

const { supabaseBrowserClient, supabaseUrl } = require("./supabase/client");
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

        // fetch user network info ( ip-api.com ) 
        const res = await fetch("http://ip-api.com/json");
        const { city, country } = await res.json();

        // create entry
        await supabase.from("clicks").insert([{
            url_id: id,
            city,
            country,
            device
        }])

        // redirect to original url
        window.location.href = original_url;

    } catch (error) {
        console.log("error storing clicks-", error);
    }
}

export { getClicks, storeClicksAndRedirect }