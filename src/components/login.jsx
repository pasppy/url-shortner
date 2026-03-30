import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import DisplayError from './error'
import * as Yup from "yup"
import useAuth from '@/hooks/useAuth'
import { login } from '@/lib/apiAuth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTheme } from 'next-themes'

const Login = () => {
    const { theme } = useTheme();
    const router = useRouter();
    const searchParams = useSearchParams();
    const longUrl = searchParams.get("createNew");
    const [actionLoading, setActionLoading] = useState(false);

    const [validationError, setValidationError] = useState({})
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    // custom supabase auth hook
    const { data, error, fn: fnLogin } = useAuth(login, formData);

    useEffect(() => {
        if (data) {
            router.replace(`/dashboard?${longUrl ? `createNew=${longUrl}` : ""}`)
        }

    }, [data])

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleLogin = async () => {
        setValidationError({});
        setActionLoading(true);

        try {
            const schema = Yup.object().shape({
                email: Yup.string().email("Enter a valid email").required(),
                password: Yup.string().min(6, "Password must be at least 6 characters").required()
            })

            await schema.validate(formData, { abortEarly: false });

            // if all data correct make api call
            await fnLogin();

        } catch (error) {
            const newError = {}
            error?.inner?.forEach((e) => {
                newError[e.path] = e.message
            })

            setValidationError(newError);
        }
        setActionLoading(false);
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login to your account.</CardDescription>
                    {error?.message && <DisplayError message={error?.message} />}
                </CardHeader>

                <CardContent className={"space-y-3"}>
                    <div className='space-y-2'>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" value={formData.email} onChange={handleInputChange} type={"text"} placeholder={"Enter your email"} />
                        {validationError?.email && <DisplayError message={validationError?.email} />}
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" value={formData.password} onChange={handleInputChange} type={"password"} placeholder={"Enter your password"} />
                        {validationError?.password && <DisplayError message={validationError?.password} />}
                    </div>
                </CardContent>

                <CardFooter>
                    <Button disabled={actionLoading} onClick={handleLogin}>
                        {actionLoading ? <BeatLoader size={8} color={theme === "dark" ? "black" : "white"} /> : "Login"}
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default Login