import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditDialogBox({
  handleEditBox,
  sethandleEditBox,
  item,
  updateHostel,
}) {
  const handleClose = () => {
    sethandleEditBox(false);
  };

  const {
    hostelAddress,
    hostelCity,
    hostelName,
    hostelNoOfRooms,
    hostelPhone,
  } = item;

  const updateHostelDetailsInitial = {
    hostelName: hostelName,
    hostelAddress: hostelAddress,
    hostelCity: hostelCity,
    hostelPhone: hostelPhone,
    hostelNoOfRooms: hostelNoOfRooms,
  };

  const [updateHostelDetails, setupdateHostelDetails] = useState(
    updateHostelDetailsInitial
  );

  let name;
  let value;
  // eslint-disable-next-line
  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;

    setupdateHostelDetails({
      ...updateHostelDetails,
      [name]: event.target.value,
    });
  };

  const handleUpdateHostel = (id) => {
    updateHostel(
      id,
      updateHostelDetails.hostelName,
      updateHostelDetails.hostelAddress,
      updateHostelDetails.hostelCity,
      updateHostelDetails.hostelPhone,
      updateHostelDetails.hostelNoOfRooms
    );
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={handleEditBox}
        keepMounted
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Hostel"}</DialogTitle>
        <DialogContent>
          <TextField
            id="standard-basic"
            sx={{ minWidth: "30rem", margin: "1rem" }}
            label="Hostel Name"
            value={updateHostelDetails.hostelName}
            name="hostelName"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            id="standard-basic"
            sx={{ minWidth: "30rem", margin: "1rem" }}
            value={updateHostelDetails.hostelAddress}
            name="hostelAddress"
            onChange={handleChange}
            label="Hostel Address"
            variant="outlined"
          />
          <TextField
            id="standard-basic"
            sx={{ minWidth: "30rem", margin: "1rem" }}
            value={updateHostelDetails.hostelCity}
            name="hostelCity"
            onChange={handleChange}
            label="Hostel City"
            variant="outlined"
          />
          <TextField
            id="standard-basic"
            sx={{ minWidth: "30rem", margin: "1rem" }}
            value={updateHostelDetails.hostelPhone}
            name="hostelPhone"
            onChange={handleChange}
            label="Hostel Phone"
            variant="outlined"
          />

          <TextField
            id="standard-basic"
            sx={{ minWidth: "30rem", margin: "1rem" }}
            value={updateHostelDetails.hostelNoOfRooms}
            name="hostelNoOfRooms"
            onChange={handleChange}
            label="Hostel NO. of Rooms"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleUpdateHostel(item._id)}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
