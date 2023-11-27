import "../Css/TopBar.css";
import { Container } from "@mui/material";

const TopBar: React.FC = () => {
  return (
    <Container className="containerTopBar" maxWidth='xl' >
      <h1 style={{ color: "#FEDA84" }}>Logo</h1>
    </Container>
  );
};

export default TopBar;