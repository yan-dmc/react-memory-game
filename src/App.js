import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style.css"
import { Game } from "./pages/Game";
import { Menu } from "./pages/Menu";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Menu />}/>
            <Route path='/game-start' element={<Game />}/>
            <Route path='*' element={<h1>Not Found</h1>}/>
        </Routes>
    </BrowserRouter>
  )
}


export default App;