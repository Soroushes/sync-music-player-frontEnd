const findCache = async (cacheName: string, url: string) => {
    try {
        const cacheStorage : Cache = await caches.open(cacheName);
        const cachedResponse = await cacheStorage.match(url);
        if (!cachedResponse || !cachedResponse.ok) {
            return {};
        }
        return cachedResponse;
    } catch (err) {
        console.log(err);
    }
}
export default findCache ;