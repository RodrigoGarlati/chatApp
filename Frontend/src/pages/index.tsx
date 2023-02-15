import React, { ChangeEvent, useState } from "react"
import HomeLayout from "@/components/home/HomeLayout"
import Register from "@/components/home/Register"
import Login from "@/components/home/Login"

export default function Home(){
    const [login, setLogin] = useState<boolean>(false)

    const handleButton = () => {
        login? setLogin(false) : setLogin(true)
    }
    
    return (
        <div className="h-100 d-flex mt-5 p-4">
            <div>
                <HomeLayout/>
            </div>
            <div className="w-75 p-5">
                <div className="bg-dark bg-opacity-50 rounded p-3 border border-warning">
                    {login? 
                        <Login/> : 
                        <Register/>
                    }
                    <div className="d-flex flex-column align-items-center">
                        <p className="text-warning p-2 mt-2">
                            {login? "If you don't have an account" : "If you already have an account"}
                        </p>
                        <div>
                            <a
                                className="text-warning cursor-pointer"
                                onClick={() => handleButton()}>{login? "Register here" : "Login here" }
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}