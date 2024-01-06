import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Remplacez par l'URL de votre backend
  timeout: 5000, // Définissez un délai d'attente (en millisecondes) si nécessaire
  headers: {
    'Content-Type': 'application/json', // Exemple d'en-tête personnalisé
    'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyaWJjb2NvMkBnbWFpbC5jb20iLCJyb2xlIjoxLCJpYXQiOjE3MDI5OTg1OTIsImV4cCI6MTcwMzA4NDk5Mn0.Q7RPhljSk3FCuizgIBmJ83CgdzuurTHN1syb8kqYI5I", // En-tête d'autorisation (si nécessaire)
  },
});

export default api;