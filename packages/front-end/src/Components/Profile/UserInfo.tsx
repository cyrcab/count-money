import "../../Css/UserInfo.css";
import { Container, Typography } from "@mui/material";

const UserInfo: React.FC = () => {
  return (
    <Container className="containerUserInfo">
      <Typography variant="h2">Informations Profile</Typography>
      <br/>
      <div className="infoBox">
        <Typography variant="h4">Username : </Typography>
        <Typography variant="h4">Email : </Typography>
        <Typography variant="h4">Last Name : </Typography>
        <Typography variant="h4">First Name : </Typography>
      </div>
    </Container>
  );
};

export default UserInfo;