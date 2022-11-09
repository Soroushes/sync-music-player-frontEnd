import axios from 'axios'
const getMusic = ()=>(
    axios({
        method : "GET" ,
        url : "http://localhost:5000/music"
    })
)
export default getMusic ;