import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  return (
    <ClientesContext.Provider
      value={{
        clientes,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

export default ClientesContext;
