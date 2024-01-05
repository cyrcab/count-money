// InformationComponent.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface InformationComponentProps {
  selectedCrypto: {
    name: string;
    label: string;
    price?: string;
    iconUrl?: string;
  };
}

const InformationComponent: React.FC<InformationComponentProps> = ({selectedCrypto }) => {
  const [information, setInformation] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/" + selectedCrypto.name.toLowerCase())
      .then((response) => {
        setInformation(response.data.description.en);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedCrypto]);

  // Fonction pour rendre les liens dans la chaîne de texte
  const renderLinks = (html: string) => {
    return { __html: html };
  };

  return (
    <div style={{overflow:'auto', padding:10}}>
      {/* Utilisation de dangerouslySetInnerHTML pour afficher les liens */}
      <div dangerouslySetInnerHTML={renderLinks(information)} />
    </div>
  );
};

export default InformationComponent;
