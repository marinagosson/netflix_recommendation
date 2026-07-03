// processar os dados e construir a rede neural
export async function configureNeuralNetAndTrain(trainData) {
    console.log("configurando rede neural...")
    // informamos ao TensorFlow que a rede neural eh compostar por
    // varias camadas empilhadas
    const model = tf.sequential()

    // camada 1 - mais importante
    model.add( 
        tf.layers.dense({
            inputShape: [trainData.inputDimension],
            units: 128, // quantidade de neuronios
            activation: 'relu',
        })
    )

    // vamos comprimir o aprendizado da primeira camada
    model.add(
        tf.layers.dense({
            units: 64,
            activation: 'relu'
        })
    )

    // mais uma camada, e forcando a rede a manter o mais importante
    model.add(
        tf.layers.dense({
            units: 32,
            activation: 'relu'
        })
    )

    // camada de saida
    // retorna 1 unidade
    // retorna os valores entre 0 ate 1
    // 0.97 maior probabilidade de gostar do filme
    // 0.05 menor probabilidade de gostar do filme
    model.add(
        tf.layers.dense({ units: 1, activation: 'sigmoid' })
    )

    // informa pra rede como ela vai aprender
    model.compile({
        optimizer: tf.train.adam(0.01), // o algoritmo responsavel por atualizar o pesos da rede
        loss: 'binaryCrossentropy', // calssificador binario, gostou 1 nao gostou 0
        metrics: ['accuracy']
    })

    // inicia o treinamento
    await model.fit(trainData.xs, trainData.ys, {
        epochs: 20, // olhe para todos os modelos
        batchSize: 32,
        shuffle: true, // sempre vai misturar os exemplos para melhorar o aprendizado
    })
    
    return model

}