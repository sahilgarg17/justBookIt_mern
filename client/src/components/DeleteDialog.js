import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
export default function AlertDialog({
  setdialogRes,
  openDialog,
  setopenDialog,
  item,
  deleteHostel,
}) {
  const handleClose = () => {
    setopenDialog(false);

    deleteHostel(item._id);

    toast.success("Success! Hostel is deleted Successfully.", {
      autoClose: 20000,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const cancel = () => {
    setopenDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={cancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Remove Hostel"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, you want to remove it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>No</Button>
          <Button onClick={handleClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
