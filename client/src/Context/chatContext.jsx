import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const chatContext= createContext();

const ChatProvider= ({children})=>{
    const [user, setUser]= useState()
    const navigate= useNavigate();

    useEffect(()=>{
        const userDetails= JSON.parse(sessionStorage.getItem("user"));
        setUser(userDetails);

        if(!userDetails){
            navigate('/')
        }
    },[navigate])

    return (
        <chatContext.Provider value={{user, setUser}}>{children}</chatContext.Provider>
    )
};

export const ChatContextState=()=>{
    return useContext(chatContext)
}

export default ChatProvider;