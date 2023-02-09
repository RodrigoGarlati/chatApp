import React, { Fragment, useEffect, useState } from "react";
import { apiUrl } from "@/utils/apiUrl";
import Modal from 'react-modal';
import { UserResponse } from "@/types/apiResponses";
import { useAuth } from "@/context/AuthContext";

export default function ChatCreator(){
    const [users, setUsers] = useState<UserResponse[]>([])
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
        let chatStatus = await fetch(`${apiUrl}/chat/createchat`, {
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
        <Fragment>
            <button onClick={openModal}>+</button>
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

        </Fragment>
    )
}