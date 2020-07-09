import React,{useState,useMemo} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { Zoom } from "@material-ui/core";
// import EditIcon from '@material-ui/icons/Edit';
import AlertDialog from "./EditableNote";

function Note(props) {
  function handleClick() {
    let tbd=props.ind;
    axios
    .delete('/delete',{data:{ index: tbd}})
    .then(() => console.log('Data to be deleted is shared'))
    .catch(err => {
      console.error(err);
    });

    props.onDelete(props.id,props.ind);
  }

  const [note,setNote]= useState({
    ind:props.ind,
    title: props.title,
    content: props.content,
    bgColor:props.bgColor,
    fontColor:props.fontColor
  });

  const [noteChng,setNoteChng] = useState(false);

  
  const noteBackground=useMemo(()=> {
    return{
    background:note.bgColor,
    color:note.fontColor}
  },[note]);

  function onNoteChange(name,val)
  {
    if(note[name] !== val){
    setNote(prevNote=>({...prevNote,[name]:val}));
    setNoteChng(true);
    }
  }
  
  function UpdateBackEndDB()
  { if(noteChng){
    console.log("updating"); 
    props.onUpdate(note);
    setNoteChng(false);
  }
  }

  return (
    <Zoom in={true}>
    <div style={noteBackground} className="note">
    <AlertDialog title={props.title} content={props.content} onUpdate={onNoteChange} ind={props.ind} bgColor={note.bgColor}
            fontColor={note.fontColor} onColorChange={onNoteChange} DBUpdate={UpdateBackEndDB}/>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button className="deleteIcon" onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
    </Zoom>
  );
}

export default Note;
