const { supabaseBrowserClient, supabaseUrl } = require("./supabase/client");
const supabase = supabaseBrowserClient();

const getAllURLs = async () => {
    const { data, error } = await supabase.from("urls").select("*");

    if (error) {
        console.log("error fetching urls-", error?.message || error);
        throw new Error(error?.message || error);
    }

    return data;
}
const getAllClicks = async () => {
    const { data, error } = await supabase.from("clicks").select("*");

    if (error) {
        console.log("error fetching urls-", error?.message || error);
        throw new Error(error?.message || error);
    }

    return data;
}
const getAllUsers = async () => {
    const { data, error } = await supabase.rpc('get_total_users');

    if (error) {
        console.log("error fetching urls-", error?.message || error);
        throw new Error(error?.message || error);
    }

    return data;
}


export { getAllURLs, getAllClicks, getAllUsers }