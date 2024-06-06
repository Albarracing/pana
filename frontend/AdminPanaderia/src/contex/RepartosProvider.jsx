import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { data } from "autoprefixer";

const RepartosContext = createContext();

export const RepartosProvider = ({ children }) => {
  const [repartos, setRepartos] = useState([]);
  const [reparto, setReparto] = useState({});
  const [error, setError] = useState(null);
  const [fechaActual, setFechaActual] = useState(new Date());
  const [pedidosAgrupados, setPedidosAgrupados] = useState({});
  const [pedidos, setPedidos] = useState([]);
  // useEffect(() => {
  //   obtenerRepartosPorFecha(fechaActual);
  // }, [fechaActual]);

  // const obtenerRepartosPorFecha = async (fecha) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3000/api/repartos?fecha=${fecha.toISOString()}`
  //     );
  //     setRepartos(response.data);
  //   } catch (error) {
  //     console.error("Error al obtener los repartos:", error);
  //   }
  // };
  // useEffect(() => {
  //   obtenerRepartosPorFecha(fechaActual);
  // }, [fechaActual]);

  const cargarRepartos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/repartos/"); // La URL a tu API
      const data = await response.json();
      setRepartos(data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    cargarRepartos();
  }, []);

  // const agruparPedidosPorFecha = (pedidos) => {
  //   return pedidos.reduce((acc, pedido) => {
  //     const fecha = new Date(pedido.fecha).toLocaleDateString();
  //     if (!acc[fecha]) {
  //       acc[fecha] = [];
  //     }
  //     acc[fecha].push(pedido);
  //     return acc;
  //   }, {});
  // };

  // useEffect(() => {
  //   cargarPedidos();
  // }, []);

  useEffect(() => {
    const obtenerRepartos = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/repartos/");
        console.log(data);
        setRepartos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerRepartos();
  }, []);

  const guardarReparto = async (nuevoReparto) => {
    try {
      console.log(
        "Datos recibidos para guardar:",
        JSON.stringify(nuevoReparto, null, 2)
      );

      const { data } = await axios.post(
        "http://localhost:3000/api/repartos/",
        nuevoReparto,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRepartos((prevRepartos) => [...prevRepartos, data]);
    } catch (error) {
      console.error("Error al guardar repartos:", error);
      setError(error.response?.data?.error || error.message);
    }
  };

  // const marcarComoPagadoCompleto = async (
  //   repartoId,
  //   clienteId,
  //   pagadoCompleto
  // ) => {
  //   try {
  //     // Lógica para actualizar el estado local
  //     setRepartos((prevRepartos) => {
  //       return prevRepartos.map((reparto) => {
  //         if (reparto._id === repartoId) {
  //           return {
  //             ...reparto,
  //             clientesArticulos: reparto.clientesArticulos.map(
  //               (clienteArticulo) => {
  //                 if (clienteArticulo.clienteId === clienteId) {
  //                   return {
  //                     ...clienteArticulo,
  //                     pagadoCompleto: pagadoCompleto,
  //                   };
  //                 }
  //                 return clienteArticulo;
  //               }
  //             ),
  //           };
  //         }
  //         return reparto;
  //       });
  //     });

  //     // Lógica para enviar los datos al backend
  //     await actualizarPagoCompletoEnBackend(
  //       repartoId,
  //       clienteId,
  //       pagadoCompleto
  //     );
  //   } catch (error) {
  //     console.error("Error al marcar como pagado completo:", error);
  //     // Manejo de errores
  //   }
  // };

  // const guardarMontoPagado = async (repartoId, clienteId, montoPagado) => {
  //   try {
  //     // Lógica para actualizar el estado local
  //     setRepartos((prevRepartos) => {
  //       return prevRepartos.map((reparto) => {
  //         if (reparto._id === repartoId) {
  //           return {
  //             ...reparto,
  //             clientesArticulos: reparto.clientesArticulos.map(
  //               (clienteArticulo) => {
  //                 if (clienteArticulo.clienteId === clienteId) {
  //                   return {
  //                     ...clienteArticulo,
  //                     montoPagado: montoPagado,
  //                   };
  //                 }
  //                 return clienteArticulo;
  //               }
  //             ),
  //           };
  //         }
  //         return reparto;
  //       });
  //     });

  // Lógica para enviar los datos al backend
  //     await guardarMontoPagadoEnBackend(repartoId, clienteId, montoPagado);
  //   } catch (error) {
  //     console.error("Error al guardar monto pagado:", error);
  //     // Manejo de errores
  //   }
  // };

  const actualizarPagoCompletoEnBackend = async (
    repartoId,
    clienteId,
    pagadoCompleto
  ) => {
    try {
      const { response } = await axios.put(
        `http://localhost:3000/api/repartos/${repartoId}/clientes/${clienteId}/pago`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pagadoCompleto }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el pago completo");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const guardarMontoPagadoEnBackend = async (
    repartoId,
    clienteId,
    montoPagado
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/repartos/${repartoId}/clientes/${clienteId}/pago`,
        {
          //method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ montoPagado }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el pago completo");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const setEditando = (reparto) => {
    setReparto(reparto);
    //console.log("editando", id);
  };

  const eliminarReparto = async (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar?");
    if (confirmar) {
      try {
        await axios.delete(`http://localhost:4000/api/repartos/${id}`);
        setRepartos((prevRepartos) =>
          prevRepartos.filter((reparto) => reparto._id !== id)
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <RepartosContext.Provider
      value={{
        repartos,
        guardarReparto,
        setEditando,
        reparto,
        eliminarReparto,
        error,
        //marcarComoPagadoCompleto,
        //guardarMontoPagado,
        setFechaActual,
        pedidos,
        actualizarPagoCompletoEnBackend,
        guardarMontoPagadoEnBackend,
        // pedidosAgrupados,
        //cargarPedidos,
        //obtenerRepartosPorFecha,
      }}
    >
      {children}
    </RepartosContext.Provider>
  );
};

export default RepartosContext;
