import { createClient } from 'redis';

export const redisClient = createClient({
    url: 'redis://localhost:6379' // Remplacez par l'URL de votre serveur Redis
});

redisClient.on('error', (err) => console.log('Erreur Redis :', err));