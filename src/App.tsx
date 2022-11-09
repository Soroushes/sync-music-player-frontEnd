import {Route, Routes} from "react-router-dom";
import MusicPlay from "./pages/MusicPlay";

const App = ()=>{
    return(
        <Routes>
            <Route path={'/'} element={<MusicPlay/>}/>
        </Routes>
    )
}
export default App ;