import getMusic from "../queries/getMusic";
import findCache from "./findCache";
const cacheMusic = async (url : string)=>{
    try {
        //Already exist ?
        const cached : any = await findCache('music', url);
        if (!cached.body) {
            const cache : Cache = await caches.open('music');
            await cache.add(url);
        }
        return true ;
    }catch (err){
        console.log(err)
        return false
    }
}
export default cacheMusic ;