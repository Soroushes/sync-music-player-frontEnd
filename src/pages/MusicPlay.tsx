import {useEffect, useState} from "react";
import {ReadMusic} from "../helpers/readMusic";
const MusicPlay = ()=>{
    const [music , setMusic] = useState('') ;
    const [value , setValue] = useState('') ;
    const searchMusic = ()=>{
        ReadMusic(value).then((url : any)=> {
            console.log(url);
            setMusic(url);
        })
    }
    return(
        <>
            <button onClick={searchMusic}>search</button>
            <input value={value} onChange={(e :React.ChangeEvent<HTMLInputElement> )=>setValue(e.target.value)} type="text"/>
            <audio controls src={music}></audio>
        </>
    )
}
export default MusicPlay ;