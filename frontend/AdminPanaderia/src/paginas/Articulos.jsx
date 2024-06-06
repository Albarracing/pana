import React from "react";
import FormularioArticulos from "../componentes/articulos/FormularioArticulos";
import ListadoDeArticulos from "../componentes/articulos/ListadoArticulos";

const Articulos = () => {
  return (
    <div>
      <div className="flex">
        <div className="px-10">
          <FormularioArticulos />
        </div>

        <div className="md:w-1/2 lg:w-3/5">
          <ListadoDeArticulos />
        </div>
      </div>
    </div>
  );
};

export default Articulos;
