import "../Css/TopNewsInfos.css";
import { Container, Typography } from "@mui/material";

const TopNewsInfos: React.FC = () => {
  return (
    <Container className="containerTopNewsInfos">
      <div className="newsContainer">
        <Typography variant="h1">Actualités</Typography>
      </div>
    </Container>
  );
};

export default TopNewsInfos;