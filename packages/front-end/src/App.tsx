import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />7
      <Route path="/crypto" element={<Navigate to="/crypto" />} />
      <Route path="/rssfeed" element={<Navigate to="/rssfeed" />} />
    </Routes>
  </BrowserRouter>
);
export default App;