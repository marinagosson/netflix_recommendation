export async function loadUsers() {
    console.log("carregando usuários...")
    const response = await fetch('./data/netflix_users.csv');

    if (!response.ok) {
        throw new Error('Não foi possível carregar o arquivo CSV');
    }
    
    const csv = await response.text();

    const result = Papa.parse(csv, {
        header: true,
        skipEmptyLines: true
    });

    return result.data.map(user => ({
        id: Number(user.User_ID),
        name: user.Name,
        age: Number(user.Age),
        country: user.Country,
        subscription: user.Subscription_Type,
        watchTimeHours: Number(user.Watch_Time_Hours),
        favoriteGenre: user.Favorite_Genre,
        lastLogin: user.Last_Login
    }));
 }