"use client";
import { Button } from "@/components/ui/button";
import { getShortenedURLs, shortenURL } from "@/services/urlShortener";
import { useState } from "react";
import { z } from "zod";
import { useQRCode } from "next-qrcode";

const urlSchema = z.object({
  url: z.string().url(),
});

type TShortenedURL = {
  id: string;
  url: string;
  shortUrl: string;
};

export default function URLShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  let baseUrl = "";

  if (typeof window !== "undefined") {
    baseUrl = window.location.href;
  }
  const [error, setError] = useState("");

  const { Canvas } = useQRCode();

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const validated = urlSchema.safeParse({ url: e.target.value });
    if (validated.success) {
      setUrl(e.target.value);
      setError("");
    } else {
      setUrl(e.target.value);
      setError("Invalid URL");
    }
  }
  function getShortUrlPath(shortenUrlData: TShortenedURL[]): string {
    const generateRandomShortUrl = (): string =>
      Math.random().toString(36).substring(2, 8);

    let shortUrlPath: string;
    let checkExistingShortUrl: TShortenedURL | undefined;

    do {
      shortUrlPath = generateRandomShortUrl();
      checkExistingShortUrl = shortenUrlData.find(
        (data: TShortenedURL) => data.shortUrl === shortUrlPath
      );
    } while (checkExistingShortUrl !== undefined);

    return shortUrlPath;
  }

  async function shortenUrl() {
    const validated = urlSchema.safeParse({ url });
    if (validated.success) {
      const shortenUrlData = await getShortenedURLs();
      const checkExistingUrl = shortenUrlData.find(
        (data: TShortenedURL) => data.url === url
      );

      let shortUrlPath: string = checkExistingUrl?.shortUrl;

      if (!checkExistingUrl) {
        shortUrlPath = getShortUrlPath(shortenUrlData);
      }

      const shortUrl = `${baseUrl}/${shortUrlPath}`;
      setShortUrl(shortUrl);
      shortenURL(url, shortUrlPath);
    } else {
      setError("Invalid URL");
    }
  }

  return (
    <div className="mx-auto mt-10 p-6 w-3/6">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <div className="flex flex-col space-y-2">
        <input
          className="p-2 border border-gray-300"
          placeholder="Enter URL to shorten"
          value={url}
          onChange={inputChangeHandler}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button variant={"default"} onClick={shortenUrl}>
          Shortener
        </Button>
      </div>
      {shortUrl && (
        <>
          <div className="mt-4">
            <p>Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              {shortUrl}
            </a>
          </div>
          <div >
            <Canvas text={shortUrl} 
            options={{
                errorCorrectionLevel: 'M',
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                  dark: '060000',
                  light: 'ffffff',
                },
              }}
              />
          </div>
        </>
      )}
    </div>
  );
}
