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

    function sendMessage(event:any){
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
            <form className="row">
                <input placeholder="Type a message.." onChange={e => handleMessage(e)} value={message} className='col-10 ms-4'/>
                <button onClick={e => sendMessage(e)} className='col-1 btn btn-success ms-3'>SEND</button>
            </form>
        </div>
    )
}