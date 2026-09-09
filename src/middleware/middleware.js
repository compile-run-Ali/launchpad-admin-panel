import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../components/Login/Login'
import { UserContext } from '../context/userContext/UserContext'

export default function Middleware({ children }) {
    const [loggedIn, setLoggedIn] = useState(false)
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            const currentTime = new Date();
            const expiryTime = new Date(user["expiryTime"]);
            if (expiryTime > currentTime) {
                setLoggedIn(true);
                setUser(user);
            } else {
                localStorage.removeItem("user");
                setUser(null);
            }
        } else{
            navigate("/");
        }

    }, [])


    if (loggedIn) {
        return (
            <div className=" w-full">
                {children}
            </div>
        )
    } 

    return(
        
        <Login />
    )
}
