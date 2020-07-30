import React, { useState,useContext} from "react";
import classNames from "classnames";
import {NotesContext} from "./NotesRepo";
import Header from "./Header";

function Trial({match}){
    const {notes, setNotes} = useContext(NotesContext);
    const { params: { title } = {} } = match;
     console.log("notes",notes);

     let jTronClasses = classNames("jumbotron", "jumbotron-fluid");

    return (
        <div>
        <Header />
        { notes.filter(note=>note.title===title).map(noteItem=>(
            <div key={noteItem.ind} className="container" style={{background:noteItem.bgColor,color:noteItem.fontColor}}>
            <h1>{noteItem.title}</h1>
            <p>{noteItem.content}</p>
            </div>
        ))}
        </div>
      );
}
export default Trial;
