import React, {useState, ChangeEvent, MouseEvent} from "react"
import { apiUrl } from "@/utils/apiUrl"
import { useRouter } from "next/router"
import { LoginInfo } from "@/types/login"

export default function Login(){
    const [input, setInput] = useState<LoginInfo>({
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

    const handleLogin = async (event: MouseEvent) => {
        event.preventDefault();
        const {userName, password} = input
        if (userName && password){
            try {
                let loginStatus : LoginInfo | any = await fetch(`${apiUrl}/user/login`, {
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
        <form className="p-2">
            <div className="bg-primary bg-opacity-75 mb-2 p-2 rounded">
                <label className="lead">
                    <strong>User</strong>
                </label>
                <input
                    className="form-control" 
                    name="userName" 
                    placeholder="User..." 
                    value={input.userName} 
                    onChange={e => handleInputChange(e)}
                />
            </div>
            <div className="bg-primary bg-opacity-75 mb-2 p-2 rounded">
                <label className="lead">
                    <strong>Password</strong>
                </label>
                <input
                    className="form-control" 
                    type='password' 
                    name="password" 
                    placeholder="Password..." 
                    value={input.password} 
                    onChange={e => handleInputChange(e)}
                />
            </div>
            <div className="d-flex justify-content-center">
                <button 
                    type="submit" 
                    onClick={e => handleLogin(e)}
                    className="btn btn-warning"
                    >
                        Login
                </button>
            </div>
        </form>
    )
}