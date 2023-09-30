import Login from "./pages/login";
import ClientePage from "./pages/clientes";
import Produtos from "./pages/produtos";
import Home from "./pages/home";
import Menu from "./components/menu";

import {BrowserRouter, Routes, Route} from 'react-router-dom';

function Router() {
    return(
        <BrowserRouter>

            <Menu/>

            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/clientes" element={<ClientePage/>}/>
                <Route path="/produtos" element={<Produtos/>}/>
                <Route exact path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;