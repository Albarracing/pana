import { useContext } from "react";
import ClientesProvider from "../contex/ClientesProvider";

const useClientes = () => {
  return useContext(ClientesProvider);
};

export default useClientes;
