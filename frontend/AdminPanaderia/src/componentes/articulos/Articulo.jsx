import useArticulos from "../../hook/useArticulos";

const Articulo = ({ articulo }) => {
  const { setEditando, eliminarArticulo } = useArticulos();
  const { codigo, nombre, precio_uni, _id } = articulo;

  return (
    <div>
      <div className="mx-5 my-7 bg-slate-50 shadow-md px-5 py-1 rounded-xl">
        <p className="font-bold uppercase text-indigo-600 my-2">
          Codigo: {""}{" "}
          <span className="font-normal normal-case text-black">{codigo}</span>{" "}
        </p>
        <p className="font-bold uppercase text-indigo-600 my-2">
          Nombre: {""}
          <span className="font-normal normal-case text-black">{nombre}</span>
        </p>
        <p className="font-bold uppercase text-indigo-600 my-2">
          Precio por unidad: {""}
          <span className="font-normal normal-case text-black">
            {precio_uni}
          </span>
        </p>{" "}
        <div className="flex justify-between my-5">
          <button
            type="button"
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
            onClick={() => setEditando(articulo)}
          >
            Editar
          </button>

          <button
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
            onClick={() => eliminarArticulo(_id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Articulo;
