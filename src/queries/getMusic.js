import axios from 'axios'
const getMusic = (value)=>(
    axios({
        method : "POST" ,
        url : "https://music.devmev.ir/api/radio-javan" ,
        data : {
            url : value
        }
    })
)
export default getMusic ;