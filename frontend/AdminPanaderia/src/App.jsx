import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./paginas/home.jsx";
import Clientes from "./paginas/Clientes.jsx";
import Articulos from "./paginas/Articulos.jsx";
import Reparos from "./paginas/Reparos.jsx";

import { ClientesProvider } from "./contex/ClientesProvider.jsx";

function App() {
  return (
    <BrowserRouter>
      <ClientesProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="Clientes" element={<Clientes />} />
          <Route path="Articulos" element={<Articulos />} />
          <Route path="Repartos" element={<Reparos />} />
        </Routes>
      </ClientesProvider>
    </BrowserRouter>
  );
}

export default App;
