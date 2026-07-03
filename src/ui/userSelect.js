export function getSelectedUser(context) {

    const id = Number(
        document.getElementById("usersSelect").value
    );

    return context.usersWithHistoryById.get(id);

}