"use client"
import { Button } from "@/components/ui/button";
import { urlContext } from "@/context"
import useFetch from "@/hooks/useFetch";
import { getClicks } from "@/lib/apiClicks";
import { deleteUrl, getUrlWithId } from "@/lib/apiUrls";
import { Copy, Download, LinkIcon, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react"
import { BarLoader, MoonLoader } from "react-spinners";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import LocationStats from "@/components/location-stats";
import DeviceStats from "@/components/device-stats";
const domain = process.env.
    NEXT_PUBLIC_DOMAIN_NAME

const Link = () => {
    const route = useRouter();
    const { theme } = useTheme();

    const { id } = useParams();
    const { data: userData } = useContext(urlContext);
    const { loading, data, error, fn } = useFetch(getUrlWithId, { id, userId: userData?.user?.id })
    const { loading: loadingStats, data: stats, fn: fnStats } = useFetch(getClicks, [id])
    const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);


    useEffect(() => {
        fn();
        fnStats();
    }, [])

    useEffect(() => {
        if (error) {
            route.replace("/dashboard")
        }
    }, [error])


    const handleDownload = async () => {

        const imageUrl = data?.qr;
        const fileName = data?.title;

        try {
            // creating a blob as the link is external
            const res = await fetch(imageUrl);
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);

            // create an anchor
            const anchor = document.createElement("a");
            anchor.href = blobUrl;
            anchor.download = fileName;

            // attach to root and perform click
            document.body.appendChild(anchor);
            anchor.click();

            // remove anchor from root
            document.body.removeChild(anchor);
            URL.revokeObjectURL(blobUrl)
        } catch (err) {
            console.log(err?.message || err);
        }


    }

    return (
        <>
            {(loading || loadingStats) && <BarLoader width={"100%"} color='#5333ec' />}
            <div className="flex flex-col gap-8 sm:flex-row mt-2">
                {/* url */}
                <div className="flex flex-col gap-4 flex-1">
                    <span className="text-5xl font-extrabold">{data?.title}</span>
                    <a
                        href={`${domain}${data?.custom_url || data?.short_url}`} target="_blank"
                        className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer wrap-break-word">
                        {domain}{data?.custom_url || data?.short_url}
                    </a>
                    <span className="self-start">
                        <a
                            href={data?.original_url}
                            target="_blank"
                            className="flex items-center gap-2 hover:underline  wrap-break-word"
                        >
                            <LinkIcon />

                            {data?.original_url}
                        </a>
                    </span>
                    <span className=" font-extralight text-sm">
                        {new Date(data?.created_at).toLocaleString()}
                    </span>

                    <div className='flex gap-6 mt-6'>
                        <Button
                            variant='ghost'
                            className={"scale-[140%]"}
                            onClick={() => navigator.clipboard.writeText(`${domain}${data?.custom_url || data?.short_url}`)}
                        >
                            <Copy />
                        </Button>
                        <Button
                            className={"scale-[140%]"}

                            variant='ghost'
                            onClick={handleDownload}>
                            <Download />
                        </Button>
                        <Button
                            className={"scale-[140%]"}
                            variant='ghost'
                            onClick={fnDelete}>
                            {loadingDelete ? <MoonLoader color={theme === "dark" ? "white" : "black"} size={14} /> : <Trash2 />}
                        </Button>
                    </div>

                    <img src={data?.qr} alt="qr" className="w-full text-primary  bg-secondary self-center sm:self-start ring ring-blue-500 p-1 object-contain" />

                </div>

                {/* stats */}
                <Card className="sm:w-3/5">
                    <CardHeader >
                        <CardTitle className="font-extrabold text-4xl" >Stats</CardTitle>
                    </CardHeader>
                    {stats && stats.length ?

                        <CardContent className="flex flex-col gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Total Clicks</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{stats?.length ?? 0}</p>
                                </CardContent>
                            </Card>
                            <CardTitle>Location Data</CardTitle>
                            <LocationStats stats={stats} />
                            <CardTitle>Device Info</CardTitle>
                            <DeviceStats stats={stats} />


                        </CardContent> :

                        <CardContent>
                            <p>{loading ? "Loading statistics..." : "No statistics yet"}</p>
                        </CardContent>
                    }

                </Card>
            </div>
        </>

    )
}

export default Link