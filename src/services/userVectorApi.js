import { API_URL } from "../config/api.js";

import { BATCH_SIZE } from "../config/api.js";

export async function uploadUserVectors(userVectors, onProgress) {
    
    const batches = chunk(
        userVectors,
        BATCH_SIZE
    )
  
    console.log(
        `Enviando ${batches.length} lotes...`
    );

    for (let i = 0; i < batches.length; i++) {
      const payload = batches[i].map((userVector) => {
          return {
              id: userVector.id,
              name: userVector.meta.name,
              embedding: Array.from(userVector.vector),
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
        throw new Error('Failed to upload user vectors');
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

export async function getCountUserVectors() {

    const response = await fetch(API_URL + "/count", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user vectors count');
    }

    return response.json();

}