import axios from 'axios';

const URLShortenerAPI = axios.create({
    baseURL: 'https://66d44b475b34bcb9ab3e2fd8.mockapi.io/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});


async function shortenURL(url: string, shortUrl: string) {
    try {
        const response = await URLShortenerAPI.post('/urlShortener', { url, shortUrl });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

async function getShortenedURLs() {
    try {
        const response = await URLShortenerAPI.get(`/urlShortener`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

async function getShortenedURL(shortUrl: string) {
    try {
        const response = await URLShortenerAPI.get(`/urlShortener`);
        const data = response.data;

        const url = data.find((url: { shortUrl: string }) => url.shortUrl === shortUrl);
        
        return url;
    } catch (error: any) {
        return error.response.data;
    }
}

async function updateCount(id: string, count: number) {
    try {
        const response = await URLShortenerAPI.put(`/urlShortener/${id}`, { count });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export { shortenURL, getShortenedURLs, getShortenedURL,updateCount };

