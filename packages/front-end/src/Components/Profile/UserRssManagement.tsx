// UserRssManagement.tsx
import React, { useState } from "react";
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


const UserRssManagement: React.FC = () => {
  const [availableKeywords] = useState<string[]>(["Bitcoin", "Ethereum", "Altcoin"]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const selectedKeyword = event.target.value as string;

    if (selectedKeyword && !selectedKeywords.includes(selectedKeyword)) {
      setSelectedKeywords([...selectedKeywords, selectedKeyword]);
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    const updatedKeywords = selectedKeywords.filter((kw) => kw !== keyword);
    setSelectedKeywords(updatedKeywords);
  };

  return (
    <Container className="containerUserRssManagement">
      <Typography variant="h2">Gestion des Flux Rss</Typography>
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
        >
          <MenuItem value="" disabled>
            Sélectionnez un mot clé
          </MenuItem>
          {availableKeywords.map((keyword) => (
            <MenuItem key={keyword} value={keyword}>
              {keyword}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h6">Mots clés sélectionnés :</Typography>
      {selectedKeywords.map((keyword) => (
        <Button
          key={keyword}
          variant="contained"
          onClick={() => handleRemoveKeyword(keyword)}
          sx={{ margin: 1 }}
        >
          {keyword} &#10006;
        </Button>
      ))}
    </Container>
  );
};

export default UserRssManagement;