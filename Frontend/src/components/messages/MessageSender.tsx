import { useAuth } from "@/context/AuthContext";
import { PropsToChat } from "@/types/chat";
import { apiUrl } from "@/utils/apiUrl";
import React, {useState, ChangeEvent} from "react"

export default function MessageSender(props: PropsToChat){
    const [message, setMessage] = useState('')
    const { user } = useAuth()

    function handleMessage(event: ChangeEvent<HTMLInputElement>){
        setMessage(event.target.value)
    }

    async function sendMessage(event:any){
        event.preventDefault();
        let messageStatus = await fetch(`${apiUrl}/message/sendmessage`, {
            method: 'POST',
            body: JSON.stringify({
                text: message,
                transmitter: user.loggedUser.id,
                receiver: props.receiver,
                chatId: props.chatId
            }),
            headers: {'Content-Type': 'application/json'}
        })
        messageStatus = await messageStatus.json()
    }

    return(
        <div>
            <input placeholder="Type a message.." onChange={e => handleMessage(e)}/>
            <button onClick={e => sendMessage(e)}>SEND</button>
        </div>
    )
}