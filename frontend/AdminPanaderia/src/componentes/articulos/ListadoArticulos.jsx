import useArticulos from "../../hook/useArticulos";
import Articulo from "./Articulo";

const ListadoDeArticulos = () => {
  const { articulos } = useArticulos();
  // console.log(clientes);

  return (
    <>
      {articulos.length ? (
        <>
          <h2 className="font-black text-3xl text-center">
            Listado de articulos
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {""}
            <span className="text-indigo-600 font-bold">articulos </span>
          </p>

          {articulos.map((articulo) => (
            <Articulo key={articulo._id} articulo={articulo} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay articulos</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando articulos {""}
            <span className="text-indigo-600 font-bold">
              y apareceran en este lugar
            </span>
          </p>
        </>
      )}
    </>
  );
};

export default ListadoDeArticulos;
