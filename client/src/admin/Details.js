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

export default function Details({ toggleDialog, settoggleDialog, rowData }) {
  const [open, setOpen] = React.useState(toggleDialog);

  const handleClose = () => {
    settoggleDialog(!toggleDialog);
  };

  console.log(rowData);
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={toggleDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Student Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <strong>Full Name:</strong>{" "}
            {rowData.firstName + " " + rowData.lastName} <br />
            <strong>Father Name:</strong> {rowData.fatherName} <br />
            <strong>CNIC :</strong> {rowData.cnic} <br />
            <strong> DOB :</strong> {rowData.dob} <br />
            <strong>Work Place:</strong> {rowData.workPlace} <br />
            <strong>Phone:</strong> {rowData.phone} <br />
            <strong>Hostel Owner Id : </strong> {rowData.hostelOwner} <br />
            <strong>Hostel Id : </strong> {rowData.hostelId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
