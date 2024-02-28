import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <Link to="/Clientes">
          <button className="bg-blue-600 mx-10 mt-5 w-44 rounded-md">
            clientes
          </button>
        </Link>

        <Link to="/Articulos">
          <button className="bg-blue-600 mx-10 w-44 rounded-md">
            Articulos
          </button>
        </Link>

        <Link to="/Repartos">
          <button className="bg-blue-600 mx-10 w-44 rounded-md">
            Repartos
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
