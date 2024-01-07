import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Remplacez par l'URL de votre backend
  timeout: 5000, // Définissez un délai d'attente (en millisecondes) si nécessaire
  withCredentials: true, // Inclure les cookies par défaut pour les requêtes cross-origin
})

export default api
