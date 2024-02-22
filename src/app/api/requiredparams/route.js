import axios from 'axios';
const SERPAPI_API = process.env.PROVIDER_SERPAPI_API;
export async function GET(req) {
    const movie = req.nextUrl.searchParams.get('movie');
    const location = req.nextUrl.searchParams.get('location');
    const region = req.nextUrl.searchParams.get('region');

    const movieReplace = movie?.replace(/ /g, '+');
    const locationReplace = location?.replace(/ /g, '+');

    if (movie !== undefined && location !== undefined && region !== undefined) {
        try {
            const response = await fetch(`https://serpapi.com/search.json?api_key=${SERPAPI_API}&q=${movieReplace}+theater&location=${locationReplace}&hl=en&gl=${region}`)
            
            const data = await response.json();
            return new Response(JSON.stringify(data.showtimes), {
                headers: {
                    'Content-Type': 'application/json'
                },
                status: 200
            });
        } catch (e) {
            return new Response(e);
        }
    }
}
