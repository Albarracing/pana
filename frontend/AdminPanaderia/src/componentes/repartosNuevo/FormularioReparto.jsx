import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useClientes from "../../hook/useClientes";
import useArticulos from "../../hook/useArticulos";
import useRepartos from "../../hook/useRepartos";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormularioReparto = () => {
  const { repartos, guardarReparto, error, setFechaActual } = useRepartos();
  const { clientes } = useClientes();
  const { articulos } = useArticulos();
  const [formState, setFormState] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);
  const [totalPorCliente, setTotalPorCliente] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { fecha } = useParams();
  //const [fecha, setFecha] = useState(new Date());
  const [clientesArticulos, setClientesArticulos] = useState([]);

  useEffect(() => {
    setFechaActual(fecha);
  }, [fecha]);

  useEffect(() => {
    const initialFormState = clientes.map((cliente) => ({
      clienteId: cliente._id,
      articulos: articulos.map((articulo) => ({
        articuloId: articulo._id,
        cantidad: 0,
        importe: 0,
      })),
    }));
    setFormState(initialFormState);
  }, [clientes, articulos]);

  const handleInputChange = (clienteId, articuloId, value) => {
    setFormState((prevState) => {
      const newState = prevState.map((reparto) => {
        if (reparto.clienteId === clienteId) {
          return {
            ...reparto,
            articulos: reparto.articulos.map((articulo) => {
              if (articulo.articuloId === articuloId) {
                const cantidad = parseInt(value, 10) || 0;
                const precio =
                  articulos.find((a) => a._id === articuloId)?.precio_uni || 0;
                return { ...articulo, cantidad, importe: cantidad * precio };
              }
              return articulo;
            }),
          };
        }
        return reparto;
      });
      calcularTotal(newState);
      return newState;
    });
  };

  const calcularTotal = (newState) => {
    const totalPorCliente = {};
    const total = newState.reduce((acc, reparto) => {
      const totalCliente = reparto.articulos.reduce(
        (acc, articulo) => acc + articulo.importe,
        0
      );
      totalPorCliente[reparto.clienteId] = totalCliente;
      return acc + totalCliente;
    }, 0);
    setTotalPedido(total);
    setTotalPorCliente(totalPorCliente);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientesArticulos = formState.map((reparto) => ({
        cliente: reparto.clienteId,
        articulos: reparto.articulos.map((articulo) => ({
          articulo: articulo.articuloId,
          cantidad: articulo.cantidad,
        })),
      }));
      const nuevoReparto = { clientesArticulos, fecha: selectedDate };

      console.log("Datos enviados:", JSON.stringify(nuevoReparto, null, 2));

      await guardarReparto(nuevoReparto);
      alert("Reparto creado exitosamente");
    } catch (error) {
      console.error("Error al crear el reparto", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {" "}
      <Link to="/RepartosNuevo">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Volver
        </button>
      </Link>
      <h1 className="text-2xl font-bold mb-4">Formulario de Pedidos</h1>
      <div></div>
      <form onSubmit={handleSubmit} className="mt-4">
        {error && <div className="text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Seleccionar fecha:
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="space-y-4">
          {clientes.map((cliente) => (
            <div key={cliente._id} className="border px-3 rounded-md shadow-md">
              <h2 className="text-xl font-semibold">
                {cliente.nombre} {cliente.apellido}
              </h2>
              <div className="flex flex-row">
                {articulos.map((articulo) => (
                  <div key={articulo._id} className="">
                    <div className="flex items-center">
                      <span className="">{articulo.nombre}:</span>
                      <input
                        type="number"
                        className="w-16 ml-2 rounded-md focus:outline-none border border-gray-300 py-1 mr-4"
                        value={
                          formState
                            .find(
                              (stateReparto) =>
                                stateReparto.clienteId === cliente._id
                            )
                            ?.articulos.find(
                              (a) => a.articuloId === articulo._id
                            )?.cantidad || ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            cliente._id,
                            articulo._id,
                            parseInt(e.target.value, 10) || 0
                          )
                        }
                      />
                    </div>
                    <div className=" text-gray-700">
                      $
                      {(
                        formState
                          .find(
                            (stateReparto) =>
                              stateReparto.clienteId === cliente._id
                          )
                          ?.articulos.find((a) => a.articuloId === articulo._id)
                          ?.importe || 0
                      ).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-right text-lg font-semibold">
                Importe Total: $
                {totalPorCliente[cliente._id]?.toFixed(2) || "0.00"}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xl font-semibold">
          Importe Total del Reparto: ${totalPedido.toFixed(2)}
        </div>
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Crear Reparto
        </button>
      </form>
    </div>
  );
};

export default FormularioReparto;

//-------formulario viejo---------

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import useClientes from "../../hook/useClientes";
// import useArticulos from "../../hook/useArticulos";
// import useRepartos from "../../hook/useRepartos";

// const FormularioReparto = () => {
//   const { clientes } = useClientes();
//   const { articulos } = useArticulos();
//   const { guardarReparto } = useRepartos();

//   // Estado para almacenar las cantidades por cliente y artículo
//   const [cantidades, setCantidades] = useState([]);

//   useEffect(() => {
//     // Generar las cantidades iniciales cuando clientes y artículos estén disponibles
//     if (clientes.length > 0 && articulos.length > 0) {
//       const initialCantidades = clientes.map((cliente) =>
//         articulos.map((articulo) => ({
//           clienteId: cliente.id,
//           articuloId: articulo.id,
//           cantidad: 0,
//         }))
//       );
//       setCantidades(initialCantidades);
//     }
//   }, [clientes, articulos]);

//   // Función para manejar el cambio de cantidad
//   const handleCantidadChange = (clienteId, articuloId, cantidad) => {
//     const updatedCantidades = cantidades.map((clienteCantidades) =>
//       clienteCantidades.map((item) =>
//         item.clienteId === clienteId && item.articuloId === articuloId
//           ? { ...item, cantidad: parseInt(cantidad, 10) }
//           : item
//       )
//     );
//     setCantidades(updatedCantidades);
//   };

//   // Función para manejar el envío del formulario
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Filtrar las cantidades para obtener solo las que son mayores que cero
//     const repartos = cantidades.map((clienteCantidades) =>
//       clienteCantidades
//         .filter((item) => item.cantidad > 0)
//         .map((item) => ({
//           clienteId: item.clienteId,
//           articuloId: item.articuloId,
//           cantidad: item.cantidad,
//         }))
//     );

//     // Enviar los repartos al servidor
//     try {
//       await guardarReparto(repartos);
//       console.log("Reparto guardado:", repartos);
//     } catch (error) {
//       console.log("Error al guardar el reparto:", error);
//     }
//   };

//   // Renderizar el formulario
//   return (
//     <>
//       <Link to="/RepartosNuevo">
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-5 ml-5 px-4 rounded">
//           Volver
//         </button>
//       </Link>
//       <form onSubmit={handleSubmit}>
//         <button
//           type="submit"
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 mt-5 ml-5 px-4 rounded"
//         >
//           Guardar
//         </button>

//         <table className="table-auto w-full mt-5">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="">Cliente</th>
//               <th className="px-4 py-2">Artículo</th>
//               <th className="px-4 py-2">Cantidad</th>
//             </tr>
//           </thead>

//           <tbody>
//             {clientes.map((cliente, indexCliente) => (
//               <tr key={cliente.id} className="bg-white even:bg-gray-200">
//                 <td className="border-b py-2 px-4">
//                   {cliente.nombre} {cliente.apellido}
//                 </td>
//                 <td className="border-b py-2 px-4">
//                   {articulos.map((articulo) => {
//                     const cantidad = cantidades[indexCliente].find(
//                       (item) =>
//                         item.clienteId === cliente.id &&
//                         item.articuloId === articulo.id
//                     );
//                     return (
//                       <div
//                         key={articulo.id}
//                         className="articulo-item mr-4 mb-2"
//                       >
//                         <label>{articulo.nombre}:</label>
//                         <input
//                           type="number"
//                           className="w-12 bg-slate"
//                           value={cantidad ? cantidad.cantidad : 0}
//                           onChange={(e) =>
//                             handleCantidadChange(
//                               cliente.id,
//                               articulo.id,
//                               e.target.value
//                             )
//                           }
//                         />
//                       </div>
//                     );
//                   })}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </form>
//     </>
//   );
// };

// export default FormularioReparto;

// value={
//   (
//     cantidades.find((cliente) =>
//       cliente.find(
//         (item) =>
//           item.clienteId === cliente.id &&
//           item.articuloId === articulo.id
//       )
//     ) || []
//   ).find(
//     (item) =>
//       item.clienteId === cliente.id &&
//       item.articuloId === articulo.id
//   )?.cantidad
// }
// onChange={(e) =>
//   handleCantidadChange(
//     cliente.id,
//     articulo.id,
//     e.target.value
//   )
// }
