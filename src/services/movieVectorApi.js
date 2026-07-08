import { API_URL } from "../config/api.js";

import { BATCH_SIZE } from "../config/api.js";

export async function searchMovieVectors(embedding, limit = 200) {

    const response = await fetch(API_URL + "/search", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embedding, limit 
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to search movie vectors');
    }

    return response.json();

}
export async function uploadMovieVectors(movieVectors, onProgress) {

    const batches = chunk(
        movieVectors,
        BATCH_SIZE
    )
  
    console.log(
        `Enviando ${batches.length} lotes...`
    );

    for (let i = 0; i < batches.length; i++) {
      const payload = batches[i].map((movieVector) => {
          return {
              id: movieVector.id,
              title: movieVector.title,
              embedding: Array.from(movieVector.vector),
          };
      });

      const response = await fetch(API_URL + "/batch", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to upload movie vectors');
      }

    }
  
  return {
    success: true,
    message: "Movie vectors uploaded successfully."
  }
}

function chunk(array, size) {

    const chunks = [];

    for (let i = 0; i < array.length; i += size) {

        chunks.push(
            array.slice(i, i + size)
        );

    }

    return chunks;

}

export async function getCountMovieVectors() {

    const response = await fetch(API_URL + "/count", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get movie vectors count');
    }

    return response.json();

}