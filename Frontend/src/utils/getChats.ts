import { apiUrl } from "./apiUrl";
import { UsersChatted } from "@/types/apiResponses";

export async function getUserChats(id : Number){
    let usersChatted: UsersChatted | any = await fetch(`${apiUrl}/chat/getuserchats/${id}`)
    usersChatted = await usersChatted.json()
    return usersChatted
}