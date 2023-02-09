import { Chat } from "./chat";

export interface UserResponse{
    id: Number,
    userName: string,
    password: string,
    image: string,
    user_chats: Array<Chat>,
}