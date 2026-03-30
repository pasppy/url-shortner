"use client"
import useAuth from "@/hooks/useAuth";
import { storeClicksAndRedirect } from "@/lib/apiClicks";
import { getLongUrl } from "@/lib/apiUrls";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
    const { id } = useParams();
    const [originalUrl, setOriginalUrl] = useState("");
    const { loading, error, data, fn } = useAuth(getLongUrl, id);
    const { loading: loadingStats, error: errorStats, fn: fnStoreStatsAndRedirect } = useAuth(storeClicksAndRedirect, {
        id: data?.id,
        original_url: data?.original_url
    });

    useEffect(() => {
        // get longUrl
        fn();
    }, []);


    useEffect(() => {
        // store clicks and redirect 
        if (!loading && data) {
            setOriginalUrl(data?.original_url)
            fnStoreStatsAndRedirect()
        }
    }, [loading]);

    if (loading && loadingStats)
        return (
            <div className="mt-32 flex flex-col gap-2 justify-center items-center">
                <BarLoader width={"70%"} color='#5333ec' />
            </div>
        )
    if (error || errorStats) return (<div className="mt-32 text-xl md:text-2xl   font-extrabold flex flex-col gap-2 justify-center items-center"> {error?.message || error || errorStats?.message || error}</div>)

    if (!loadingStats)
        return (
            <div className="mt-32 text-xl lg:text-2xl font-extrabold flex flex-col md:flex-row gap-2 justify-center items-center">Redirecting to <span className="font-medium italic break-all text-center">{originalUrl}</span></div>)
}

export default RedirectLink