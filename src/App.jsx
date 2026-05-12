import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

import { useState } from "react";

function App() {

  const [isAdmin, setIsAdmin] =
    useState(false);

  return (

    <BrowserRouter>

      {/* NAVBAR */}

      <div
        style={{
          background: "#111",
          color: "white",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid tomato"
        }}
      >

        <h2
          style={{
            color: "tomato"
          }}
        >
          Food Delivery 🍔
        </h2>

        <button
          onClick={() =>
            setIsAdmin(!isAdmin)
          }
          style={{
            padding: "10px 20px",
            background: "tomato",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >

          {
            isAdmin
            ? "Switch To User 👤"
            : "Switch To Admin 👑"
          }

        </button>

      </div>

      <Routes>

        {/* LOGIN PAGE */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* HOME / ADMIN */}

        <Route
          path="/"
          element={
            isAdmin
            ? <Admin />
            : <Home />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;