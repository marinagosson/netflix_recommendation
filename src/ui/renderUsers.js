export function renderUsers(
    users
) { 
    console.log("renderizando usuários...")
    const select = document.getElementById("usersSelect")

    select.innerHTML = "" 

    users.forEach(user => {
        const option = document.createElement("option")

        option.value = user.id
        option.textContent = `${user.name} (#${user.id})`;

        select.appendChild(option)
    });

    select.selectedIndex = 0;
}