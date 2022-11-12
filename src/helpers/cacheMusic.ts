import getMusic from "../queries/getMusic";
import findCache from "./findCache";
const cacheMusic = async (value : string)=>{
    try {
        //get data
        const {data} = await getMusic(value);
        //Already exist ?
        const cached : any = await findCache('music', data.data.url);
        if (!cached.body) {
            const cache : Cache = await caches.open('music');
            await cache.add(data.data.url);
        }
        return true ;
    }catch (err){
        console.log(err)
        return false
    }
}
export default cacheMusic ;