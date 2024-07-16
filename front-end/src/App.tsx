import React from "react";
import "./App.css";
import Header from "./components/layout/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PrivateRoutes from "./routing/PrivateRoute";
import Error404 from "./pages/Error404";
import { Toaster } from "sonner";
import Alert from "./components/Alert";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Alert />

        <Routes>
          {/* <Route element={<PrivateRoutes />}> */}
          <Route path="/" element={<Home />} />
          {/* </Route> */}

          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />

          <Route path="/*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
      {/* <h1>
            Advance{" "}
            <span className="font-bold text-emerald-300	underline decoration-wavy">
              TODO{" "}
            </span>
            App
          </h1> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default App;
