import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Login from "./Auth/Login";
import HomeD from "./Dietitian/HomeD";
import Onboarding from "./Auth/Onboarding";
import HomeU from "./User/HomeU";
import CheckInfo from "./Dietitian/CheckInfo";
import AddPatient from "./Dietitian/AddPatient";
import DietChart from "./User/DietChart";
import Dashboard from "./Dietitian/Dashboard";
import ProfileU from "./User/ProfileU";
import MyDietChart from "./User/MyDietChart";
import CreateOwnChart from "./User/CreateOwnChart";
import Documentation from "./components/Documentation";
import Admin from "./Admin/Admin";
import Report from "./User/Report";
import DataDashboard from "./components/DataDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Onboarding />} />
          <Route path="login" element={<Login />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="dhome" element={<HomeD />} />
          <Route path="uhome" element={<HomeU />} />
          <Route path="check-info" element={<CheckInfo />} />
          <Route path="add-patient" element={<AddPatient />} />
          <Route path="diet-chart" element={<DietChart />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="uprofile" element={<ProfileU />} />
          <Route path="my-diet-chart" element={<MyDietChart />} />
          <Route path="create-own-chart" element={<CreateOwnChart />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="admin" element={<Admin />} />
          <Route path="report" element={<Report />} />
          <Route path="data-dashboard" element={<DataDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
