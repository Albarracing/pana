import { useContext } from "react";
import ClientesProvider from "../contex/ClientesProvider";
import ClientesContext from "../contex/ClientesProvider";

const useClientes = () => {
  return useContext(ClientesContext);
};

export default useClientes;
