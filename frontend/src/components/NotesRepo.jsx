import React, {useState,createContext,useMemo,useEffect} from "react";

export const NotesContext=createContext();

export const NotesProvider = props => {
    const localState = JSON.parse(sessionStorage.getItem("notes"));

    const [notes, setNotes] = useState(localState || []);
    
    useEffect(() => {
        sessionStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const value=useMemo(()=>({notes, setNotes}));

    return (
        <NotesContext.Provider value={value}>
        {props.children}
        </NotesContext.Provider>
    );
};