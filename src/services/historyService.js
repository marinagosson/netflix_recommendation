export async function loadHistory() {
    console.log("carregando histórico de usuários...")
    const response = await fetch('./data/user_history.csv');

    if (!response.ok) {
        throw new Error('Não foi possível carregar o arquivo user_history.csv');
    }

    const csv = await response.text();

    const result = Papa.parse(csv, {
        header: true,
        skipEmptyLines: true
    });

    return result.data.map(item => ({
        userId: Number(item.User_ID),
        showId: item.Show_ID
    }));
}