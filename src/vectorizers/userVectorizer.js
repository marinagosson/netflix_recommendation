import { encodeUser } from "../encoders/userEncoder.js";

export function buildUsersVector(context) { 
    console.log("codificando usuários...")
    context.userVectors = context.usersWithHistory
        .map(user => {
            return {
                id: user.id,
                meta: { ...user},
                vector: encodeUser(user, context).dataSync(),
            }
    })
    
    context.userVectorsById = new Map(
        context.userVectors.map(user => [
            user.id,
            user
        ])
    )
}