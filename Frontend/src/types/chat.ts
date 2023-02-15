export interface SelectChatState{
    selected: boolean,
    receiver: string,
    chatId: string
}

export interface PropsToChat{
    receiver: string,
    chatId: string
}