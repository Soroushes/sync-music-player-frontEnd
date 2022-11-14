import React, {useEffect, useState} from "react";
import cacheMusic from "../helpers/cacheMusic";
import findCache from "../helpers/findCache";
import readMusic from "../helpers/readMusic";
const MusicPlay = ()=>{
    const [adding , setAdding] = useState<boolean>(false);
    const [musics , setMusics] = useState<readonly Response[]>([]) ;
    const [value , setValue] = useState<string>('') ;
    const [link , setLink] = useState<any>('') ;
    const addMusic = async ()=>{
        setAdding(true)
        await cacheMusic(value);
        await getMusics() ;
        setAdding(false) ;
        setValue('');
    }
    const selectMusic = async (url : string)=>{
        const cache = await findCache('music' , url);
        const result = await readMusic(cache);
        setLink(result);
    }
    const getMusics = async ()=>{
        try {
            const cacheStorage : Cache = await caches.open('music');
            const cachedResponse : readonly Response[] = await cacheStorage.matchAll();
            setMusics(cachedResponse);
        }catch (err){
            console.log(err)
        }
    }
    const deleteMusic = async (url : string)=>{
        setAdding(true)
        const cacheStorage : Cache = await caches.open('music');
        await cacheStorage.delete(url)
        await getMusics();
        setAdding(false)
    }
    useEffect(()=>{
        getMusics();
    },[])
    return(
        <>
            {
                musics.map((music : Response, index : number)=>{
                    return(
                        <div key={index}>
                            <span className={'mx-3'} onClick={selectMusic.bind(this , music.url)} style={{cursor : "pointer"}}>{music.url}</span>
                            <span className={'mx-3'} onClick={deleteMusic.bind(this , music.url)} style={{cursor : "pointer"}}>delete music</span>
                        </div>
                    )
                })
            }

            <input className={'form-control w-75 mt-4'} value={value} onChange={(e :React.ChangeEvent<HTMLInputElement> )=>setValue(e.target.value)} type="text"/>
            <button onClick={addMusic}>search</button>
            {
                adding ? <div>loading....</div> : ""
            }
            <div className={'my-5'}><audio src={link} controls></audio></div>
        </>
    )
}
export default MusicPlay ;