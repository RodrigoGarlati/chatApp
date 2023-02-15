import React, { ChangeEvent, MouseEvent, Fragment } from "react"
import { useState } from "react"
import { apiUrl } from "@/utils/apiUrl"
import { ConfirmPassword, RegisterInfo } from "@/types/register"
import { RegisterResponse } from "@/types/apiResponses"

export default function Register(){
    const initialValues : RegisterInfo = {
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
                let registerStatus: RegisterResponse | any = await fetch(`${apiUrl}/user/register`, {
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
        <form className="p-2">
            <div className="bg-primary bg-opacity-75 mb-2 p-2 rounded">
                <label className="lead mt-1">
                    <strong>User</strong>
                </label>
                <input
                    className="form-control" 
                    name="userName" 
                    placeholder="User..." 
                    value={input.userName} 
                    onChange={e => handleChange(e)}
                />
            </div>
            <div className="bg-primary bg-opacity-75 mb-2 p-2 rounded">
                <label className="lead mt-1">
                    <strong>Password</strong>
                </label>
                <input
                    className="form-control" 
                    type='password' 
                    name="password" 
                    placeholder="Password..." 
                    value={input.password} 
                    onChange={e => handleChange(e)}
                />
            </div>
            <div className="bg-primary bg-opacity-75 mb-2 p-2 rounded">
                <label className="lead mt-1">
                    <strong>Confirm password</strong>
                </label>
                <input
                    className="form-control" 
                    name="confirmPassword" 
                    placeholder="Password..." 
                    value={confirmPassword.value} 
                    onChange={e => handleConfirmPass(e)}
                />
                {confirmPassword.alert? <p>Must enter the same password</p> : null}
            </div>
            <div className="bg-primary bg-opacity-75 mb-2 p-2 rounded">
                <label className="lead mt-1">
                    <strong>User image (any url)</strong>
                </label> 
                <input
                    className="form-control"  
                    name="image" 
                    placeholder="Image url..." 
                    value={input.image} 
                    onChange={e => handleChange(e)}
                />
            </div>
            <div className="d-flex justify-content-center">
                <button 
                    type="submit" 
                    onClick={e => handleRegister(e)}
                    className="btn btn-warning"
                    >
                        Register
                </button>
            </div>
        </form>
    )
}