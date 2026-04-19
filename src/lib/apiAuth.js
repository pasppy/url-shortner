const { supabaseBrowserClient, supabaseUrl } = require("./supabase/client");
const supabase = supabaseBrowserClient();

const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email, password
    })

    if (error) throw new Error(error?.message || error);

    return data;
}

const currentUser = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (!data.session) return null;
    if (error) throw new Error(error?.message || error);

    const { data: res } = supabase.storage
        .from("profile_pic")
        .getPublicUrl(data?.session?.user?.user_metadata?.profile_pic);
    const publicUrl = res.publicUrl;

    return { profile_pic: publicUrl, user: data?.session?.user };
}

const signUp = async ({ email, password, name, profile_pic }) => {
    const ext = profile_pic?.name.split(".").pop();

    const fileName = `db-${name.toLowerCase().split(" ").join("-")}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}.${ext}`

    const { error: storageError } = await supabase.storage.from('profile_pic').upload(fileName, profile_pic)

    if (storageError) throw new Error(storageError.message)

    const profilePicPath = fileName
    const { data, error } = await supabase.auth.signUp({
        email, password,
        options: {
            data: {
                name,
                profile_pic: profilePicPath
            }
        }
    })
    if (error) throw new Error(error?.message || error);

    return data;
}

const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error?.message || error);
}


export { login, currentUser, signUp, logout, update } 