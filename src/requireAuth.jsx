"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useContext, useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import { urlContext } from './context';

const RequireAuthContent = ({ children }) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const longUrl = searchParams.get("createNew");
    const { loading, isAuthenticated } = useContext(urlContext);

    useEffect(() => {

        if (!isAuthenticated && !loading)
            router.replace(`/auth?${longUrl ? `createNew=${longUrl}` : ""}`)

    }, [isAuthenticated, loading])

    if (loading)
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <BarLoader width={"10%"} color='#5333ec' />
            </div>
        )

    if (!isAuthenticated)
        return null;

    return children

}

const RequireAuth = ({ children }) => {
    return (
        <Suspense>
            <RequireAuthContent children={children} />
        </Suspense>
    )
}

export default RequireAuth