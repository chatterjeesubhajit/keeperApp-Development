import React, { useState,useContext} from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import './Notes.css';
import { MDBContainer} from "mdbreact";
import "./scrollbar.css";
import classNames from "classnames";
import {NotesContext} from "./NotesRepo";
import { useHistory } from "react-router-dom";

function Notes(props) {
  
  const history = useHistory();  
  axios.defaults.withCredentials = true;
  const {notes, setNotes} = useContext(NotesContext);
  console.log("notes");
  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }
  
  function handleZoom(title) {
    history.push(`/note`);
  }


  const scrollBarClass = classNames('scrollbar','my-5','mx-auto');

 

  const scrollContainerStyle = { position:"absolute",left:"5%", width: "90%", maxHeight: "500px" };
  return (
    <div>
      <CreateArea onAdd={addNote} />
      <MDBContainer>
      <div className={scrollBarClass} style={scrollContainerStyle}>
      {notes.map((noteItem) => (<Note key={noteItem.ind} noteItem={noteItem} handleZoom={handleZoom} />))}

      </div>
      </MDBContainer> 
    </div>
  );
}

export default Notes;
