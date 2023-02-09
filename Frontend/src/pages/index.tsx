import React, { ChangeEvent, useState } from "react"
import HomeLayout from "@/components/home/HomeLayout"
import Register from "@/components/home/Register"
import Login from "@/components/home/Login"

export default function Home(){
    const [login, setLogin] = useState(false)

    const handleButton = () => {
        login? setLogin(false) : setLogin(true)
    }
    
    return (
        <div>
            <HomeLayout/>
            {login? 
                <Login/> : 
                <Register/>
            }
            <div>
                {login? 
                    <h3>If you don't have an account</h3> : 
                    <h3>If you already have an account</h3>
                }
                <div>
                   {login? 
                        <button onClick={() => handleButton()}>REGISTER HERE</button> : 
                        <button onClick={() => handleButton()}>LOGIN HERE</button>
                   }
                </div>
            </div>
        </div>
    )
}