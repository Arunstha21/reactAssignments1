'use client';
import { getShortenedURL } from "@/services/urlShortener";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ShortUrlRedirect(){
    const { shortUrl } = useParams<{shortUrl: string}>();
    const router = useRouter();

    async function getUrl(shortUrl: string) {
        const url = await getShortenedURL(shortUrl);
        
        if (url) {
            router.push(url.url);
        }
    }

    useEffect(() => {
        getUrl(shortUrl);
    },[shortUrl]);
    
    return (
        <div>
            Redirecting...
        </div>
    )
}