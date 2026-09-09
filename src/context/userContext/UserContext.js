import React, { createContext, useReducer } from "react";
import UserReducer from "./Reducer";

const initialState = {
    user: null,
    setUser: () => { },
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);


    const setUser = (user) => {
        dispatch({
            type: "SET_USER",
            payload: user,
        });
    };

    return (
        <UserContext.Provider value={{ user: state.user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}