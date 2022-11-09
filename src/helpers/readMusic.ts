import getMusic from "../queries/getMusic";
const getCachedData = async (cacheName : string , url : string)=>{
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);
    if (!cachedResponse || !cachedResponse.ok) {
        return false;
    }
    return  cachedResponse;
}
const catchMusic = async ()=>{
    try{
        const {data} = await getMusic() ;
        const hasData = await getCachedData(String('music'), data.url);
        if (!hasData){
            console.log('nodata')
            const cache = await caches.open(String('music'));
            await cache.add(data.url);
        }
        const cachedData = await getCachedData('music', data.url);
        const reader = cachedData.body.getReader() ;
        return new ReadableStream({
            start(controller) {
                return pump();
                function pump() {
                    return reader.read().then(({ done , value } : any) => {
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
    }catch (err){
        console.log(err)
    }
}
export const ReadMusic = ()=>{
    return new Promise((resolve , reject)=>{
        catchMusic().then((stream) => new Response(stream))
            // Create an object URL for the response
            .then((response) => response.blob())
            .then((blob) => URL.createObjectURL(blob))
            // Update image
            .then((url) => resolve(url))
            .catch((err)=>{
                reject(err)
            })
    })

}