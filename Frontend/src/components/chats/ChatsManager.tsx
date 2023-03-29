import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiUrl } from "@/utils/apiUrl";
import ShowMessages from "../messages/ShowMessages";
import MessageSender from "../messages/MessageSender";
import { connectSocket } from "@/socket/socket";
import { SelectChatState } from "@/types/chat";
import { DeleteChatResponse, UsersChatted } from "@/types/apiResponses";
import { getUserChats } from "@/utils/getChats";

export default function ChatsManager(){
    const initialSelectedValues = {
        selected: false,
        receiver: '',
        chatId: ''
    }

    const [selectedChatInfo, setSelectedChatInfo] = useState<SelectChatState>(initialSelectedValues)
    
    const {user, setChats} = useAuth()
    
    useEffect(()=>{
            const socketCb = async () => {
            const chats = await getUserChats(user.loggedUser.id)
            setChats(chats)
        }

        connectSocket.on('chat', socketCb)
        
        return () => {
            connectSocket.off('chat', socketCb)
        }
    },[user.usersChatted])

    async function hanldeDelete(id:Number){
        let delStatus : DeleteChatResponse | any = await fetch(`${apiUrl}/chat/deletechat`,{
            method: "DELETE",
            body: JSON.stringify({
                chatId: id
            }),
            headers: {'Content-Type': 'application/json'}
        })
        delStatus = await delStatus.json()
        delStatus == 1?alert('Chat deleted') : alert(`Couldn't delete chat`)
        setSelectedChatInfo(initialSelectedValues)
    }

    function hanldeSelectChat(receiver: string, chatId: string){
        setSelectedChatInfo({
            selected: true,
            receiver: receiver,
            chatId: chatId
        })
    }

    return(
        <div className="row p-3 h-100">
            <div className="col-4 p-3 h-100 overflow-auto">
                {user.usersChatted && user.usersChatted.length? user.usersChatted.map((user:any) => {return (
                    <div key={`${user.id}`} className={selectedChatInfo.chatId == user.userChats.chatId? 
                            'd-flex justify-content-between mb-3 bg-light bg-opacity-25 mb-2 p-2 rounded-pill cursor-pointer border border-info': 
                            'd-flex justify-content-between mb-3 bg-light bg-opacity-75 mb-2 p-2 rounded-pill cursor-pointer'}>
                        <div onClick={() => hanldeSelectChat(user.id, user.userChats.chatId)} className='d-flex '>
                            <img src={user.image} className='w-25 rounded-circle'/>
                            <h3 className="p-3 text-dark">
                                {user.userName}
                            </h3>
                        </div>
                        <button onClick={() => hanldeDelete(user.userChats.chatId)} className='btn btn-danger rounded-pill'>
                            Delete
                        </button>
                    </div>
                )}) 
                : 
                <h1 className="display-6 text-center text-light">No chats availables</h1>}
            </div>
            <div className="col-8 p-3 rounded">
                {selectedChatInfo.selected? (
                    <div className="bg-dark border border-dark">
                        <div className="messages-box">
                            <ShowMessages
                                chatId = {selectedChatInfo.chatId}
                                receiver = {selectedChatInfo.receiver}
                            />
                        </div>
                        <div className="align-baseline">
                            <MessageSender
                                chatId={selectedChatInfo.chatId}
                                receiver={selectedChatInfo.receiver}
                            />
                        </div>
                    </div>
                ):
                    <div className="h-100 d-flex align-items-center justify-content-center">
                        <h1 className="display-3 text-center text-light">No chat selected</h1>
                    </div>
                }
            </div>
        </div>
    )
}