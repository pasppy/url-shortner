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
import { signUp } from '@/lib/apiAuth'
import { useRouter, useSearchParams } from 'next/navigation'

const Signup = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const longUrl = searchParams.get("createNew");
    const [actionLoading, setActionLoading] = useState(false);

    const [validationError, setValidationError] = useState({})
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        profile_pic: null
    })

    // custom supabase auth hook
    const { data, error, fn: fnSignup } = useAuth(signUp, formData);

    useEffect(() => {
        if (data) {
            router.replace(`/dashboard?${longUrl ? `createNew=${longUrl}` : ""}`)
        }
    }, [data])

    const handleInputChange = (e) => {
        const { name, value, files } = e.target

        setFormData((prev) => ({
            ...prev, [name]: files ? files[0] : value
        }))
    }

    const handleSignup = async () => {
        setValidationError({});
        setActionLoading(true);

        try {
            const schema = Yup.object().shape({

                name: Yup.string().required(),
                email: Yup.string().email("Enter a valid email").required(),
                password: Yup.string().min(6, "Password must be at least 6 characters").required(),
                profile_pic: Yup.mixed().required()
            })

            await schema.validate(formData, { abortEarly: false });

            // if all data correct make api call
            await fnSignup();

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
                    <CardTitle>SignUp</CardTitle>
                    <CardDescription>Create a new account.</CardDescription>
                    {error?.message && <DisplayError message={error?.message} />}
                </CardHeader>

                <CardContent className={"space-y-3"}>
                    <div className='space-y-2'>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            onChange={handleInputChange}
                            type={"text"}
                            placeholder={"Enter your name"}
                        />
                        {validationError?.name && <DisplayError message={validationError?.name} />}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            onChange={handleInputChange}
                            type={"email"}
                            placeholder={"Enter your email"}
                        />
                        {validationError?.email && <DisplayError message={validationError?.email} />}
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            onChange={handleInputChange}
                            type={"password"}
                            placeholder={"Enter your password"}
                        />
                        {validationError?.password && <DisplayError message={validationError?.password} />}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="profile_pic">Profile Image</Label>
                        <Input
                            id="profile_pic"
                            name="profile_pic"
                            onChange={handleInputChange}
                            type={"file"}
                            accept={"image/*"}
                        />
                        {validationError?.profile_pic && <DisplayError message={validationError?.profile_pic} />}
                    </div>


                </CardContent>

                <CardFooter>
                    <Button disabled={actionLoading} onClick={handleSignup}>{actionLoading ? <BeatLoader size={8} color={theme === "dark" ? "black" : "white"} /> : "Create Account"}</Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default Signup