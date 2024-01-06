import React, { useEffect, useState } from "react";
import { Container, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import "../../Css/UserInfo.css";
import api from "../../axios.config";

const UserInfo: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userData, setUserData] = useState({
    id: 0,
    username: "",
    email: "",
    lastName: "",
    firstName: "",
  });

  const handleEditClick = () => {
    setOpenDialog(true);
  };

  const handleSaveClick = () => {
    const updatedUserData = {
      id: userData.id,
      username: "Nouveau Pseudo", 
      email: "Nouveau Email", 
      lastName: "Nouveau nom", 
      firstName: "Nouveau Prenom", 
    };

    api.put(`/user/${userData.id}`, updatedUserData)
      .then((response) => {
        console.log(response);
        setUserData(updatedUserData);
        setOpenDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    api.get("/user/me")
    .then((response) => {
      const responseData = response.data.body.user;
      setUserData({
        id: responseData.id,
        username: responseData.username,
        email: responseData.email,
        lastName: responseData.lastName,
        firstName: responseData.firstName,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  , []);

  return (
    <Container className="containerUserInfo">
      <Typography variant="h3">Informations Profil</Typography>
      <br/>
      <div className="infoBox">
        <Typography variant="h4">Pseudo : {userData.username}</Typography>
        <br/>
        <Typography variant="h4">Email : {userData.email}</Typography>
        <br/>
        <Typography variant="h4">Nom : {userData.lastName}</Typography>
        <br/>
        <Typography variant="h4">Prénom : {userData.firstName}</Typography>
        <br/>
        <Button variant="contained" onClick={handleEditClick}>
          Modifier
        </Button>
        <Dialog open={openDialog} className="dialogProfil" onClose={handleCloseDialog}>
          <DialogTitle>Modifier les informations</DialogTitle>
          <DialogContent className="dialogProfilEdit">
            <TextField label={userData.username} variant="outlined" fullWidth />
            <TextField label={userData.email} variant="outlined" fullWidth />
            <TextField label={userData.lastName} variant="outlined" fullWidth />
            <TextField label={userData.firstName} variant="outlined" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button variant="contained" onClick={handleSaveClick}>
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
};



export default UserInfo;
