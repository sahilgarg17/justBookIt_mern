import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import HostelImagesSlider from "./HostelImagesSlider";
import HostelRating from "./HostelRating";
import Slide from "@mui/material/Slide";
import { useContext, useState } from "react";
import StudentRegistrationForHostel from "./StudentRegistrationForHostel";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HostelContext from "../context/HostelContext";

toast.configure();
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewHostelDetails({ toggle, settoggle, hostelData }) {
  const handleClose = () => {
    settoggle(!toggle);
  };

  const [isRegFormOpen, setisRegFormOpen] = useState(false);

  const context = useContext(HostelContext);

  const { assignhostel, hostelIsAlreadyAssigned } = context;

  const reserveSeat = (hostelId) => {
    if (localStorage.getItem("auth-token")) {
      if (localStorage.getItem("category") === "Student") {
        // assignhostel(hostelId);

        console.log("open");
        setisRegFormOpen(true);

        console.log(isRegFormOpen);

        // console.log(hostelIsAlreadyAssigned, "hello");
        // if (!hostelIsAlreadyAssigned) {
        //   toast.success("Success! Hostel is assigned.", {
        //     autoClose: 20000,
        //     position: toast.POSITION.TOP_CENTER,
        //   });

        // } else {
        //     toast.error("Error! You Already Assigned a hostel.", {
        //       autoClose: 20000,
        //       position: toast.POSITION.TOP_CENTER,
        //     });
        //   }
        // console.log("hostel is assigned");
      } else {
        toast.error(
          "Error! You are not Allowed to Reserve a Seat. Please Login to Student Account.",
          {
            autoClose: 20000,
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    } else {
      toast.error("Error! You are not logged in. Please Login.", {
        autoClose: 20000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const {
    hostelId,
    hostelName,
    hostelAddress,
    hostelCity,
    hostelPhone,
    hostelNoOfRooms,
  } = hostelData;

  return (
    <div>
      <Dialog
        fullScreen
        open={toggle}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <StudentRegistrationForHostel
          setisRegFormOpen={setisRegFormOpen}
          isRegFormOpen={isRegFormOpen}
          hostelData={hostelData}
        />
        <AppBar sx={{ position: "fixed" }}>
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
              Hostel Details
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => reserveSeat(hostelId)}
            >
              Reserve Your Seat
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ margin: "3rem" }}>
          <HostelImagesSlider />
          <h1 style={{ textAlign: "center" }}>Hostel Details</h1>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            <strong> Hostel Name :</strong>
            <br />
            {hostelName}
          </Typography>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            <strong>Hostel Address :</strong>
            <br />
            {hostelAddress}
          </Typography>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            <strong>Hostel City : </strong>
            <br />

            {hostelCity}
          </Typography>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            <strong> Hostel Phone :</strong>
            <br />
            {hostelPhone}
          </Typography>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            <strong> Hostel No. of Rooms :</strong>
            <br />
            {hostelNoOfRooms}
          </Typography>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {<HostelRating />}
          </Typography>
        </Container>
      </Dialog>
    </div>
  );
}
