import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import useRepartos from "../../hook/useRepartos";

const RepartoDetalles = () => {
  const location = useLocation();
  const { pedidos, repartoId } = location.state || {};
  const { actualizarPagoCompletoEnBackend, guardarMontoPagadoEnBackend } =
    useRepartos();
  const [clientesArticulos, setClientesArticulos] = useState(pedidos || []);

  const handlePagoCompletoChange = async (clienteId, pagadoCompleto) => {
    try {
      await actualizarPagoCompletoEnBackend(
        repartoId,
        clienteId,
        pagadoCompleto
      );
      const updatedClientesArticulos = clientesArticulos.map(
        (clienteArticulo) =>
          clienteArticulo.clienteId._id === clienteId
            ? { ...clienteArticulo, pagadoCompleto }
            : clienteArticulo
      );
      setClientesArticulos(updatedClientesArticulos);
    } catch (error) {
      console.error("Error al actualizar el pago completooo:", error);
    }
  };

  const handleMontoPagadoChange = async (clienteId, montoPagado) => {
    try {
      await guardarMontoPagadoEnBackend(repartoId, clienteId, montoPagado);
      const updatedClientesArticulos = clientesArticulos.map(
        (clienteArticulo) =>
          clienteArticulo.clienteId._id === clienteId
            ? { ...clienteArticulo, montoPagado }
            : clienteArticulo
      );
      setClientesArticulos(updatedClientesArticulos);
    } catch (error) {
      console.error("Error al actualizar el monto pagado:", error);
    }
  };

  useEffect(() => {
    if (location.state && location.state.pedidos) {
      setClientesArticulos(location.state.pedidos);
    }
  }, [location.state]);

  if (!pedidos) {
    return <div>No hay pedidos disponibles.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        to="/RepartosNuevo"
        className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Volver
      </Link>
      <h1 className="text-2xl font-bold mb-4">Detalles del Reparto</h1>
      <div className="space-y-4">
        {clientesArticulos.map((clienteArticulo) => (
          <div
            key={clienteArticulo._id}
            className="border px-3 rounded-md shadow-md"
          >
            <h2 className="text-xl font-semibold">
              {clienteArticulo.clienteId.nombre}{" "}
              {clienteArticulo.clienteId.apellido}
            </h2>
            <div className="flex flex-row">
              {clienteArticulo.articulos.map((articulo) => (
                <div key={articulo.articuloId._id} className="mr-4">
                  <div className="flex items-center">
                    <span className="">{articulo.articuloId.nombre}:</span>
                    <span className="ml-2">{articulo.cantidad}</span>
                  </div>
                  <div className="text-gray-700">
                    ${articulo.importe.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-right text-lg font-semibold">
              Importe Total: ${clienteArticulo.totalCliente.toFixed(2)}
            </div>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={clienteArticulo.pagadoCompleto}
                  onChange={(e) =>
                    handlePagoCompletoChange(
                      clienteArticulo.clienteId._id,
                      e.target.checked
                    )
                  }
                />
                <span className="ml-2">Pagado Completo</span>
              </label>
              {!clienteArticulo.pagadoCompleto && (
                <div className="mt-2">
                  <label>
                    Monto Pagado:
                    <input
                      type="number"
                      value={clienteArticulo.montoPagado || 0}
                      onChange={(e) =>
                        handleMontoPagadoChange(
                          clienteArticulo.clienteId._id,
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-24 ml-2 rounded-md focus:outline-none border border-gray-300 py-1 px-2"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xl font-semibold">
        Importe Total del Reparto: $
        {clientesArticulos
          .reduce(
            (acc, clienteArticulo) => acc + clienteArticulo.totalCliente,
            0
          )
          .toFixed(2)}
      </div>
    </div>
  );
};

export default RepartoDetalles;
