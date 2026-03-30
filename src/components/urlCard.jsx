import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Copy, Download, Trash2 } from 'lucide-react'
import useFetch from '@/hooks/useFetch'
import { deleteUrl } from '@/lib/apiUrls'
import { MoonLoader } from 'react-spinners'
import { useTheme } from 'next-themes'

const domain = process.env.
    NEXT_PUBLIC_DOMAIN_NAME || `http://localhost:3000/`

const UrlCard = ({ url, fetchUrls }) => {
    const { theme } = useTheme();

    const handleDownload = async () => {

        const imageUrl = url?.qr;
        const fileName = url?.title;

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
            console.log(err.message);

        }


    }

    const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

    return (
        <div className='flex flex-col md:flex-row p-4 rounded-lg border gap-5'>
            <img
                src={url?.qr}
                alt={"qr"}
                className='h-32 object-contain self-start text-black  bg-white ring ring-blue-500 ' />
            <Link href={`/link/${url?.id}`} className='flex flex-col flex-1'>
                <span className='text-3xl font-extrabold hover:underline cursor-pointer'>{url?.title}</span>
                <span className='text-2xl text-blue-400 font-bold hover:underline cursor-pointer'>
                    {`${domain}${url?.custom_url || url?.short_url}`}
                </span>
                <span className=' hover:underline cursor-pointer'>{url?.original_url}</span>
                <span className=' flex items-end text-sm font-extralight flex-1'>{new Date(url?.created_at).toLocaleString()}</span>
            </Link>

            <div className='flex '>
                <Button
                    variant='ghost'
                    className={""}
                    onClick={() => navigator.clipboard.writeText(`${domain}${url?.custom_url || url?.short_url}`)}
                >
                    <Copy />
                </Button>
                <Button
                    variant='ghost'
                    onClick={handleDownload}>
                    <Download />
                </Button>
                <Button
                    variant='ghost'
                    onClick={() => fnDelete().then(() => fetchUrls())}>
                    {loadingDelete ? <MoonLoader color={theme === "dark" ? "white" : "black"} size={14} /> : <Trash2 />}
                </Button>
            </div>

        </div>
    )
}

export default UrlCard