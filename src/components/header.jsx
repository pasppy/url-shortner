"use client"

import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon, LogOut, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { urlContext } from '@/context'
import useAuth from '@/hooks/useAuth'
import { logout } from '@/lib/apiAuth'


const Header = () => {
    const router = useRouter();
    const { data } = useContext(urlContext);
    const { fn: fnLogout } = useAuth(logout);
    const { resolvedTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false)

    const handleLogout = async () => {
        await fnLogout();
    }

    useEffect(() => {
        setMounted(true);

    }, [])

    if (!mounted) return null;

    return (
        <>
            < nav className=' py-4 flex justify-between items-center mb-6' >
                <Link href={"/"}>
                    <img src="/link-off.svg" className='h-10' alt="" />
                </Link>
                <div className='flex items-center gap-4'>
                    <Button size='icon-lg' variant='outline' className='cursor-pointer' onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {
                            resolvedTheme === "light" ? <SunIcon /> : <MoonIcon />
                        }
                    </Button>
                    {!data?.user ?
                        <Button onClick={() => router.push("/auth")} size='lg'>Login</Button>
                        :
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar size='lg'>
                                    <AvatarImage src={data?.profile_pic} className={"object-cover"} />
                                    <AvatarFallback>{data?.user?.user_metadata?.name.split(" ")[0][0]}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{data?.user?.user_metadata?.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href={"/dashboard"}>
                                    <DropdownMenuItem>
                                        <LinkIcon />
                                        My Links
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className='text-red-400'
                                >
                                    <LogOut />
                                    Logout
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    }

                </div>
            </nav >
        </>

    )
}

export default Header