import React, { Fragment, useEffect } from "react"
import { apiUrl } from "@/utils/apiUrl"
import { useAuth } from "@/context/AuthContext"
import ChatCreator from "@/components/chats/ChatCreator"
import ChatsManager from "@/components/chats/ChatsManager"
import { connectSocket } from "@/socket/socket"

export default function Chats(){
    const {user, login, clearContext} = useAuth()

    useEffect(()=>{
        connectSocket
        const id: string | null = localStorage.getItem('id')
        if (!Object.keys(user).length){
            fetch(`${apiUrl}/user/getuser/${id}`)
            .then(response => response.json())
            .then(data => login(data))
        }
    },[])

    return(
        <div>
            {user.loggedUser? <h1 className="display-2 text-warning">Logged as  {user.loggedUser.userName}</h1> : null}
            <ChatCreator />
            <div className="bg-dark bg-opacity-50 rounded p-2 mt-2 chat-container">
                <ChatsManager/>
            </div>
        </div>
    )
}
