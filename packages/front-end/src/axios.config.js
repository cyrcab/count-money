import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Remplacez par l'URL de votre backend
  timeout: 5000, // Définissez un délai d'attente (en millisecondes) si nécessaire
  headers: {
    'Content-Type': 'application/json', // Exemple d'en-tête personnalisé
    // 'Authorization': 'Bearer ' + localStorage.getItem('token'), // En-tête d'autorisation (si nécessaire)
  },
});

export default api;