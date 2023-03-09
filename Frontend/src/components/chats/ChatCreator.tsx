import React, { Fragment, useEffect, useState } from "react";
import { apiUrl } from "@/utils/apiUrl";
import Modal from 'react-modal';
import { useAuth } from "@/context/AuthContext";
import { CreateChatResponse, UserInfo } from "../../types/apiResponses";

export default function ChatCreator(){
    const [users, setUsers] = useState<UserInfo[]>([])
    const [modalIsOpen, setIsOpen] = useState<boolean>(false)
    console.log(users)

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
                style={{
                    content: {
                        width: '50%',
                        height: '80%',
                        margin: 'auto',
                        background: '#4682B4',
                        outline: 'solid black'
                    }
                }}
                isOpen= {modalIsOpen}
                onRequestClose= {closeModal}
            >
                <h1 className="text-center display-4">SELECT A USER TO CHAT WITH</h1>
                <div className="mt-5">
                    {users && users? users.map(user => (
                        <div key={`${user.id}`} className='col-10 d-flex justify-content-between mx-auto mb-3 bg-light bg-opacity-50 p-2 rounded-pill'>
                            <div  className='d-flex '>
                                <img src={user.image} alt='User image' className='w-25 rounded-circle'/>
                                <h1 className="p-3 text-dark align-self-center">{user.userName}</h1>
                            </div>
                            <button onClick={(e) => createChat(user.id)} className='p-4 w-25 btn btn-warning rounded-circle border border-dark'>CREATE</button>
                        </div>
                    )): null}
                </div>
            </Modal>
        </div>
    )
}