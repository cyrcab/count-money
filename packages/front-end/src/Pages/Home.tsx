// Home.tsx
import Button from "@mui/material/Button";
import "../Css/Home.css";

const Home: React.FC = () => {
  return (
    <div className="containerHome">
      <h1 style={{ color: "#FEDA84" }}>Liste des Cryptomonnaies</h1>
      <Button variant="contained" color="primary">
        Salut
      </Button>
    </div>
  );
};

export default Home;
