
const { supabaseBrowserClient, supabaseUrl } = require("./supabase/client");
const supabase = supabaseBrowserClient();

const getUrls = async (userId) => {
    const { data, error } = await supabase.from("urls").select("*").eq("user_id", userId);

    if (error) {
        console.log("error fetching urls-", error?.message || error);
        throw new Error(error?.message || error);
    }

    return data;
}

const getUrlWithId = async ({ id, userId }) => {
    const { data, error } = await supabase.from("urls").select("*").eq("id", id).eq("user_id", userId).maybeSingle();

    if (error) {
        console.log("short link error-", error?.message || error);
        throw new Error("Something went wrong");
    }

    if (!data) {
        console.log("short link not found-", error?.message || error);
        throw new Error("Short link not found");
    }

    return data;
}

const deleteUrl = async (id) => {
    const { data, error } = await supabase.from("urls").delete().eq("id", id);

    if (error) {
        console.log("can't delete url-", error?.message || error);
        throw new Error(error?.message || error);
    }

    return data;
}


const getLongUrl = async (id) => {
    const { data, error } = await supabase.from("urls").select("id, original_url").or(`short_url.eq.${id},custom_url.eq.${id}`).maybeSingle();

    if (error) {
        console.log("error getting url-", error?.message || error);
        throw new Error("Something went wrong");
    }

    if (!data) {
        throw new Error("Invalid link");
    }

    return data;
}

const createUrl = async ({ title, original_url, custom_url, user_id }, qrcode) => {

    const short_url = Math.random().toString(36).substring(2, 8);
    const fileName = `qr-${short_url}`

    const { error: uploadError } = await supabase.storage.from("qr_codes").upload(fileName, qrcode)

    if (uploadError) throw new Error(uploadError.message);

    const qr = `${supabaseUrl}/storage/v1/object/public/qr_codes/${fileName}`

    const { data, error } = await supabase.from("urls").insert([{
        title,
        original_url,
        custom_url: custom_url || short_url,
        short_url,
        user_id,
        qr
    }]).select();

    if (error) {
        console.log(error?.message || error);
        throw new Error(error?.message || error);
    }

    return data;
}

export { getUrls, deleteUrl, createUrl, getLongUrl, getUrlWithId }