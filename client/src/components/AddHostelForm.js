import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import HostelContext from "../context/HostelContext";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useContext } from "react";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

toast.configure();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddHostelForm({ toggle, settoggle, setrerender }) {
  const handleClose = () => {
    settoggle(!toggle);
  };

  const context = useContext(HostelContext);

  const { addHostel } = context;
  const submitHostelDetailsToDb = (
    hostelName,
    hostelAddress,
    hostelCity,
    hostelPhone,
    hostelNoOfRooms
  ) => {
    console.log("you clicked the button");

    if (
      newHostelDetails.hostelName &&
      newHostelDetails.hostelPhone &&
      newHostelDetails.hostelAddress &&
      newHostelDetails.hostelCity &&
      newHostelDetails.hostelNoOfRooms
    ) {
      addHostel(
        newHostelDetails.hostelName,
        newHostelDetails.hostelAddress,
        newHostelDetails.hostelCity,
        newHostelDetails.hostelPhone,
        newHostelDetails.hostelNoOfRooms
      );

      handleClose();

      // history.push("/HostelOwnerDashboard");
      toast.success("Success! Hostel is added successfully.", {
        autoClose: 20000,
        position: toast.POSITION.TOP_CENTER,
      });

      setrerender(true);
    } else {
      toast.warning("Warning! No fields can be empty.", {
        autoClose: 20000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const newHostelDetailsInitial = {
    hostelName: "",
    hostelAddress: "",
    hostelCity: "",
    hostelPhone: "",
    hostelNoOfRooms: "",
  };

  const [newHostelDetails, setnewHostelDetails] = useState(
    newHostelDetailsInitial
  );

  const handleChange = (prop) => (event) => {
    setnewHostelDetails({ ...newHostelDetails, [prop]: event.target.value });
  };

  return (
    <div>
      {console.log(toggle)}
      <Dialog
        fullScreen
        open={toggle}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add New Hostel Details
            </Typography>
            <Button autoFocus color="inherit" onClick={submitHostelDetailsToDb}>
              Add Hostel
            </Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ marginTop: "6rem" }}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                width: "32rem",
                margin: "auto",
                display: "flex",
                marginTop: "1rem",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Hostel Name"
              value={newHostelDetails.hostelName}
              onChange={handleChange("hostelName")}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Hostel Address"
              value={newHostelDetails.hostelAddress}
              onChange={handleChange("hostelAddress")}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Hostel Phone"
              value={newHostelDetails.hostelPhone}
              onChange={handleChange("hostelPhone")}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Hostel City"
              value={newHostelDetails.hostelCity}
              onChange={handleChange("hostelCity")}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Total Number of Rooms"
              value={newHostelDetails.hostelNoOfRooms}
              onChange={handleChange("hostelNoOfRooms")}
              variant="outlined"
            />
          </Box>
        </Container>
      </Dialog>
    </div>
  );
}
