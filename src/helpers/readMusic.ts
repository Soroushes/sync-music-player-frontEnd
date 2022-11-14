const catchMusic = async (cached : any) => {
    const reader = cached.body.getReader() ;
    return new ReadableStream({
        start(controller){
            return reader ? pump() : false;
            function pump() {
                return reader.read().then(({done, value}: any) => {
                    if (done) {
                        controller.close();
                        return;
                    }
                    controller.enqueue(value);
                    return pump();
                })
            }
        }
    })
}
export const ReadMusic = (cached : any) => (
    new Promise((resolve, reject) => {
        catchMusic(cached).then((stream) => new Response(stream))
            // Create an object URL for the response
            .then((response) => response.blob())
            .then((blob) => URL.createObjectURL(blob))
            // Update Audio
            .then((url) => resolve(url))
            .catch((err) => {
                reject(err)
            })
    }))
export default ReadMusic ;