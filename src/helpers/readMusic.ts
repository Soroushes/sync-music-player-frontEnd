import getMusic from "../queries/getMusic";

const getCachedData = async (cacheName: string, url: string) => {
    try {
        const cacheStorage = await caches.open(cacheName);
        const cachedResponse = await cacheStorage.match(url);
        if (!cachedResponse || !cachedResponse.ok) {
            return {};
        }
        return cachedResponse;
    } catch (err) {
        console.log(err);
    }
}
const catchMusic = async (value : string) => {
    try {
        //get data
        const {data} = await getMusic(value);
        console.log(data);
        //Already exist ?
        let cached : any = await getCachedData(String('music'), data.data.url);
        if (!cached.body) {
            console.log('nodata')
            const cache = await caches.open(String('music'));
            await cache.add(data.data.url);
            cached = await getCachedData('music', data.data.url);
        }
        //Get Data
        const reader = cached.body.getReader() ;
        return new ReadableStream({
            start(controller) {
                return reader ? pump() : false;
                function pump() {
                    return reader.read().then(({done, value}: any) => {
                        if (done) {
                            controller.close();
                            return;
                        }
                        controller.enqueue(value);
                        return pump();
                    });
                }
            }
        })
    } catch (err) {
        console.log(err)
    }
}
export const ReadMusic = (value : string) => (
    new Promise((resolve, reject) => {
        catchMusic(value).then((stream) => new Response(stream))
            // Create an object URL for the response
            .then((response) => response.blob())
            .then((blob) => URL.createObjectURL(blob))
            // Update Audio
            .then((url) => resolve(url))
            .catch((err) => {
                reject(err)
            })
    }))