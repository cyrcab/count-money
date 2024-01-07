import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import '../../Css/UserInfo.css'
import api from '../../axios.config'
import { useSelector } from 'react-redux'
import { RootState } from '../../Context/RootReducer'

const UserInfo: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [userData, setUserData] = useState({
    id: 0,
    email: '',
    lastName: '',
    firstName: '',
  })
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (user !== null) {
      setUserData({
        id: user.id,
        email: user.email,
        lastName: user.lastname,
        firstName: user.firstname,
      })
    }
  }, [user])

  const handleEditClick = () => {
    setOpenDialog(true)
  }

  const handleSaveClick = () => {
    const updatedUserData = {
      id: userData.id,
      username: 'Nouveau Pseudo',
      email: 'Nouveau Email',
      lastName: 'Nouveau nom',
      firstName: 'Nouveau Prenom',
    }

    api
      .patch(`/user/${userData.id}`, updatedUserData)
      .then((response) => {
        console.log(response)
        setUserData(updatedUserData)
        setOpenDialog(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <Container className="containerUserInfo">
      <Typography variant="h3">Informations Profil</Typography>
      <br />
      <div className="infoBox">
        <Typography variant="h4">Email : {userData.email}</Typography>
        <br />
        <Typography variant="h4">Nom : {userData.lastName}</Typography>
        <br />
        <Typography variant="h4">Prénom : {userData.firstName}</Typography>
        <br />
        <Button variant="contained" onClick={handleEditClick}>
          Modifier
        </Button>
        <Dialog open={openDialog} className="dialogProfil" onClose={handleCloseDialog}>
          <DialogTitle>Modifier les informations</DialogTitle>
          <DialogContent className="dialogProfilEdit">
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
  )
}

export default UserInfo
