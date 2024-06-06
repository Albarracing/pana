import useRepartos from "../../hook/useRepartos";

const Reparto = ({ reparto }) => {
  const { setEditando, eliminarReparto } = useRepartos();
  const {
    fecha,
    cod_personal,
    cod_localidades,
    precio,
    cantidad,
    devuelve,
    cod_orden,
    //cliente,
    //articulo,
    _id,
  } = reparto;
  const formatearFecha = (fecha) => {
    if (!fecha) {
      return "";
    }
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(
      nuevaFecha
    );
  };
  return (
    <div>
      <div className="mx-5 my-7 bg-slate-50 shadow-md px-5 py-1 rounded-xl">
        <p className="font-bold uppercase text-indigo-600 my-2">
          Fecha: {""}
          <span className="font-normal normal-case text-black">
            {formatearFecha(fecha)}
          </span>{" "}
        </p>
        <p className="font-bold uppercase text-indigo-600 my-2">
          Cliente: {""}
          <span className="font-normal normal-case text-black"></span>
        </p>
        <p className="font-bold uppercase text-indigo-600 my-2">
          Articulo: {""}
          <span className="font-normal normal-case text-black"></span>
        </p>
        <p className="font-bold uppercase text-indigo-600 my-2">
          Codigo personal: {""}
          <span className="font-normal normal-case text-black">
            {cod_personal}
          </span>
        </p>
        <p className="font-bold uppercase text-indigo-600 my-2">
          Codigo localidades: {""}
          <span className="font-normal normal-case text-black">
            {cod_localidades}
          </span>
        </p>{" "}
        <p className="font-bold uppercase text-indigo-600 my-2">
          precio: {""}
          <span className="font-normal normal-case text-black">{precio}</span>
        </p>{" "}
        <p className="font-bold uppercase text-indigo-600 my-2">
          cantidad: {""}
          <span className="font-normal normal-case text-black">{cantidad}</span>
        </p>{" "}
        <p className="font-bold uppercase text-indigo-600 my-2">
          devuelve: {""}
          <span className="font-normal normal-case text-black">{devuelve}</span>
        </p>{" "}
        <p className="font-bold uppercase text-indigo-600 my-2">
          cod_orden: {""}
          <span className="font-normal normal-case text-black">
            {cod_orden}
          </span>
        </p>{" "}
        <div className="flex justify-between my-5">
          <button
            type="button"
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
            onClick={() => setEditando(reparto)}
          >
            Editar
          </button>

          <button
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
            onClick={() => eliminarReparto(_id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reparto;
