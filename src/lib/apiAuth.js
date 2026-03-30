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
    return data.session?.user;
}

const signUp = async ({ email, password, name, profile_pic }) => {
    const fileName = `db-${name.toLowerCase().split(" ").join("-")}-${Math.ceil(Math.random())}`

    const { error: storageError } = await supabase.storage.from('profile_pic').upload(fileName, profile_pic)

    if (storageError) throw new Error(storageError.message)
    const profilePicUrl = `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`
    const { data, error } = await supabase.auth.signUp({
        email, password,
        options: {
            data: {
                name,
                profile_pic: profilePicUrl
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