import React, { Fragment, useEffect } from "react"
import { apiUrl } from "@/utils/apiUrl"
import { useAuth } from "@/context/AuthContext"
import ChatCreator from "@/components/chats/ChatCreator"
import ChatsManager from "@/components/chats/ChatsManager"

export default function Chats(){
    const {user, login, clearContext} = useAuth()

    useEffect(()=>{
        const id: string | null = localStorage.getItem('id')
        if (!Object.keys(user).length){
            fetch(`${apiUrl}/user/getuser/${id}`)
            .then(response => response.json())
            .then(data => login(data))
        }
    },[])

    return(
        <Fragment>
            {user.loggedUser? <h1 className="display-2">Logged as: {user.loggedUser.userName}</h1> : null}
            <ChatCreator />
            <ChatsManager/>
        </Fragment>
    )
}
