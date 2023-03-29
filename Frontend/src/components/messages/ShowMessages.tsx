import React, { useState, useEffect, useRef } from "react";
import { PropsToChat } from "@/types/chat";
import { Message } from "@/types/message";
import { apiUrl } from "@/utils/apiUrl";
import { connectSocket } from "@/socket/socket";


export default function ShowMessages(props:PropsToChat){
    const [messages, setMessages] = useState<Message[]>([])

    const position = useRef<any>()

    useEffect(()=>{
        getMessages()
        const socketCb = () => {
            getMessages()
        }

        connectSocket.on('message', socketCb)

        console.log(messages)

        return () => {
            connectSocket.off('message', socketCb)
        }
    },[props])

    useEffect(()=>{
        position.current.scrollTop = '9999'
    },[messages])

    function getMessages(){
        fetch(`${apiUrl}/message/getmessages/${props.chatId}`)
        .then(data => data.json())
        .then(messages => setMessages(messages))
    }

    return(
        <div className="d-flex flex-column bg-dark p-2 h-100 overflow-auto" ref={position}>
            {messages.length? messages.map(message => (
                <div className={message.transmitter == props.receiver? 'align-self-start bg-primary ps-2 pe-2 mt-1 max-w msg-received-border' : 
                                                                        'align-self-end bg-light ps-2 pe-2 mt-1 max-w msg-sent-border'}>
                    <p className="mb-1 p-1">{message.text}</p>
                </div>
            )) : null}
        </div>
    )
}