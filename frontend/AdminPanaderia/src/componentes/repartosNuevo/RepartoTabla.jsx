import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useRepartos from "../../hook/useRepartos";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RepartoTabla = () => {
  const [pedidosPorFecha, setPedidosPorFecha] = useState({});
  const { repartos } = useRepartos();

  useEffect(() => {
    const cargarPedidosPorFecha = () => {
      const pedidosAgrupados = repartos.reduce((acc, reparto) => {
        const fecha = new Date(reparto.fecha).toLocaleDateString();
        if (!acc[fecha]) {
          acc[fecha] = [];
        }
        acc[fecha].push(reparto);
        return acc;
      }, {});
      setPedidosPorFecha(pedidosAgrupados);
    };
    cargarPedidosPorFecha();
  }, [repartos]);

  return (
    <>
      <Link to="/crear-reparto">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-5 ml-5 px-4 rounded">
          +
        </button>
      </Link>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-28 border border-gray-400 py-2">
                Nro de Pedido
              </th>
              <th className="border border-gray-400 px-4 py-2">Fecha</th>
              <th className="border border-gray-400 px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(pedidosPorFecha).map((fecha) =>
              pedidosPorFecha[fecha].map((pedido) => (
                <tr key={pedido._id} className="bg-gray-100">
                  <td className="border border-gray-400 px-4 py-2">
                    {pedido.numeroPedido}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {new Date(pedido.fecha).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <Link
                      to={{
                        pathname: `/reparto-detalles`,
                        state: {
                          repartoId: pedido._id,
                          pedidos: pedido.clientesArticulos,
                        },
                      }}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Ver Detalles
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RepartoTabla;

{
  /* <div>
        <h1>Pedidos por Fecha</h1>
        {Object.keys(pedidosPorFecha).map((fecha) => (
          <div key={fecha}>
            <h2>{fecha}</h2>
            <ul>
              {pedidosPorFecha[fecha].map((pedido) => (
                <li key={pedido._id}>
                  <Link to={`/formulario-reparto/${pedido.fecha}`}>
                    Ver pedidos del {fecha}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */
}
{
  /* <div className="overflow-x-auto">
        <table className="min-w-full w-full bg-white">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4 uppercase font-semibold text-sm text-left w-1/4">
                Cliente
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm text-left w-3/4">
                Artículos y Cantidades
              </th>
            </tr>
          </thead>
          <tbody>
            {repartos.map((reparto, repartoIndex) => (
              <React.Fragment key={repartoIndex}>
                {reparto.clientesArticulos.map(
                  (clientesArticulo, clientesArticuloIndex) => (
                    <tr
                      key={clientesArticuloIndex}
                      className="bg-gray-100 border-b border-gray-200 hover:bg-gray-200 transition-colors duration-200"
                    >
                      <td className="py-3 px-2 font-bold">
                        {" "}
                        
                        {clientesArticulo.clienteId?.nombre}{" "}
                        {clientesArticulo.clienteId?.apellido}
                      </td>
                      <td className="py-3">
                        {" "}
                       
                        {clientesArticulo.articulos.map((articulo) => (
                          <div
                            key={articulo.articuloId?._id}
                            className="inline-block mr-4"
                          >
                            <span className="font-semibold">
                              {articulo.articuloId?.nombre}
                            </span>
                            : {articulo.cantidad}
                          </div>
                        ))}
                      </td>
                    </tr>
                  )
                )}
              </React.Fragment>
            ))}
          </tbody> 
        </table>
      </div>*/
}

{
  /* ---agrupar los pedidos por fecha----
  
  <div className="container mx-auto px-4">
        <div className="overflow-x-auto">
          <table className="min-w-full w-full bg-white">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-3 px-4 uppercase font-semibold text-sm text-left w-1/4">
                  Cliente
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm text-left w-3/4">
                  Artículos y Cantidades
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(repartosPorFecha).length > 0 &&
                Object.keys(repartosPorFecha).map((fecha) => (
                  <React.Fragment key={fecha}>
                    <tr>
                      <td colSpan={2} className="bg-gray-200 text-center font-bold py-2">
                        Pedidos para el {fecha}
                      </td>
                    </tr>
                    {repartosPorFecha[fecha].map((reparto, repartoIndex) => (
                      <React.Fragment key={repartoIndex}>
                        {reparto.clientesArticulos.map(
                          (clientesArticulo, clientesArticuloIndex) => (
                            <tr
                              key={clientesArticuloIndex}
                              className="bg-gray-100 border-b border-gray-200"
                            >
                              <td className="py-3 px-4 font-bold w-1/4">
                                {clientesArticulo.clienteId?.nombre}{" "}
                                {clientesArticulo.clienteId?.apellido}
                              </td>
                              <td className="py-3 px-4 w-3/4">
                                {clientesArticulo.articulos.map(
                                  (articulo, articuloIndex) => (
                                    <div
                                      key={articulo.articuloId?._id}
                                      className="inline-block mr-4"
                                    >
                                      <span className="font-semibold">
                                        {articulo.articuloId?.nombre}
                                      </span>
                                      : {articulo.cantidad}
                                    </div>
                                  )
                                )}
                              </td>
                            </tr>
                          )
                        )}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};*/
}
