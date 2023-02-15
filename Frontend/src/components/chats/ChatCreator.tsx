import React, { Fragment, useEffect, useState } from "react";
import { apiUrl } from "@/utils/apiUrl";
import Modal from 'react-modal';
import { useAuth } from "@/context/AuthContext";
import { CreateChatResponse, UserInfo } from "../../types/apiResponses";

export default function ChatCreator(){
    const [users, setUsers] = useState<UserInfo[]>([])
    const [modalIsOpen, setIsOpen] = useState<boolean>(false)

    const {user} = useAuth()

    useEffect(()=>{
        fetch(`${apiUrl}/chat/getallusers`)
        .then(res => res.json())
        .then(usersData => setUsers(usersData))
    },[])
    
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function createChat(id:Number) {
        let chatStatus : CreateChatResponse | any = await fetch(`${apiUrl}/chat/createchat`, {
            method: 'POST',
            body : JSON.stringify({
                loggedUserId: user.loggedUser.id,
                otherUserId: id
            }),
            headers: {'Content-Type': 'application/json'}
        })
        chatStatus = await chatStatus.json()
        console.log(chatStatus)
    }

    return(
        <div>
            <button className="mt-4 btn btn-warning rounded-pill" onClick={openModal}>Create new chat +</button>
            <Modal
                isOpen= {modalIsOpen}
                onRequestClose= {closeModal}
            >
                {users && users? users.map(user => (
                    <div key={`${user.id}`}>
                        <img src={user.image} alt='User image' />
                        <h1>{user.userName}</h1>
                        <button onClick={(e) => createChat(user.id)}>CREATE CHAT</button>
                    </div>
                )): null}
            </Modal>
        </div>
    )
}