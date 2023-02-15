import { LoggedUser } from "@/types/apiResponses";
import { ScriptProps } from "next/script";
import {createContext, ProviderProps, ReactNode, useContext, useState } from "react";

const AuthContext = createContext<LoggedUser | any>({});

export function useAuth(){
    return useContext(AuthContext)
}

export const AuthProvider = ({children}:ScriptProps) => {
    const [user, setUser] = useState<LoggedUser | Object>({}) 
    const login = (data:LoggedUser) => {
        setUser(data)
    }
    const setChats = (data:Array<Object>) => {
        setUser({
            ...user,
            usersChatted: data
        })
    }
    const clearContext = () => {
        setUser({})
    } 
    const value = {
        user,
        login,
        setChats,
        clearContext
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>);
};
