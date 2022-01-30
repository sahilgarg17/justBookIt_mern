import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Remove({
  toggleRemDialog,
  settoggleRemDialog,
  rowData,
  remRegStudentData,
}) {
  const [open, setOpen] = React.useState(toggleRemDialog);

  const handleClose = () => {
    settoggleRemDialog(!toggleRemDialog);
  };

  const removeStudent = () => {
    remRegStudentData(rowData._id);
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={toggleRemDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Remove Student"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to remove it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={removeStudent}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
