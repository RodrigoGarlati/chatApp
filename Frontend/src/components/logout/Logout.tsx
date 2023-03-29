import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function Logout(){

    const {clearContext} = useAuth()

    const router = useRouter()

    function logout(){
        clearContext()
        localStorage.clear()
        router.push('/')
    }

    return (
        <div>
            <button className="mt-4 ms-3 btn btn-warning" onClick={e => logout()}>
                Logout - 
            </button>
        </div>
    )
}