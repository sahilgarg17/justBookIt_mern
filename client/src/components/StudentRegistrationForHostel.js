import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ReserveSeatStepper from "./ReserveSeatStepper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StudentRegistrationForHostel({
  isRegFormOpen,
  hostelData,
  setisRegFormOpen,
}) {
  const handleClose = () => {
    setisRegFormOpen(false);
  };

  console.log(hostelData);
  return (
    <div>
      <Dialog
        open={isRegFormOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Reserve Your Seat"}</DialogTitle>
        <DialogContent>
          <ReserveSeatStepper
            hostelData={hostelData}
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
