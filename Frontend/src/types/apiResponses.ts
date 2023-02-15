export type RegisterResponse = string

export type LoginResponse = Number

export interface UserInfo{
    id: Number,
    image: string,
    userName: string
}

export type UsersChatted = Array<UserInfo>

export interface LoggedUser extends UserInfo{
    loggedUser: UserInfo,
    usersChatted: UserInfo[]
}

export type CreateChatResponse = string

export interface ChatsResponse{
    usersChatted: UsersChatted
}

export type DeleteChatResponse = string