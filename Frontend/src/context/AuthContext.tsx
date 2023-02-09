import { UserResponse } from "@/types/apiResponses";
import { ScriptProps } from "next/script";
import {createContext, ProviderProps, ReactNode, useContext, useState } from "react";

const AuthContext = createContext<UserResponse | any>({});

export function useAuth(){
    return useContext(AuthContext)
}

export const AuthProvider = ({children}:ScriptProps) => {
    const [user, setUser] = useState<UserResponse | Object>({}) 
    const login = (data:UserResponse) => {
        setUser(data)
    }
    const clearContext = () => {
        setUser({})
    } 
    const value = {
        user,
        login,
        clearContext
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>);
};
