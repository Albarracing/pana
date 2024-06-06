import React from "react";
import useRepartos from "../../hook/useRepartos";
import Reparto from "./Reparto";
const ListadoRepartos = () => {
  const { repartos } = useRepartos();

  return (
    <>
      {repartos.length ? (
        <>
          <h2 className="font-black text-3xl text-center">
            Listado de repartos
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {""}
            <span className="text-indigo-600 font-bold">repartos </span>
          </p>

          {repartos.map((reparto) => (
            <Reparto key={reparto._id} reparto={reparto} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay repartos</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando repartos {""}
            <span className="text-indigo-600 font-bold">
              y apareceran en este lugar
            </span>
          </p>
        </>
      )}
    </>
  );
};
export default ListadoRepartos;
