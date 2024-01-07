import React, { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import "../../Css/UserManagement.css";
import api from "../../axios.config";

interface Role {
  id: number;
  name: string;
}

interface User {
  id : number;
  username: string;
  lastname: string;
  firstname: string;
  email: string;
  role: Role;
}

const initialUser: User = {
  id : 0,
  username: "",
  lastname: "",
  firstname: "",
  email: "",
  role: {id : 1, name: ""}};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);// Utilisation de initialUser pour indiquer le type de formulaire
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>(initialUser);

  const {
    register,
    handleSubmit,
  } = useForm<User>(); // Utilisation de useForm<User> pour indiquer le type de formulaire

  useEffect(() => {
    api.get("/user/")
      .then((response) => {
        setUsers(response.data.body.users || []);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      });
  }, []);

    const openEditPopup = (user: User) => {
      setSelectedUser(user);
      setEditPopupOpen(true);
    };

  const closeEditPopup = () => {
    setEditPopupOpen(false);
  };

  const openDeletePopup = (user: User) => {
    setSelectedUser(user);
    setDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setDeletePopupOpen(false);
  };

  const editUser: SubmitHandler<User> = (data) => {
    const updatedUsers = users.map((user) =>
      user.username === selectedUser.username ? data : user
    );
    setUsers(updatedUsers);
    closeEditPopup();
    const dataToSend = {
      lastname: data.lastname,
      firstname: data.firstname,
      email: data.email,
    };
    api.patch(`/user/${selectedUser.id.toString()}` , dataToSend )
      .then((response) => {
        
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la modification de l'utilisateur :", error);
        console.log(data);
        console.log(typeof selectedUser.id.toString());
      });
  };

  const deleteUser = () => {
    const updatedUsers = users.filter(
      (user) => user.username !== selectedUser.username
    );
    setUsers(updatedUsers);
    closeDeletePopup();
  };

  return (
    <div className="containerUserManagement">
      <div >
        <TableContainer component={Paper} className="UserTableContainer">
          <Table className="UserTable">
            <TableHead>
              <TableRow>
                <TableCell>Lastname</TableCell>
                <TableCell>Firstname</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role.name}</TableCell> 
                  
                  <TableCell>
                    <Button onClick={() => openEditPopup(user)}>Éditer</Button>
                    <Button onClick={() => openDeletePopup(user)}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit Popup */}
      <Dialog open={isEditPopupOpen} onClose={closeEditPopup}>
        <DialogTitle>Éditer un utilisateur</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(editUser)} className="custom-dialog">
            <TextField
              label="Lastname"
              defaultValue={selectedUser.lastname}  
            />
            <TextField
              label="Firstname"
              defaultValue={selectedUser.firstname}
            />
            <TextField
              label="Email"
              defaultValue={selectedUser.email}    
            />
            <TextField
              label="Role"
              select
              defaultValue={selectedUser.role.id}  
              {...register("role")}
              disabled  
            > 
            </TextField>
            <div className="DialogButton">
              <Button type="submit">Editer</Button>
              <DialogActions>
                <Button onClick={closeEditPopup}>Fermer</Button>
              </DialogActions>
            </div>
          </form>
        </DialogContent>
      </Dialog>


        <Dialog open={isDeletePopupOpen} onClose={closeDeletePopup}>
          <DialogTitle>Supprimer un utilisateur</DialogTitle>
          <DialogContent>
            Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
            <strong>{selectedUser.username}</strong> ?
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteUser}>Supprimer</Button>
            <Button onClick={closeDeletePopup}>Annuler</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );

};

export default UserManagement;
