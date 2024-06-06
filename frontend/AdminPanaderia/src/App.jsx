import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./paginas/home.jsx";
import Clientes from "./paginas/Clientes.jsx";
import Articulos from "./paginas/Articulos.jsx";
import RepartosNuevo from "./paginas/RepartosNuevo.jsx";

import { ClientesProvider } from "./contex/ClientesProvider.jsx";
import { ArticulosProvider } from "./contex/AticulosProvider.jsx";
import { RepartosProvider } from "./contex/RepartosProvider.jsx";
import FormularioReparto from "./componentes/repartosNuevo/FormularioReparto.jsx";
import RepartoDetalles from "./componentes/repartosNuevo/RepartoDetalles.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* <Routes>
          
        </Routes> */}

      <ClientesProvider>
        <ArticulosProvider>
          <RepartosProvider>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="Clientes" element={<Clientes />} />
              <Route path="Articulos" element={<Articulos />} />
              <Route path="crear-reparto" element={<FormularioReparto />} />
              <Route path="RepartosNuevo" element={<RepartosNuevo />} />
              <Route path="/reparto-detalles" element={<RepartoDetalles />} />
            </Routes>
          </RepartosProvider>
        </ArticulosProvider>
      </ClientesProvider>
    </BrowserRouter>
  );
}

export default App;
