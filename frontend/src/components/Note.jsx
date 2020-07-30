import React, { useState, useMemo, useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import axios from "axios";
import { Zoom } from "@material-ui/core";
import AlertDialog from "./EditableNote";
import { useHistory } from "react-router-dom";
import { NotesContext } from "./NotesRepo";
import { LoginContext } from "./LoginContext";
import classNames from "classnames";
import { Dropdown } from "react-bootstrap";
import MenuIcon from '@material-ui/icons/Menu';

function Note(props) {
  const { notes, setNotes } = useContext(NotesContext);
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  let history = useHistory();
  const [note, setNote] = useState(props.noteItem);

  const [noteChng, setNoteChng] = useState(false);

  const noteBackground = useMemo(() => {
    return {
      background: note.bgColor,
      color: note.fontColor,
    };
  }, [note]);

  function onNoteChange(name, val) {
    if (note[name] !== val) {
      setNote((prevNote) => ({ ...prevNote, [name]: val }));
      setNoteChng(true);
    }
  }

  function UpdateBackEndDB() {
    if (noteChng) {
      setNotes(
        notes.map((o) => {
          if (o.ind === note.ind) return { ...note };
          return o;
        })
      );
      axios
        .patch("/update", note)
        .then(() => console.log("Data to be updated is shared"))
        .catch((err) => {
          console.error(err);
        });
      setNoteChng(false);
    }
  }
  function handleDelete() {
    axios
      .delete("/delete", { data: { index: note.ind } })
      .then(() => console.log("Data to be deleted is shared"))
      .catch((err) => {
        console.error(err);
      });
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem.ind !== note.ind;
      });
    });
  }

  function handleZoom() {
    history.push(`/notes/${note.title}`);
  }
  const homeRoute = "/home/" + loggedIn.username;

  return (
    <Zoom in={true}>
      <div style={noteBackground} className="note">
        <div className="container">
          <div className="row">
            <div className="col-sm-10" style={{marginLeft:"-1rem"}}>
              <h1>{note.title}</h1>
            </div>
            <div className="col-sm-2" style={{top:"-0.5rem",right:"-1.5rem"}}>
              <Dropdown drop="left">
                <Dropdown.Toggle bsPrefix="custom-toggle" variant="success" id="dropdown-basic" size="sm">
                  <MenuIcon style={{color:note.fontColor}}/>
                </Dropdown.Toggle>
                <Dropdown.Menu  style={{background:"rgba(22, 49, 54, 0.5)"}}>
                  <Dropdown.Item style={{background:"transparent"}}><button className="zoomIcon" onClick={handleZoom}><ZoomOutMapIcon /></button>
                  <button  className="deleteIcon" onClick={handleDelete}><DeleteIcon /></button>
                  <AlertDialog onUpdate={onNoteChange} note={note} onColorChange={onNoteChange} DBUpdate={UpdateBackEndDB} /> </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>                            
            </div>
          </div>
          <div className="row">
            <p>{note.content}</p>
          </div>
        </div>
      </div>
    </Zoom>
  );
}

export default Note;
