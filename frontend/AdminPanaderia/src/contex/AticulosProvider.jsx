import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { data } from "autoprefixer";

const ArticulosContext = createContext();

export const ArticulosProvider = ({ children }) => {
  const [articulos, setArticulos] = useState([]);
  const [articulo, setArticulo] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerArticulos = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/articulos/"
        );
        setArticulos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerArticulos();
  }, []);

  const guardarArticulo = async (articulo) => {
    try {
      // setError(null);

      // let data;

      // if (articulo._id) {
      //   // Actualización de cliente existente
      //   const response = await axios.put(
      //     `http://localhost:4000/api/articulos/${articulo._id}`,
      //     articulo
      //   );
      //   data = response.data;
      // } else {
      // Creación de un nuevo cliente
      const response = await axios.post(
        "http://localhost:3000/api/articulos/",
        articulo
      );
      const { createdAt, updateAt, __v, ...ArticuloGuardado } = response;
      setArticulo([ArticuloGuardado, ...articulos]);
      //data = response.data;
      //}

      // Verificar si la respuesta del servidor contiene datos
      // if (data) {
      //   // Actualizar el estado de clientes
      //   setArticulos((articulos) => {
      //     // Si estamos actualizando, actualizamos el cliente existente
      //     if (articulo._id) {
      //       return articulos.map((articuloState) =>
      //         articuloState._id === data._id ? data : articuloState
      //       );
      //     } else {
      //       // Si estamos creando, agregamos el nuevo cliente al inicio del array
      //       return [data, ...articulos];
      //     }
      //   });
      // }
    } catch (error) {
      console.error(error);

      // if (articulo._id) {
      //   setError("Error al actualizar el articulo");
      // } else {
      //   setError(error.response?.data?.msg || "Error al crear el articulo");
      // }
    }
  };

  const setEditando = (articulo) => {
    setArticulo(articulo);
  };

  const eliminarArticulo = async (id) => {
    const confirmar = confirm("Seguro que deseas eliminar?");

    if (confirmar) {
      try {
        const { data } = await axios.delete(
          `http://localhost:3000/api/articulos/${id}`
        );
        const articulosActualizados = articulos.filter(
          (artiucloState) => artiucloState._id !== id
        );
        setArticulos(articulosActualizados);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <ArticulosContext.Provider
      value={{
        articulos,
        guardarArticulo,
        setEditando,
        articulo,
        eliminarArticulo,
      }}
    >
      {children}
    </ArticulosContext.Provider>
  );
};

export default ArticulosContext;
