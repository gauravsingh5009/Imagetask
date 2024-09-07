import Search from "./Search";
import Caption from "./Caption";
import { Route, Routes } from "react-router-dom";
const App = () =>{
    return(
        <>  
                <Routes>
                    <Route path="/" element={<Search/>}/>
                    <Route path="/caption/:id" element={<Caption/>}/>
                </Routes>
            
        </>
    )
}
export default App;