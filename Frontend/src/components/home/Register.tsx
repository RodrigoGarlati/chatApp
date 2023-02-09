import React, { ChangeEvent, MouseEvent, Fragment } from "react"
import { useState } from "react"
import { apiUrl } from "@/utils/apiUrl"
import { ConfirmPassword, RegisterInfo } from "@/types/register"
import { UserResponse } from "@/types/apiResponses"

export default function Register(){
    const initialValues = {
        userName: '',
        password: '',
        image: ''
    }
    
    const [input, setInput] = useState<RegisterInfo>(initialValues)

    const [confirmPassword, setConfirmPassword] = useState<ConfirmPassword>({
        alert: false,
        value: ''
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value 
        })
        if (event.target.name == 'password' && confirmPassword.value){
            if (event.target.value == confirmPassword.value){
                setConfirmPassword({
                    ...confirmPassword,
                    alert: false
                })
            }
            else {
                setConfirmPassword({
                    ...confirmPassword,
                    alert: true
                })
            }
        }
    }

    const handleConfirmPass = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== input.password){
            setConfirmPassword({
                alert: true,
                value: event.target.value
            })
        }
        else{
            setConfirmPassword({
                alert: false,
                value: event.target.value
            })
        }
    }

    const handleRegister = async (event:MouseEvent) => {
        event.preventDefault();
        const {userName, password} = input
        if (userName && password  && confirmPassword.value && !confirmPassword.alert){
            try {
                let registerStatus: UserResponse | any = await fetch(`${apiUrl}/user/register`, {
                    method: "POST",
                    body: JSON.stringify(input),
                    headers: {'Content-Type': 'application/json'}
                })
                registerStatus = await registerStatus.json()

                if (registerStatus.hasOwnProperty('error')){
                    alert(registerStatus.error.message)
                }
                else {
                    alert('User logged succesfully!')
                    setInput(initialValues)
                }
            } catch (error:any) {
                console.log('error:  ', error);
            }
        }
        else{
            alert('All fields must be filled')
        }
    }

    return(
        <form>
            <div>
                <label>User</label>
                <input 
                    name="userName" 
                    placeholder="User..." 
                    value={input.userName} onChange={e => handleChange(e)}
                />
            </div>
            <div>
                <label>Password</label>
                <input 
                    type='password' 
                    name="password" 
                    placeholder="Password..." 
                    value={input.password} onChange={e => handleChange(e)}
                />
            </div>
            <div>
                <label>Confirm password</label>
                <input 
                    name="confirmPassword" 
                    placeholder="Password..." 
                    value={confirmPassword.value} onChange={e => handleConfirmPass(e)}
                />
                {confirmPassword.alert? <p>Must enter the same password</p> : null}
            </div>
            <div>
                <label>User image (any url)</label>
                <input 
                    name="image" 
                    placeholder="Image url..." 
                    value={input.image} 
                    onChange={e => handleChange(e)}
                />
            </div>
            <button type="submit" onClick={e => handleRegister(e)}>Register</button>
        </form>
    )
}