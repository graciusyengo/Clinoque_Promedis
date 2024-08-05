// Importer le client Sanity
 import sanityClient from 'https://cdn.skypack.dev/@sanity/client';

// Configurer le client avec vos détails Sanity
const client = sanityClient({
  projectId: 'cp2c2py0', // ID de votre projet Sanity
  dataset: 'production',      // Nom de votre dataset
  useCdn: true,                  // Utilisez le CDN pour des performances rapides
})

export default client;

// Exemple d'utilisation pour obtenir des données
