import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { apiUrl } from "@/utils/apiUrl"
import { useAuth } from "@/context/AuthContext"
import ChatCreator from "@/components/chats/ChatCreator"
import ChatsManager from "@/components/chats/ChatsManager"
import Logout from "@/components/logout/Logout"

export default function Chats(){
    const {user, login} = useAuth()
    const router = useRouter()

    useEffect(()=>{
        const id: string | null = localStorage.getItem('id')
        if(!id){
            router.push('/')
        }
        else if (!Object.keys(user).length){
            fetch(`${apiUrl}/user/getuser/${id}`)
            .then(response => response.json())
            .then(data => login(data))
        }
    },[])

    return(
        <div>
            {user.loggedUser? 
            <div>
                <h1 className="display-2 fw-normal text-light ">Logged as  {user.loggedUser.userName}</h1>
                <div className="d-flex mt-4 ">
                    <ChatCreator/>
                    <Logout/>
                </div>
                <div className="bg-dark bg-opacity-50 rounded p-2 mt-2 chat-container">
                    <ChatsManager/>
                </div>
            </div>:
            null}
        </div>
    )
}
