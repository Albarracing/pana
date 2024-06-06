import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { data } from "autoprefixer";

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});
  const [error, setError] = useState(null);

  const obtenerClientes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/clientes/");
      setClientes(response.data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };
  useEffect(() => {
    obtenerClientes();
  }, []);

  // useEffect(() => {
  //   const obtenerClientes = async () => {
  //     try {
  //       const { data } = await axios.get("http://localhost:4000/api/clientes/");
  //       setClientes(data);
  //       // console.log("Clientes fetched:", data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   obtenerClientes();
  // }, []);

  const guardarCliente = async (clienteData) => {
    try {
      // Extraer los datos del cliente y los productos del objeto clienteData
      const {
        nombre,
        apellido,
        direccion,
        celular,
        localidad,
        articuloData,
        _id,
      } = clienteData;

      // Validar que los datos del cliente estén completos
      if (
        !nombre ||
        !apellido ||
        !direccion ||
        !celular ||
        !localidad ||
        !articuloData
      ) {
        throw new Error("Falta información del cliente en la solicitud.");
      }
      let response;

      if (_id) {
        // Si el cliente tiene un _id, se trata de una actualización
        response = await axios.put(
          `http://localhost:3000/api/clientes/${_id}`,
          clienteData
        );
        setClientes(
          clientes.map((cliente) =>
            cliente._id === _id ? response.data : cliente
          )
        );
      } else {
        // Enviar la solicitud POST al servidor para guardar el cliente y los detalles del reparto

        const response = await axios.post(
          "http://localhost:3000/api/clientes/",
          clienteData
        );
        //obtenerClientes();
        // Actualizar el estado local de clientes si la solicitud fue exitosa
        setClientes([...clientes, response.data]);
      }
      console.log("Datos del cliente enviados al backend:", clienteData);
    } catch (error) {
      console.error(error);
      setError(error.message || "Hubo un error al procesar la solicitud.");
    }
  };
  const setEditando = (cliente) => {
    setCliente(cliente);
  };
  // const setEditando = (cliente) => {
  //   setCliente(cliente);
  // };
  // if (cliente.id) {
  //   try {
  //     const { data } = await axios.put(
  //       `http://localhost:4000/api/clientes/${cliente.id}`,
  //       cliente
  //     );
  //     const clienteActualizado = cliente.map((clienteState) =>
  //       clienteState._id === data._id ? data : clienteState
  //     );
  //     setCliente(clienteActualizado);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } else {
  // setError(null);

  // let data;

  // if (cliente._id) {
  //   // Actualización de cliente existente
  //   const response = await axios.put(
  //     `http://localhost:4000/api/clientes/${cliente._id}`,
  //     cliente
  //   );
  //   data = response.data;
  // } else {
  // Creación de un nuevo cliente

  //};
  //data = response.data;
  //}

  // Verificar si la respuesta del servidor contiene datos
  // if (data) {
  //   // Actualizar el estado de clientes
  //   setClientes((clientes) => {
  //     // Si estamos actualizando, actualizamos el cliente existente
  //     if (cliente._id) {
  //       return clientes.map((clienteState) =>
  //         clienteState._id === data._id ? data : clienteState
  //       );
  //     } else {
  //       // Si estamos creando, agregamos el nuevo cliente al inicio del array
  //       return [data, ...clientes];
  //     }
  //   });
  // }

  //   if (cliente._id) {
  //     setError("Error al actualizar el cliente");
  //   } else {
  //     setError(error.response?.data?.msg || "Error al crear el cliente");
  //   }

  // const guardarCliente = async (cliente) => {
  //
  //   try {
  //     // Resetear el estado de error al intentar guardar un cliente
  //     setError(null);

  //     if (cliente._id) {
  //       const { data } = await axios.put(
  //         `http://localhost:4000/api/clientes/${cliente._id}`,
  //         cliente
  //       );

  //       // Optimización: Actualizar solo el cliente que ha sido modificado
  //       //setClientes((clientes) =>
  //       const clienteActualizado = clientes.map((clienteState) =>
  //         clienteState._id === data._id ? data : clienteState
  //       );
  //       setClientes(clienteActualizado);

  //       //);
  //     } else {
  //       try {
  //         const { data } = await axios.post(
  //           "http://localhost:4000/api/clientes/",
  //           { ...cliente, id: undefined }
  //         );
  //         console.log("Cliente creado:", data);
  //       } catch (error) {
  //         console.error("Error al crear el cliente:", error.response.data);
  //       }
  //       // Optimización: Extraer propiedades innecesarias de la respuesta del servidor
  //       const { createdAt, updatedAt, __v, ...clienteAlmacenado } = data;

  //       // Optimización: Agregar el nuevo cliente al inicio del array
  //       setClientes([clienteAlmacenado, ...clientes]);
  //     }
  //   } catch (error) {
  //     console.error(error);

  //     // Manejar errores específicos según el tipo de operación (actualización o creación)
  //     if (cliente._id) {
  //       setError("Error al actualizar el cliente");
  //     } else {
  //       setError(error.response.data.msg || "Error al crear el cliente");
  //     }
  //   }
  // };

  // ...

  // En tu componente, puedes mostrar el mensaje de error si `error` no es nulo.

  const eliminarCliente = async (id) => {
    const confirmar = confirm("Seguro que deseas eliminar?");

    if (confirmar) {
      try {
        const { data } = await axios.delete(
          `http://localhost:4000/api/clientes/${id}`
        );
        // const clientesActualizados = clientes.filter(
        //   (clienteState) => clienteState._id !== id
        // );
        setClientes((prevClientes) =>
          prevClientes.filter((clienteState) => clienteState._id !== id)
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <ClientesContext.Provider
      value={{
        clientes,
        obtenerClientes,
        guardarCliente,
        setEditando,
        cliente,
        eliminarCliente,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

export default ClientesContext;
