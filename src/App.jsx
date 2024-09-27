import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import RegistrationPage from "./components/RegistrationPage";
import ClientsPage from "./components/ClientsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserPage from "./components/UserPage";
import EditProfilePage from "./components/EditProfilePage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<UserPage/>}/>
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
