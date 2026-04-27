async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        return response;
      }

      // Erreur serveur (5xx)
      if (response.status >= 500) {
        if (i === maxRetries) {
          throw new Error(`Erreur serveur: ${response.status}`);
        }
      } else {
        // Autres erreurs (4xx)
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

    } catch (error) {
      if (i === maxRetries) {
        throw error;
      }
    }

    // attendre 1 seconde
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}


