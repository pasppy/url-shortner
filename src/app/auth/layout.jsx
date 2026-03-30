"use client"
import { urlContext } from '@/context'
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useContext, useEffect } from 'react'
import { BarLoader } from 'react-spinners';

const AuthLayoutContent = ({ children }) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const longUrl = searchParams.get("createNew");
    const { loading, isAuthenticated } = useContext(urlContext)

    useEffect(() => {
        if (isAuthenticated && !loading)
            router.replace(`/dashboard?${longUrl ? `createNew=${longUrl}` : ""}`)
    }, [isAuthenticated, loading])

    if (loading)
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <BarLoader width={"10%"} color='#5333ec' />
            </div>
        )
    if (isAuthenticated)
        return null;

    return children

}


const AuthLayout = ({ children }) => {
    return (
        <Suspense>
            <AuthLayoutContent children={children} />
        </Suspense>
    )
}

export default AuthLayout