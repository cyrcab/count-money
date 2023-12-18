import { useEffect, useState } from "react";
import "../../Css/RssManagement.css";
import api from "../../axios.config";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface RssFilter {
  id: number;
  name: string;
}

const initialFilter: RssFilter = {
  id: 0,
  name: "",
};

const RssManagement: React.FC = () => {
  const [rssFilters, setRssFilters] = useState<RssFilter[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<RssFilter>(initialFilter);

  useEffect(() => {
    api.get("/rss_filter/")
      .then((response) => {
        setRssFilters(response.data.body.rss_filter || []);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      });
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const selectedId = event.target.value as number;
    const selected = rssFilters.find((filter) => filter.id === selectedId);
    setSelectedFilter(selected || initialFilter);
  };

  return (
    <Container className="containerUserRssManagement">
      <Typography variant="h2">Gestion des Flux Rss</Typography>
      <br />
      <Typography variant="h6">Flux Rss disponibles :</Typography>
      <br />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Flux Rss</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedFilter.id || ""}
          label="Flux Rss"
          onChange={handleSelectChange}
        >
          <MenuItem value="" disabled>
            Sélectionnez un Flux Rss
          </MenuItem>
          {rssFilters.map((rssFilter) => (
            <MenuItem key={rssFilter.id} value={rssFilter.id}>
              {rssFilter.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h6">Flux Rss sélectionné :</Typography>
      {selectedFilter.id !== 0 && (
        <Button
          variant="contained"
          onClick={() => setSelectedFilter(initialFilter)}
          sx={{ margin: 1 }}
        >
          {selectedFilter.name} &#10006;
        </Button>
      )}
    </Container>
  );
};

export default RssManagement;
