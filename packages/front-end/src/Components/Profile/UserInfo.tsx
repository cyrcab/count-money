import React, { useState } from "react";
import { Container, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

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
      <Typography variant="h2">Informations Profile</Typography>
      <br/>
      <div className="infoBox">
        <Typography variant="h4">Username : JohnDoe</Typography>
        <br/>
        <Typography variant="h4">Email : john.doe@example.com</Typography>
        <br/>
        <Typography variant="h4">Last Name : Doe</Typography>
        <br/>
        <Typography variant="h4">First Name : John</Typography>
        <br/>
        <Button variant="contained" onClick={handleEditClick}>
          Modifier
        </Button>
        <Dialog open={openDialog} className="dialogProfil" onClose={handleCloseDialog}>
          <DialogTitle>Modifier les informations</DialogTitle>
          <DialogContent className="dialogProfilEdit">
            {/* Form for editing information */}
            <TextField label="New Username" variant="outlined" fullWidth />
            <TextField label="New Email" variant="outlined" fullWidth />
            <TextField label="New Last Name" variant="outlined" fullWidth />
            <TextField label="New First Name" variant="outlined" fullWidth />
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
