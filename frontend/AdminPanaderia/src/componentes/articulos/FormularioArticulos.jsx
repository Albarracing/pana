import React, { useEffect } from "react";
import { useState } from "react";
import Alerta from "../Alerta";
import useArticulos from "../../hook/useArticulos";

const FormularioArticulos = () => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio_uni, setPrecio_uni] = useState("");
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { guardarArticulo, articulo } = useArticulos();

  useEffect(() => {
    if (articulo?.codigo) {
      setCodigo(articulo.codigo);
      setNombre(articulo.nombre);
      setPrecio_uni(articulo.precio_uni);
      setId(articulo._id);
    }
  }, [articulo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //validar formulario
    if ([codigo, nombre, precio_uni].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    //setAlerta({});

    guardarArticulo({ codigo, nombre, precio_uni });
    setAlerta({ msg: "Guardado correctamente" });
    setCodigo("");
    setNombre("");
    setPrecio_uni("");
    setId("");
  };

  const { msg } = alerta;

  return (
    <>
      <h2 className="font-black  text-3xl text-center">
        Administrador de Articulos
      </h2>
      <p className=" text-xl mt-5 mb-10 text-center">
        Añade tus Articulos y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-slate-50  py-5 px-10 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Codigo
          </label>
          <input
            type="text"
            placeholder="Codigo del articulo"
            className="border w-80 bg-white rounded-xl p-3 mt-3"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          ></input>
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre del articulo"
            className="border w-80 bg-white rounded-xl p-3 mt-3"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          ></input>
        </div>

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Precio por unidad
          </label>
          <input
            type="number"
            placeholder="Precio por unidad"
            className="border w-80 p-3 mt-3 bg-white rounded-xl"
            value={precio_uni}
            onChange={(e) => setPrecio_uni(e.target.value)}
          ></input>
        </div>

        <input
          type="submit"
          value={id ? "Guardar cambios" : "Registrar articulo"}
          className="bg-indigo-700 w-80 py-3 rounded-xl text-white uppercase font-bold  hover:cursor-pointer hover:bg-indigo-800"
        />
        <br />
        <br />
        {msg && <Alerta alerta={alerta} />}
      </form>
    </>
  );
};

export default FormularioArticulos;
