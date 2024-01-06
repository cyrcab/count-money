import React, { useState } from "react";
import { Container, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import "../../Css/UserInfo.css";

const UserInfo: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleEditClick = () => {
    setOpenDialog(true);
  };

  const handleSaveClick = () => {
    // Add logic to save the updated information
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container className="containerUserInfo">
      <Typography variant="h3">Informations Profil</Typography>
      <br/>
      <div className="infoBox">
        <Typography variant="h4">Pseudo : JohnDoe</Typography>
        <br/>
        <Typography variant="h4">Email : john.doe@example.com</Typography>
        <br/>
        <Typography variant="h4">Nom : Doe</Typography>
        <br/>
        <Typography variant="h4">Prénom : John</Typography>
        <br/>
        <Button variant="contained" onClick={handleEditClick}>
          Modifier
        </Button>
        <Dialog open={openDialog} className="dialogProfil" onClose={handleCloseDialog}>
          <DialogTitle>Modifier les informations</DialogTitle>
          <DialogContent className="dialogProfilEdit">
            <TextField label="Nouveau Pseudo" variant="outlined" fullWidth />
            <TextField label="Nouveau Email" variant="outlined" fullWidth />
            <TextField label="Nouveau nom" variant="outlined" fullWidth />
            <TextField label="Nouveau Prenom" variant="outlined" fullWidth />
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
