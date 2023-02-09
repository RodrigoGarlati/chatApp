import React, { useState, useEffect } from "react";
import { PropsToChat } from "@/types/chat";
import { Message } from "@/types/message";
import { apiUrl } from "@/utils/apiUrl";

export default function ShowMessages(props:PropsToChat){
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(()=>{
        fetch(`${apiUrl}/message/getmessages/${props.chatId}`)
        .then(data => data.json())
        .then(messages => setMessages(messages))
        
        console.log('mensajes: ',messages)
    },[props])

    return(
        <div>
            {messages.length? messages.map(message => (
                <div>
                    <p>{message.text}</p>
                </div>
            )) : null}
        </div>
    )
}