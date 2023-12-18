import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./Pages/Admin";
import Home from "./Pages/Home";

const App: React.FC = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
);
export default App;
