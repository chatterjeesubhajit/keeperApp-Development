import React, { useState } from "react";
import axios from "axios";
import { Zoom } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import shortid from "shortid";
// import mongoose from "mongoose";

function CreateArea(props) {
  axios.defaults.withCredentials = true
  const [note, setNote] = useState({
    ind:"",
    title: "",
    content: "",
    bgColor:"#ffff",
    fontColor:"#000"
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    note.ind=shortid.generate();
    props.onAdd(note);
    setNote((prevNote)=>{
      console.log("note:",prevNote);      
    axios
      .post('/create', prevNote)
      .then(() => console.log('Data Shared'))
      .catch(err => {
        console.error(err);
      });

    return ({ind:"",    title: "",    content: "",    bgColor:"#ffff",  fontColor:"#000"});});
    event.preventDefault();
  }
  const [noteClick, setNoteClick] = useState(false);
  function onNoteClick() {
    setNoteClick(true);
  }
  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          hidden={!noteClick && true}
        />
        <textarea
          name="content"
          onChange={handleChange}
          onClick={onNoteClick}
          value={note.content}
          placeholder="Take a note..."
          rows={(!noteClick && true && "1") || "3"}
        />
        <Zoom in={noteClick && true}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
