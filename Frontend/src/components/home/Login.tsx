import React, {useState, ChangeEvent, MouseEvent} from "react"
import { apiUrl } from "@/utils/apiUrl"
import { useRouter } from "next/router"
import { UserResponse } from "@/types/apiResponses" 

export default function Login(){
    const [input, setInput] = useState({
        userName: '',
        password: ''
    })

    const router = useRouter()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value 
        })
    }

    const hanldeLogin = async (event: MouseEvent) => {
        event.preventDefault();
        const {userName, password} = input
        if (userName && password){
            try {
                let loginStatus : UserResponse | any = await fetch(`${apiUrl}/user/login`, {
                    method: 'POST',
                    body: JSON.stringify(input),
                    headers: {'Content-Type': 'application/json'}
                })
                
                loginStatus = await loginStatus.json()
                if (loginStatus.hasOwnProperty('error')){
                    alert(loginStatus.error.message)
                }
                else {
                    localStorage.setItem('id', loginStatus.id)
                    router.push('/chats')
                }
            } catch (error) {
                console.log('error: ', error)
            }
        }
        else {
            alert('All fields must be filled')
        }
    }

    return(
        <form>
            <div>
                <label>User</label>
                <input 
                    placeholder="User..." 
                    name="userName" 
                    value={input.userName} 
                    onChange={(event) => handleInputChange(event)} >
                </input>
            </div>
            <div>
                <label>Password</label>
                <input 
                    placeholder="Password..." 
                    type='password' name="password" 
                    value={input.password} onChange={(event) => handleInputChange(event)} >
                </input>
            </div>
            <button type="submit" onClick={(event) => hanldeLogin(event)}>Login</button>
        </form>
    )
}