import React, { useState, Fragment, ChangeEvent, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiUrl } from "@/utils/apiUrl";
import ShowMessages from "../messages/ShowMessages";
import MessageSender from "../messages/MessageSender";
import { connectSocket } from "@/socket/socket";

export default function ChatsManager(){
    const [selectedChatInfo, setSelectedChatInfo] = useState({
        selected: false,
        receiver: '',
        chatId: ''
    })
    const {user, setChats} = useAuth()
    
    useEffect(()=>{
        const socketCb = () => {
            getUserChats()
        }

        connectSocket.on('chat', socketCb)
        
        return () => {
            connectSocket.off('chat', socketCb)
        }
    },[user])

    async function getUserChats(){
        let usersChatted:any = await fetch(`${apiUrl}/chat/getuserchats/${user.loggedUser.id}`)
        usersChatted = await usersChatted.json()
        setChats(usersChatted)
    }

    async function hanldeDelete(id:Number){
        console.log(id)
        let delStatus: Response | Number = await fetch(`${apiUrl}/chat/deletechat`,{
            method: "DELETE",
            body: JSON.stringify({
                chatId: id
            }),
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
    }

    return(
        <div className="container-xxl row p-3">
            <div className="col-4 mt-5 p-3">
                {user.usersChatted && user.usersChatted.length? user.usersChatted.map((user:any) => {return (
                    <div key={`${user.id}`} className='d-flex justify-content-between mb-3 h-25 bg-secondary text-white'>
                        <div onClick={() => hanldeSelectChat(user.id, user.userChats.chatId)} className='d-flex '>
                            <img src={user.image} className='w-25'/>
                            <h3 className="p-3">
                                {user.userName}
                            </h3>
                        </div>
                        <button onClick={() => hanldeDelete(user.userChats.chatId)} className='btn btn-danger'>{`Delete chat`}</button>
                    </div>
                )}) 
                : 
                <h1>No chats availables</h1>}
            </div>
            <div className="col-8 p-3 border rounded h-25 d-inline-block overflow-auto">
                {selectedChatInfo.selected? (
                    <div className="d-flex flex-column justify-content-between">
                        <div>
                            <ShowMessages
                                chatId = {selectedChatInfo.chatId}
                                receiver = {selectedChatInfo.receiver}
                            />
                        </div>
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