import React, { useState, useEffect } from "react";
import { PropsToChat } from "@/types/chat";
import { Message } from "@/types/message";
import { apiUrl } from "@/utils/apiUrl";
import { connectSocket } from "@/socket/socket";


export default function ShowMessages(props:PropsToChat){
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(()=>{
        getMessages()
        const socketCb = () => {
            getMessages()
        }

        connectSocket.on('message', socketCb)

        return () => {
            connectSocket.off('message', socketCb)
        }
    },[props])

    function getMessages(){
        fetch(`${apiUrl}/message/getmessages/${props.chatId}`)
        .then(data => data.json())
        .then(messages => setMessages(messages))
    }

    return(
        <div className="d-flex flex-column bg-dark p-2 h-100 overflow-auto">
            {messages.length? messages.map(message => (
                <div className={message.transmitter == props.receiver? 'align-self-start bg-primary rounded ps-2 pe-2 mt-1' : 
                                                                        'align-self-end bg-light rounded ps-2 pe-2 mt-1'}>
                    <p>{message.text}</p>
                </div>
            )) : null}
        </div>
    )
}