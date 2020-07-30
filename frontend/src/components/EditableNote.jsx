import React,{ useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from '@material-ui/core/Slide';
import EditIcon from '@material-ui/icons/Edit';
import ColorPicker from "./ColorPicker";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


function AlertDialog(props) {
  const [open, setOpen] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    props.onUpdate(name,value);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    setOpen(false);
    props.DBUpdate();
  };
  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div>
      <button className="editIcon" onClick={handleClickOpen}>
      <EditIcon/>
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className="Dialogue"
      >
        <ColorPicker onColorChange={props.onColorChange} DBUpdate={props.DBUpdate}/>
        <DialogTitle id="alert-dialog-slide-title">
          {props.note.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <textarea name="content" onChange={handleChange} defaultValue={props.note.content} placeholder="Take a note..." rows={"5"} cols={"50"} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AlertDialog;