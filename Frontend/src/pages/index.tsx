import React from "react"
import { useState } from "react"
import { apiUrl } from "@/utils/apiUrl"

export default function Hola(){
    
    const [input, setInput] = useState<any>({
        userName: "",
        password: "",
        image: ""
    })

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value 
        })
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            let registerStatus:any = await fetch(`${apiUrl}/user`, {
                method: "POST",
                body: JSON.stringify(input),
                headers: {'Content-Type': 'application/json'}
            })
            registerStatus = await registerStatus.json()
            console.log(registerStatus)
        } catch (error:any) {
            console.log(error);            
        }
        
    }

    return (
        <div>
            <form>
                <div>
                    <label>User</label>
                    <input name="userName" placeholder="Usuario.." value={input.user} onChange={e => handleChange(e)}/>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" placeholder="Password.." value={input.password} onChange={e => handleChange(e)}/>
                </div>
                {/* <div>
                    <label>Confirm password</label>
                    <input name="confirmPassword" placeholder="Password.." value={input.confirmPassword} onChange={e => handleChange(e)}/>
                </div> */}
                <div>
                    <label>User image (any url)</label>
                    <input name="confirmPassword" placeholder="Image url.." value={input.image} onChange={e => handleChange(e)}/>
                </div>
                <button type="submit" onClick={e => handleRegister(e)}>Register</button>
            </form>
        </div>
    )
}