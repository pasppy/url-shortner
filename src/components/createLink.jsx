import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { urlContext } from "@/context"
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import DisplayError from "./error";
import * as Yup from "yup"
import { Label } from "./ui/label";
import useFetch from "@/hooks/useFetch";
import { createUrl } from "@/lib/apiUrls";
import { BeatLoader } from "react-spinners";
import { useTheme } from "next-themes";
import { QRCodeCanvas } from "qrcode.react";

const CreateLink = () => {
    const { theme } = useTheme();
    const { data: user } = useContext(urlContext);
    const router = useRouter();
    const searchParams = useSearchParams();
    const longUrl = searchParams.get("createNew");
    const ref = useRef();
    const [validationError, setValidationError] = useState({})
    const [formData, setFormData] = useState({
        title: "",
        original_url: longUrl ?? "",
        custom_url: ""
    })
    const handleChange = (e) => {
        const { id, value } = e.target;

        setFormData(prev => ({
            ...prev, [id]: value
        }))
    }

    const { loading, error, data, fn: fnCreateUrl } = useFetch(createUrl, { ...formData, user_id: user?.id });

    // redirect to link page after creation
    useEffect(() => {
        if (data) router.push(`/link/${data[0]?.id}`)
    }, [data])

    // validation schema
    const schema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        original_url: Yup.string().url("Must be an URL").required("Original url is required"),
        cutom_url: Yup.string()
    })

    const createNewLink = async () => {
        setValidationError({});

        try {
            await schema.validate(formData, { abortEarly: false });
            const canvas = ref?.current
            const blob = await new Promise((res) => canvas.toBlob(res));

            // api call 
            await fnCreateUrl();

        } catch (error) {
            const newErrors = {};

            error?.inner?.forEach(err => { newErrors[err.path] = err.message });
            setValidationError(newErrors);
        }

    }

    return (
        <Dialog defaultOpen={longUrl}
            onOpenChange={res => {
                if (!res && longUrl) {
                    // create a new searchParams to alter it and navigate to it
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("createNew");

                    router.replace(`?${params}`);
                }
            }}
        >
            <DialogTrigger asChild>
                <Button >Create Link</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new link</DialogTitle>
                </DialogHeader>

                <div>
                    {formData?.original_url ? < QRCodeCanvas value={formData?.original_url} size={136} ref={ref} className="ring ring-blue-500" /> : <div className="ring ring-blue-500 h-34 bg-secondary text-primary w-34 flex justify-center items-center"> QR here </div>}
                </div>
                <div>
                    <Label htmlFor="title" className={"mb-2"}>Title</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder={"Title for your short URL"}
                    />
                    {validationError.title && <DisplayError message={validationError.title} />}
                </div>
                <div>
                    <Label htmlFor="original_url" className={"mb-2"}>Original Url</Label>
                    <Input
                        id="original_url"
                        value={formData.original_url}
                        onChange={handleChange}
                        placeholder={"Your long URL"}
                    />
                    {validationError.original_url && <DisplayError message={validationError.original_url} />}
                </div>
                <div>
                    <Label className={"mb-2"}>Custom Link</Label >

                    <div className="flex gap-1 items-center">
                        <Input
                            value="shrtnr.in"
                            className={"flex-1"}
                            disabled

                        />/
                        <Input
                            id="custom_url"
                            value={formData.custom_url}
                            onChange={handleChange}
                            placeholder={"Custom Link (optional)"}
                            className={"flex-4"}
                        />
                    </div>
                </div>

                {error && <DisplayError message={error?.message} />}
                <DialogFooter className={"sm:justify-start"}>
                    <Button
                        onClick={createNewLink}
                        disabled={loading}
                    >
                        {loading ? <BeatLoader size={8} color={theme === "dark" ? "black" : "white"} /> : "Create"}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default CreateLink