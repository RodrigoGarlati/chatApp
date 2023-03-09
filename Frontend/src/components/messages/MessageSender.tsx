import { useAuth } from "@/context/AuthContext";
import { PropsToChat } from "@/types/chat";
import { apiUrl } from "@/utils/apiUrl";
import React, {useState, ChangeEvent, MouseEvent} from "react"

export default function MessageSender(props: PropsToChat){
    const [message, setMessage] = useState<string>('')
    const { user } = useAuth()

    function handleMessage(event: ChangeEvent<HTMLInputElement>){
        setMessage(event.target.value)
    }

    function sendMessage(event:MouseEvent){
        event.preventDefault()
        fetch(`${apiUrl}/message/sendmessage`, {
            method: 'POST',
            body: JSON.stringify({
                text: message,
                transmitter: user.loggedUser.id,
                receiver: props.receiver,
                chatId: props.chatId
            }),
            headers: {'Content-Type': 'application/json'}
        })
        
        setMessage('')
    }

    return(
        <div>
            <form className="d-flex">
                <input placeholder="Type a message.." onChange={e => handleMessage(e)} value={message} className='col-11 bg-secondary bg-opacity-75'/>
                <button onClick={e => sendMessage(e)} className='btn btn-warning col-1 rounded-0'>SEND</button>
            </form>
        </div>
    )
}