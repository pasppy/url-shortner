"use client"
import CreateLink from "@/components/createLink"
import DisplayError from "@/components/error"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import UrlCard from "@/components/urlCard"
import { urlContext } from "@/context"
import useFetch from "@/hooks/useFetch"
import { getClicks } from "@/lib/apiClicks"
import { getUrls } from "@/lib/apiUrls"
import { Filter } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { BarLoader } from "react-spinners"

const Dashboard = () => {
    const [searchFilter, setSearchFilter] = useState("");
    const { data: userData } = useContext(urlContext);
    const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, userData?.user?.id)
    const { loadingClicks, error: errorClicks, data: clicks, fn: fnClicks } = useFetch(getClicks, urls?.map(url => url.id))

    useEffect(() => {
        fnUrls();
    }, [])

    useEffect(() => {
        if (urls?.length) fnClicks();
    }, [urls?.length])

    const filteredUrls = urls?.filter(url => url.title.toLowerCase().includes(searchFilter.toLowerCase())
    )

    return (
        <div className="flex flex-col gap-8">
            {(loading || loadingClicks) && <BarLoader width={"100%"} color='#5333ec' />}
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{urls?.length ?? 0}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{clicks?.length ?? 0}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-between">
                <h1 className="text-4xl font-extrabold">My Links</h1>
                <CreateLink />
            </div>

            <div>

                <div className="relative">
                    <Input
                        type={"text"}
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        placeholder="Search your query"
                        className={"py-5"} />
                    <Filter size={16} className="absolute top-3 right-3 " />
                </div>
                {error && <DisplayError message={error?.message} />}
            </div>
            <div className="flex flex-col gap-2">

                {(filteredUrls || []).map((url, id) => <UrlCard key={id} url={url} fetchUrls={fnUrls} />)
                }
            </div>

        </div >
    )
}

export default Dashboard