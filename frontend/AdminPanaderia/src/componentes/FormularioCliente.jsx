import React from "react";
import { useState } from "react";
import Alerta from "./Alerta";
import useClientes from "../hook/useClientes";

const FormularioCliente = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fecha_alta, setFecha_alta] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");

  const [alerta, setAlerta] = useState({});

  const {} = useClientes();

  const handleSubmit = (e) => {
    e.preventDefault();

    //validar formulario
    if ([nombre, apellido, fecha_alta, direccion, celular].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h2 className="font-black  text-3xl text-center">
        Administrador de Clientes
      </h2>
      <p className=" text-xl mt-5 mb-10 text-center">
        Añade tus Clientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-slate-50  py-5 px-10 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre del cliente"
            className="border w-80 bg-white rounded-xl p-3 mt-3"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          ></input>
        </div>

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Apellido
          </label>
          <input
            type="text"
            placeholder="Apellido del cliente"
            className="border w-80 bg-white rounded-xl p-3 mt-3"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          ></input>
        </div>

        <div className="mb-5">
          <label
            htmfor="fecha"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Fecha de alta
          </label>
          <input
            id="fecha"
            type="date"
            className="border-2 w-80 p-2 mt-2 placeholder-gray-400 bg-white rounded-md"
            value={fecha_alta}
            onChange={(e) => setFecha_alta(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Direccion
          </label>
          <input
            type="text"
            placeholder="Direccion"
            className="border w-80 p-3 mt-3 bg-white rounded-xl"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          ></input>
        </div>

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Celular
          </label>
          <input
            type="number"
            placeholder="Celular"
            className="border w-80 p-3 mt-3 bg-white rounded-xl"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
          ></input>
        </div>

        <input
          type="submit"
          value="Registrar cliente"
          className="bg-indigo-700 w-80 py-3 rounded-xl text-white uppercase font-bold  hover:cursor-pointer hover:bg-indigo-800"
        />
        <br />
        <br />
        {msg && <Alerta alerta={alerta} />}
      </form>
    </>
  );
};

export default FormularioCliente;
