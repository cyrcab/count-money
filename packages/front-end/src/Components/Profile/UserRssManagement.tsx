// UserRssManagement.tsx
import React, { useEffect, useState } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
} from "@mui/material";
import "../../Css/UserRssManagement.css";
import { SelectChangeEvent } from '@mui/material/Select';
import api from "../../axios.config";

interface RssFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RSS_filter: any;
  id: number;
  name: string;
  url: string;
}
import api from "../../axios.config";

interface RssFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RSS_filter: any;
  id: number;
  name: string;
  url: string;
}

const UserRssManagement: React.FC = () => {
  const [availableRssFilters, setAvailableRssFilters] = useState<RssFilter[]>([]);
  const [userRssFilter, setUserRssFilter] = useState<RssFilter[]>([]);
  const [availableRssFilters, setAvailableRssFilters] = useState<RssFilter[]>([]);
  const [userRssFilter, setUserRssFilter] = useState<RssFilter[]>([]);

const handleSelectChange = (event: SelectChangeEvent<string>) => {
  const selectedRssFilterName = event.target.value as string;
  const selectedRssFilter = availableRssFilters.find((rssFilter) => rssFilter?.name === selectedRssFilterName);

  if (selectedRssFilter && !userRssFilter.find((rssFilter) => rssFilter?.name === selectedRssFilterName)) {
    setUserRssFilter([...userRssFilter, selectedRssFilter as RssFilter]);
    addUserRssFilter(selectedRssFilter as RssFilter);
  }
}

  const addUserRssFilter = (rssFilter: RssFilter) => {
    api.post(`/rss_filter/2/${rssFilter.id}`, {rssFilter: rssFilter})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("Erreur lors de l'ajout du mot clé :" + error);
    });
  }

  useEffect(() => {
    api.get("/rss_filter/user/2")
    .then((response) => {
      const responseData = response.data;
      const fetchedCryptos = responseData.rssFilters ? responseData.rssFilters : [];  
      const userRssFilterData = fetchedCryptos.map((item: { RSS_filter: { id: number, name: string, url: string, createdAt: string, updatedAt: string } }) => item.RSS_filter);
      setUserRssFilter(userRssFilterData);
    })
    .catch((error) => {
      console.log(error);
    });
  } , []);

  const showAvailableRssFilters = () => {
    api.get("/rss_filter/")
    .then((response) => {
      setAvailableRssFilters(response.data.rssFilters);
      console.log(response.data.rssFilters);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleRemoveUserRssFilter = (rssFilter: RssFilter) => {
    const updatedRssFilters = userRssFilter.filter((r) => r?.name !== rssFilter.name);
    setUserRssFilter(updatedRssFilters);
    removeUserRssFilter(rssFilter);
  };

  const removeUserRssFilter = (rssFilter: RssFilter) => {
    api.delete(`/rss_filter/2/${rssFilter.id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      console.log(rssFilter.id);
    });
  }

  return (
    <Container className="containerUserRssManagement">
      <Typography variant="h3">Gestion des Flux Rss</Typography>
      <Typography variant="h3">Gestion des Flux Rss</Typography>
      <br />
      <Typography variant="h6">Mots clés disponibles :</Typography>
      <br />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Mots Clés</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value=""
          label="Mots clés"
          onChange={handleSelectChange}
          onOpen={showAvailableRssFilters}
          onOpen={showAvailableRssFilters}
        >
          <MenuItem value="" >
          <MenuItem value="" >
            Sélectionnez un mot clé
          </MenuItem>

          {availableRssFilters.length > 0 && availableRssFilters.map((rssFilter, index) => (
            <MenuItem key={index} value={rssFilter?.name}>
              {rssFilter?.name}

          {availableRssFilters.length > 0 && availableRssFilters.map((rssFilter, index) => (
            <MenuItem key={index} value={rssFilter?.name}>
              {rssFilter?.name}
            </MenuItem>
          ))}
          <MenuItem value={availableRssFilters[0]?.name}>
            {availableRssFilters[0]?.name}
          </MenuItem>
          <MenuItem value={availableRssFilters[0]?.name}>
            {availableRssFilters[0]?.name}
          </MenuItem>
        </Select>
      </FormControl>
      {userRssFilter.length > 0 ? (
        <>
          <Typography variant="h6">Mots clés sélectionnés :</Typography>
          {userRssFilter.map((rssFilter, index) => (
            <Button
              key={index}
              value={rssFilter.name}
              variant="contained"
              onClick={() => handleRemoveUserRssFilter(rssFilter as RssFilter)}
              sx={{ margin: 1 }}
            >
              {rssFilter?.name} &#10006;
            </Button>
          ))}
        </>
      ) : (
        <Typography variant="h6">Aucune crypto n'est sélectionnée</Typography>
      )}
      {userRssFilter.length > 0 ? (
        <>
          <Typography variant="h6">Mots clés sélectionnés :</Typography>
          {userRssFilter.map((rssFilter, index) => (
            <Button
              key={index}
              value={rssFilter.name}
              variant="contained"
              onClick={() => handleRemoveUserRssFilter(rssFilter as RssFilter)}
              sx={{ margin: 1 }}
            >
              {rssFilter?.name} &#10006;
            </Button>
          ))}
        </>
      ) : (
        <Typography variant="h6">Aucune crypto n'est sélectionnée</Typography>
      )}
    </Container>
  );
};

export default UserRssManagement;