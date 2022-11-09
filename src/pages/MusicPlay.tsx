import {useEffect, useState} from "react";
import {ReadMusic} from "../helpers/readMusic";
const MusicPlay = ()=>{
    const [music , setMusic] = useState('') ;
    useEffect(()=>{
        ReadMusic().then((url : any)=>{
            console.log(url);
            setMusic(url)
        })
    },[])

    return(
        <audio controls src={music}></audio>
    )
}
export default MusicPlay ;