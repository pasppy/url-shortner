"use client"
import { createContext, useContext, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { currentUser } from "./lib/apiAuth";
import { supabaseBrowserClient } from "./lib/supabase/client";

const urlContext = createContext();

export default function UrlProvider({ children }) {
    const supabase = supabaseBrowserClient();
    const { data, loading, fn: fetchUser } = useAuth(currentUser);
    const isAuthenticated = !!data;

    useEffect(() => {
        fetchUser();
        const { data: listener } = supabase.auth.onAuthStateChange(() => {
            fetchUser()
        })

        return () => listener.subscription.unsubscribe()
    }, [])


    return <urlContext.Provider value={{ data, isAuthenticated, loading, fetchUser }}>
        {children}
    </urlContext.Provider>
}

export { urlContext };