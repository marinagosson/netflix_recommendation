export function averageVector(vectors) {

    const dimension = vectors[0].length;

    const average = new Array(dimension).fill(0);

    for (const vector of vectors) {

        for (let i = 0; i < dimension; i++) {

            average[i] += vector[i];

        }

    }

    for (let i = 0; i < dimension; i++) {

        average[i] /= vectors.length;

    }

    return average;

}