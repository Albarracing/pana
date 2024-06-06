import React, { useEffect, useState } from "react";
import Alerta from "./Alerta";
import useClientes from "../hook/useClientes";
import axios from "axios";

const FormularioCliente = ({ onClose }) => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [productos, setProductos] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [id, setId] = useState(null);
  const { guardarCliente, cliente } = useClientes();

  useEffect(() => {
    if (cliente?.nombre) {
      setNombre(cliente.nombre);
      setApellido(cliente.apellido);
      setDireccion(cliente.direccion);
      setCelular(cliente.celular);
      setLocalidad(cliente.localidad);
      setId(cliente._id);
      setCodigo(cliente.codigo || "");
      if (cliente.articulos) {
        setProductos(
          cliente.articulos.map((articulo) => ({
            ...articulo,
            cantidad: articulo.cantidad || 0,
          }))
        );
      }
    }
  }, [cliente]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/articulos");
        setProductos(data.map((producto) => ({ ...producto, cantidad: 0 })));
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProductos();
  }, []);

  useEffect(() => {
    if (!id) {
      const obtenerCodigo = async () => {
        try {
          const { data } = await axios.get(
            "http://localhost:4000/api/clientes/"
          );
          setCodigo(data.codigo); // Obtener el código generado desde el backend
        } catch (error) {
          console.log(error);
        }
      };
      obtenerCodigo();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar formulario
    if ([nombre, apellido, direccion, celular, localidad].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    // Enviar datos al backend
    try {
      // Crear un objeto con los datos del cliente y los productos seleccionados
      const clienteData = {
        nombre,
        apellido,
        direccion,
        celular,
        localidad,
        articuloData: productos.map((producto) => ({
          productoId: producto._id,
          cantidad: producto.cantidad || 0,
        })),
      };

      // Llamar a la función guardarCliente del contexto
      const response = await guardarCliente(clienteData, id);

      setAlerta({
        msg: `Cliente ${id ? "actualizado" : "guardado"} correctamente`,
        error: false,
      });

      setCodigo(response.codigo || "");
      setNombre("");
      setApellido("");
      setDireccion("");
      setCelular("");
      setLocalidad("");
      setProductos([]);
      setId(null);
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
      setAlerta({
        msg: "Hubo un error al guardar el cliente. Por favor, inténtalo de nuevo.",
        error: true,
      });
    }
  };

  const handleCantidadChange = (e, productoId) => {
    const { value } = e.target;
    // Actualizar la cantidad del producto seleccionado
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto._id === productoId
          ? { ...producto, cantidad: parseInt(value) || 0 }
          : producto
      )
    );
  };

  // const [nombre, setNombre] = useState("");
  // const [apellido, setApellido] = useState("");
  // const [fecha_alta, setFecha_alta] = useState("");
  // const [direccion, setDireccion] = useState("");
  // const [celular, setCelular] = useState("");

  // const [productoId, setProductoId] = useState(""); // Nuevo campo para el ID del producto
  // const [productos, setProductos] = useState([]); // Estado para almacenar los productos obtenidos de la base de datos
  // const [productosSeleccionados, setProductosSeleccionados] = useState([]); // Estado para almacenar los productos seleccionados por el usuario y la cantidad
  // const [cantidad, setCantidad] = useState(""); // Nuevo campo para la cantidad

  // const [id, setId] = useState(null);

  // const [alerta, setAlerta] = useState({});

  // const { guardarCliente, cliente } = useClientes();

  // useEffect(() => {
  //   if (cliente?.nombre) {
  //     setNombre(cliente.nombre);
  //     setApellido(cliente.apellido);
  //     setFecha_alta(cliente.fecha_alta);
  //     setDireccion(cliente.direccion);
  //     setCelular(cliente.celular);
  //     setId(cliente._id);
  //   }
  // }, [cliente]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   //validar formulario
  //   if (
  //     [
  //       nombre,
  //       apellido,
  //       fecha_alta,
  //       direccion,
  //       celular,
  //       productoId,
  //       cantidad,
  //       productosSeleccionados,
  //     ].includes("")
  //   ) {
  //     setAlerta({
  //       msg: "Todos los campos son obligatorios",
  //       error: true,
  //     });
  //     return;
  //   }

  //   //setAlerta({});

  //   guardarCliente({
  //     nombre,
  //     apellido,
  //     fecha_alta,
  //     direccion,
  //     celular,
  //     id,
  //     productosSeleccionados,
  //     // articuloData: [{ productoId, cantidad }],
  //   });
  //   setAlerta({ msg: "Guardado correctamente" });
  //   setNombre("");
  //   setApellido("");
  //   setFecha_alta("");
  //   setDireccion("");
  //   setCelular("");
  //   setId("");
  //   setProductoId("");
  //   setCantidad("");
  // };

  // const { msg } = alerta;

  // //funcion de productos
  // useEffect(() => {
  //   const obtenerProductos = async () => {
  //     try {
  //       const { data } = await axios.get("http://localhost:4000/api/articulos");
  //       setProductos(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   obtenerProductos();
  // }, []);

  // // Manejador de cambio para la selección de productos
  // const handleProductoChange = (e) => {
  //   const { value, checked } = e.target;
  //   if (checked) {
  //     // Agregar el producto seleccionado a la lista de productos seleccionados
  //     setProductosSeleccionados([
  //       ...productosSeleccionados,
  //       { productoId: value, cantidad },
  //     ]);
  //   } else {
  //     // Eliminar el producto deseleccionado de la lista de productos seleccionados
  //     setProductosSeleccionados(
  //       productosSeleccionados.filter(
  //         (producto) => producto.productoId !== value
  //       )
  //     );
  //   }
  // };

  // // Manejador de cambio para la cantidad de un producto
  // const handleCantidadChange = (e, productoId) => {
  //   const { value } = e.target;
  //   // Actualizar la cantidad del producto seleccionado
  //   setProductosSeleccionados((prevProductosSeleccionados) =>
  //     prevProductosSeleccionados.map((producto) =>
  //       producto.productoId === productoId
  //         ? { ...producto, cantidad: value }
  //         : producto
  //     )
  //   );
  // };

  // // Función para manejar la selección de un producto
  // const handleProductoSeleccionado = (productoId, nombre) => {
  //   const cantidad = prompt(`Ingrese la cantidad para ${nombre}:`);
  //   if (cantidad !== null) {
  //     // Agregar el producto seleccionado con su cantidad a la lista de productos seleccionados
  //     setProductosSeleccionados((prevProductosSeleccionados) => [
  //       ...prevProductosSeleccionados,
  //       { productoId, nombre, cantidad },
  //     ]);
  //   }
  // };
  return (
    <>
      {/* <h2 className="font-black  text-3xl text-center">
        Administrador de Clientes
      </h2>
      <p className=" text-xl mt-5 mb-10 text-center">
        Añade tus Clientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p> */}

      <form className="" onSubmit={handleSubmit}>
        <div className="flex w-1/2">
          <div className="  ">
            <label className="uppercase text-gray-600  text-xl font-bold">
              Cod
            </label>
            <input
              type="text"
              placeholder=""
              className="border w-16 h-10 bg-white rounded-xl p-3 mt-3 mr-5"
              value={codigo} // Mostrar el código generado aquí
              readOnly // Hacer que el campo sea de solo lectura
            ></input>
          </div>
          <div className="  ">
            <label className="uppercase text-gray-600  text-xl font-bold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Nombre del cliente"
              className="border w-52 h-10 bg-white rounded-xl p-3 mt-3 mr-5"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            ></input>
          </div>

          <div className="  ">
            <label className="uppercase text-gray-600  text-xl font-bold">
              Apellido
            </label>
            <input
              type="text"
              placeholder="Apellido del cliente"
              className="border w-52 bg-white rounded-xl p-3 mt-3 mr-5 h-10"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            ></input>
          </div>

          <div className="mb-5 ">
            <label
              htmfor="localidad"
              className="uppercase text-gray-600 text-xl font-bold"
            >
              Localidad
            </label>
            <input
              id="localidad"
              type="text"
              placeholder="Localidad"
              className="border w-52 bg-white rounded-xl p-3 mt-3 mr-5 h-10"
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
            />
          </div>
        </div>
        <div className="flex w-1/2">
          <div className=" ">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Direccion
            </label>
            <input
              type="text"
              placeholder="Direccion"
              className="border w-52 p-3 mt-3 bg-white rounded-xl mr-5 h-10"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            ></input>
          </div>

          <div className=" ">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Celular
            </label>
            <input
              type="number"
              placeholder="Celular"
              className="border w-52 p-3 mt-3 bg-white rounded-xl mr-5 h-10"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
            ></input>
          </div>
          <div className=" ">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Anulado
            </label>
            <input
              type="checkbox"
              placeholder=""
              className="border w-20 h-5 mt-3 bg-white rounded-xl"
              // value={celular}
              // onChange={(e) => setCelular(e.target.value)}
            ></input>
          </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-4 gap-4">
          <h2 className="uppercase text-gray-600 block text-xl font-bold mt-5">
            Seleccione los productos:
          </h2>
          {productos.map((producto) => (
            <div key={producto._id}>
              <label
                className="uppercase text-gray-600 block text-xl font-bold mt-5"
                htmlFor={producto._id}
              >
                {producto.nombre}
              </label>
              <input
                className="border w-32 p-3 mt-3 bg-white rounded-xl"
                type="number"
                id={producto._id}
                min="0"
                onChange={(e) => handleCantidadChange(e, producto._id)}
                placeholder="Cantidad"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <input
            type="submit"
            value={id ? "Guardar cambios" : "Registrar cliente"}
            className="bg-indigo-700  w-40 py-3 mt-7 mr-5 rounded-xl text-white uppercase font-bold  hover:cursor-pointer hover:bg-indigo-800"
          />
          <div>
            {/* Botón para cerrar */}
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 mt-8 px-4 rounded-xl"
            >
              Cerrar
            </button>
          </div>
        </div>
        <br />
        <br />

        {alerta.msg && <Alerta alerta={alerta} />}
      </form>
    </>
  );
};

export default FormularioCliente;
