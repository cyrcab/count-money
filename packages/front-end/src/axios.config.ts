import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Remplacez par l'URL de votre backend
  timeout: 5000, // Définissez un délai d'attente (en millisecondes) si nécessaire
  headers: {
    'Content-Type': 'application/json', // Exemple d'en-tête personnalisé
    'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyaWJjb2NvMkBnbWFpbC5jb20iLCJyb2xlIjoxLCJpYXQiOjE3MDI5MTE5NTAsImV4cCI6MTcwMjk5ODM1MH0.ViCYcAd-lTzGf7nLawdRECuu2r3IsLqw38IyCkoe6yY", // En-tête d'autorisation (si nécessaire)
  },
});

export default api;