import React, { useState, useEffect } from "react"
import { apiUrl } from "@/utils/apiUrl"
import { useAuth } from "@/context/AuthContext"
import ChatCreator from "@/components/chats/ChatCreator"
import ChatsManager from "@/components/chats/ChatsManager"

export default function Chats(){
    const [loading, setLoading] = useState(true)

    const {user, login, clearContext} = useAuth()

    useEffect(()=>{
        const id: string | null = localStorage.getItem('id')
        if (!Object.keys(user).length){
            fetch(`${apiUrl}/user/getuser/${id}`)
            .then(response => response.json())
            .then(data => login(data))
            setLoading(false)
        }
    },[])

    return(
        <div>
            {user.loggedUser? 
            <div>
                <h1 className="display-2 text-warning">Logged as  {user.loggedUser.userName}</h1>
                <ChatCreator />
                <div className="bg-dark bg-opacity-50 rounded p-2 mt-2 chat-container">
                    <ChatsManager/>
                </div>
            </div>:
            null}
        </div>
    )
}
