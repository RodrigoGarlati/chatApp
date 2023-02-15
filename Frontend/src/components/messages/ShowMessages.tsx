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
        <div className="d-flex flex-column overflow-auto">
            {messages.length? messages.map(message => (
                <div className={message.transmitter == props.receiver? 'align-self-end' : 'align-self-start'}>
                    <p>{message.text}</p>
                </div>
            )) : null}
        </div>
    )
}