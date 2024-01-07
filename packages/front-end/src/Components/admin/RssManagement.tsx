import React, { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../axios.config";
import "../../Css/RssManagement.css";

interface RssFilter {
  id: number;
  name: string;
  url: string;
}

const initialFilter: RssFilter = {
  id: 0,
  name: "",
  url: "",
};

const RssManagement: React.FC = () => {
  const [rssFilters, setRssFilters] = useState<RssFilter[]>([]);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<RssFilter>(initialFilter);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const {
    register,
    handleSubmit,
  } = useForm<RssFilter>();

  useEffect(() => {
    api.get("/rss_filter/")
      .then((response) => {
        const responseData = response.data.rssFilters;
        const fetchedFilters = responseData ? responseData || [] : [];
        setRssFilters(fetchedFilters);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des filtres RSS :", error);
      });
  }, []);

  const openEditPopup = (filter: RssFilter) => {
    setSelectedFilter(filter);
    setEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditPopupOpen(false);
  };

  const openAddPopup = () => {
    setAddPopupOpen(true);
  };

  const closeAddPopup = () => {
    setAddPopupOpen(false);
  };

  const editFilter: SubmitHandler<RssFilter> = (data) => {
    const updatedFilters = rssFilters.map((filter) =>
      filter.id === selectedFilter.id ? data : filter
    );
    setRssFilters(updatedFilters);
    closeEditPopup();
    const dataToSend = {
      name: data.name,
      url: data.url,
    };
    api.patch(`/rss_filter/${selectedFilter.id.toString()}`, dataToSend)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la modification du filtre RSS :", error);
      });
  };

  const openDeletePopup = (filter: RssFilter) => {
    setSelectedFilter(filter);
    setDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setDeletePopupOpen(false);
  };

  const addFilter: SubmitHandler<RssFilter> = (data) => {
    const updatedFilters = [...rssFilters, data];
    setRssFilters(updatedFilters);
    closeAddPopup();
    const dataToSend = {
      name: data.name,
      url: data.url,
    };
    api.post("/rss_filter/", dataToSend)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du filtre RSS :", error);
      });
  };

  const deleteRssFilter = () => {
    const updatedFilters = rssFilters.filter(
      (filter) => filter.name !== selectedFilter.name
    );
    setRssFilters(updatedFilters);
    closeDeletePopup();
    api.delete(`/rss_filter/${selectedFilter.id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du filtre RSS :", error);
      });
  };

  return (
    <div>
      <div className="containerRssManagement">
        <Button onClick={openAddPopup}>Ajouter un filtre RSS</Button>
        <TableContainer component={Paper} className="RssTableContainer">
          <Table className="RssTable">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rssFilters.map((filter, index) => (
                <TableRow key={index}>
                  <TableCell>{filter.name}</TableCell>
                  <TableCell>{filter.url}</TableCell>
                  <TableCell>
                    <Button onClick={() => openEditPopup(filter)}>Éditer</Button>
                    <Button onClick={() => openDeletePopup(filter)}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit Popup */}
        <Dialog open={isEditPopupOpen} onClose={closeEditPopup}>
          <DialogTitle>Éditer un filtre RSS</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(editFilter)} className="custom-dialog">
              <TextField
                label="Nom"
                defaultValue={selectedFilter.name}
                {...register("name")}
              />
              <TextField
                label="URL"
                defaultValue={selectedFilter.url}
                {...register("url")}
              />
              <div className="DialogButton">
                <Button type="submit">Éditer</Button>
                <DialogActions>
                  <Button onClick={closeEditPopup}>Fermer</Button>
                </DialogActions>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Add Popup */}
        <Dialog open={isAddPopupOpen} onClose={closeAddPopup}>
          <DialogTitle>Ajouter un filtre RSS</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(addFilter)} className="custom-dialog">
              <TextField
                label="Nom"
                {...register("name", { required: true })}
              />
              <TextField
                label="URL"
                {...register("url", { required: true })}
              />
              <div className="DialogButton">
                <Button type="submit">Ajouter</Button>
                <DialogActions>
                  <Button onClick={closeAddPopup}>Fermer</Button>
                </DialogActions>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeletePopupOpen} onClose={closeDeletePopup}>
          <DialogTitle>Supprimer un Flux Rss</DialogTitle>
          <DialogContent>
            Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
            <strong>{selectedFilter.name}</strong> ?
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteRssFilter}>Supprimer</Button>
            <Button onClick={closeDeletePopup}>Annuler</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default RssManagement;
