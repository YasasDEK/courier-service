import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ShipmentForm from "./components/pages/Shipment/ShipmentForm";
import AllShipments from "./components/pages/Shipment/AllShipments";
import SingleShipment from "./components/pages/Shipment/SingleShipment";
import Users from "./components/pages/Users";

const PrivateRoute = () => {
  const isAuthenticated = Boolean(localStorage.getItem("email"));
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const AnonymousRoute = () => {
  const isAuthenticated = Boolean(localStorage.getItem("email"));
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-shipment" element={<ShipmentForm />} />
          <Route path="/shipments" element={<AllShipments />} />
          <Route path="/shipments/:id" element={<SingleShipment />} />
          <Route path="/users" element={<Users />} />
        </Route>

        <Route element={<AnonymousRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
