import React, { useState, Fragment, ChangeEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserResponse } from "@/types/apiResponses";
import { apiUrl } from "@/utils/apiUrl";
import ShowMessages from "../messages/ShowMessages";
import MessageSender from "../messages/MessageSender";

export default function ChatsManager(){
    const [selectedChatInfo, setSelectedChatInfo] = useState({
        selected: false,
        receiver: '',
        chatId: ''
    })
    const {user} = useAuth()
    console.log(user)

    async function hanldeDelete(id:Number){
        console.log(id)
        let delStatus: Response | Number = await fetch(`${apiUrl}/chat/deletechat`,{
            method: "DELETE",
            body: JSON.stringify({chatId: id}),
            headers: {'Content-Type': 'application/json'}
        })
        delStatus = await delStatus.json()
        delStatus == 1?alert('Chat deleted') : alert(`Couldn't delete chat`)
    }

    function hanldeSelectChat(receiver: string, chatId: string){
        setSelectedChatInfo({
            selected: true,
            receiver: receiver,
            chatId: chatId
        })
        console.log(selectedChatInfo)
    }

    return(
        <div>
            <div>
                {user.usersChatted && user.usersChatted.length? user.usersChatted.map((user:any) => {return (
                    <div key={`${user.id}`}>
                        <div onClick={() => hanldeSelectChat(user.id, user.userChats.chatId)}>
                            <img src={user.image} width={50}/>
                            <h3>
                                {user.userName}
                            </h3>
                        </div>
                        <button onClick={() => hanldeDelete(user.userChats.chatId)}>{`Borrar chat con ${user.userName}`}</button>
                    </div>
                )}) 
                : 
                <h1>No chats availables</h1>}
            </div>
            <div>
                {selectedChatInfo.selected? (
                    <div>
                        <ShowMessages
                            chatId = {selectedChatInfo.chatId}
                            receiver = {selectedChatInfo.receiver}
                        />
                        <MessageSender
                            chatId={selectedChatInfo.chatId}
                            receiver={selectedChatInfo.receiver}
                        />
                    </div>
                ):
                    <h1>Selecciona un chat</h1>
                }
            </div>
        </div>
    )
}