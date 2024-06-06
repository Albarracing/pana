import { useState, useEffect } from "react";
import useClientes from "../hook/useClientes";
import FormularioCliente from "./FormularioCliente";
import PopupCliente from "./PopupCliente";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
//import { ClientesContext } from "../contex/ClientesProvider";

const ListadoDeClientes = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const { clientes, eliminarCliente, obtenerClientes, setEditando } =
    useClientes();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    obtenerClientes();
  }, [refresh]);
  //console.log(clientes);
  const handleOpenPopup = (cliente = null) => {
    setSelectedCliente(cliente);
    setEditando(cliente);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCliente(null);
  };

  const handleFormSubmit = (clienteData) => {
    setIsPopupOpen(false);
    setSelectedCliente(null);
    setRefresh(refresh + 1); // Forzar actualización de la tabla
  };
  const handleClickEliminar = async (id) => {
    await eliminarCliente(id); // Llama a la función eliminarCliente con el ID del cliente
    // Incrementar el contador de cambios para forzar la actualización de la tabla
    setRefresh(refresh + 1);
  };

  return (
    <>
      <div className="flex">
        <div>
          <button
            onClick={() => handleOpenPopup()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            +
          </button>

          <PopupCliente isOpen={isPopupOpen} onClose={handleClosePopup}>
            <FormularioCliente
              cliente={selectedCliente}
              onSubmit={handleFormSubmit}
              onClose={handleClosePopup}
            />
          </PopupCliente>
        </div>

        <div className="ml-7">
          <h1>Buscar</h1>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-2 py-2 text-center border">Cod</th>
            <th className="px-2 py-2 text-center border">Nombre</th>
            <th className="px-2 py-2 text-center border">Apellido</th>
            <th className="px-2 py-2 text-center border">Localidad</th>
            <th className="px-2 py-2 text-center border">Dirección</th>
            <th className="px-2 py-2 text-center border">Acciónes</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={index} className="bg-white even:bg-gray-100">
              <td className="px-5 py-2 text-center border">{cliente.codigo}</td>
              <td className="px-5 py-2 text-center border">{cliente.nombre}</td>
              <td className="px-5 py-2 text-center border">
                {cliente.apellido}
              </td>
              <td className="px-5 py-2 text-center border">
                {cliente.localidad}
              </td>
              <td className="px-5 py-2 text-center border">
                {cliente.direccion}
              </td>
              <td className="flex justify-center space-x-2">
                <button
                  onClick={() => handleOpenPopup(cliente)}
                  className="bg-blue-500 text-white px-2 py-1 mr-2 rounded hover:bg-blue-700 flex items-center"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-1" />
                </button>
                <button
                  onClick={() => handleClickEliminar(cliente._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 flex items-center"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {console.log("Clientes:", clientes)}
      {console.log("Longitud de la lista de clientes:", clientes.length)} */}
    </>
  );
};

export default ListadoDeClientes;
