import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import './Notes.css';
// import Container from 'react-bootstrap/Container';
import { MDBContainer} from "mdbreact";
import "./scrollbar.css";
import classNames from "classnames";



function Notes(props) {
  axios.defaults.withCredentials = true;
  const [notes, setNotes] = useState(props.notes);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }
  

  function deleteNote(id,ind) {
    console.log("note to be deleted: "+ind);

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem.ind !== ind;
      });
    });
  }

  function UpdateNote(note)
  {
    console.log(note);
    setNotes(notes.map((o) => {
      if (o.ind === note.ind) return {...note}
      return o;
    }));
    axios
    .patch('/update',note)
    .then(() => console.log('Data to be updated is shared'))
    .catch(err => {
      console.error(err);
    });

};

  const scrollBarClass = classNames('scrollbar','my-5','mx-auto');

 

  const scrollContainerStyle = { position:"absolute",left:"5%", width: "90%", maxHeight: "500px" };
  return (
    <div>
      <CreateArea onAdd={addNote} />
      <MDBContainer>
      <div className={scrollBarClass} style={scrollContainerStyle}>
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.ind}
            ind={noteItem.ind}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onUpdate={UpdateNote}
            bgColor={noteItem.bgColor}
            fontColor={noteItem.fontColor}
          />

        );
      })}
      </div>

      </MDBContainer> 
    </div>
  );
}

export default Notes;
