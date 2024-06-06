import React, { useEffect } from "react";
import { useState } from "react";
import Alerta from "../Alerta";
import useRepartos from "../../hook/useRepartos";

const FormularioReparto = () => {
  const [fecha, setFecha] = useState("");
  const [cod_personal, setCod_personal] = useState("");
  const [cod_localidades, setCod_localidades] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [devuelve, setDevuelve] = useState("");
  const [cod_orden, setCod_orden] = useState("");
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { guardarReparto, reparto } = useRepartos();

  useEffect(() => {
    if (reparto?.fecha) {
      setFecha(reparto.fecha);
      setCod_personal(reparto.cod_personal);
      setCod_localidades(reparto.cod_localidades);
      setPrecio(reparto.precio);
      setCantidad(reparto.cantidad);
      setDevuelve(reparto.devuelve);
      setCod_orden(reparto.cod_orden);
      setId(reparto._id);
    }
  }, [reparto]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //validar formulario
    if (
      [
        fecha,
        cod_personal,
        cod_localidades,
        precio,
        cantidad,
        devuelve,
        cod_orden,
      ].includes("")
    ) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (id) {
      guardarReparto({
        fecha,
        cod_personal,
        cod_localidades,
        precio,
        cantidad,
        devuelve,
        cod_orden,
        //id,
      });
    } else {
      guardarReparto({
        fecha,
        cod_personal,
        cod_localidades,
        precio,
        cantidad,
        devuelve,
        cod_orden,
      });
    }
    setAlerta({ msg: "Guardado correctamente" });
    setFecha("");
    setCod_personal("");
    setCod_localidades("");
    setPrecio("");
    setCantidad("");
    setDevuelve("");
    setCod_orden("");
    setId("");
  };

  const { msg } = alerta;

  return (
    <>
      <h2 className="font-black  text-3xl text-center">
        Administrador de repartos
      </h2>
      <p className=" text-xl mt-5 mb-10 text-center">
        Añade tus repartos y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-slate-50  py-5 px-10 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            fecha
          </label>
          <input
            type="date"
            placeholder=""
            className="border w-80 bg-white rounded-xl p-3 mt-3"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          ></input>
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Cliente
          </label>
          <input
            type="text"
            placeholder="Seleccione un cliente"
            className="border w-80 bg-white rounded-xl p-3 mt-3"
            //value={cod_personal}
            //onChange={(e) => setCod_personal(e.target.value)}
          ></input>
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Artiuclo
          </label>
          <div>
            <select className="form-select border w-80 bg-white rounded-xl p-3 mt-3">
              <option>Seleccione un articulo</option>
              <option>Pan</option>
              <option>Factura</option>
              <option>Bizcocho</option>
            </select>
          </div>
        </div>

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            codigo personal
          </label>
          <input
            type="number"
            placeholder="Codigo personal"
            className="border w-80 bg-white rounded-xl p-3 mt-3"
            value={cod_personal}
            onChange={(e) => setCod_personal(e.target.value)}
          ></input>
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            codigo localidad
          </label>
          <input
            type="number"
            placeholder="Codigo de la localidad"
            className="border w-80 bg-white rounded-xl p-3 mt-3"
            value={cod_localidades}
            onChange={(e) => setCod_localidades(e.target.value)}
          ></input>
        </div>

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Cantidad
          </label>
          <input
            type="number"
            placeholder="Cantiddad"
            className="border w-80 p-3 mt-3 bg-white rounded-xl"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          ></input>
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Importe
          </label>
          <input
            type="number"
            placeholder="Importe"
            className="border w-80 p-3 mt-3 bg-white rounded-xl"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          ></input>
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            devuelve
          </label>
          <input
            type="number"
            placeholder="Cantidad que devuelve"
            className="border w-80 p-3 mt-3 bg-white rounded-xl"
            value={devuelve}
            onChange={(e) => setDevuelve(e.target.value)}
          ></input>
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            codigo orden
          </label>
          <input
            type="number"
            placeholder="Codigo de orden"
            className="border w-80 p-3 mt-3 bg-white rounded-xl"
            value={cod_orden}
            onChange={(e) => setCod_orden(e.target.value)}
          ></input>
        </div>
        <input
          type="submit"
          value={id ? "Guardar cambios" : "Registrar reparto"}
          className="bg-indigo-700 w-80 py-3 rounded-xl text-white uppercase font-bold  hover:cursor-pointer hover:bg-indigo-800"
        />
        <br />
        <br />
        {msg && <Alerta alerta={alerta} />}
      </form>
    </>
  );
};

export default FormularioReparto;
