import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import ViewHostelDetails from "./ViewHostelDetails";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import HostelRating from "./HostelRating";
export default function HostelItem(props) {
  const [toggle, settoggle] = useState(false);

  const hostelData = {
    hostelId: props.data._id,
    hostelName: props.data.hostelName,
    hostelAddress: props.data.hostelAddress,
    hostelCity: props.data.hostelCity,
    hostelPhone: props.data.hostelPhone,
    hostelNoOfRooms: props.data.hostelNoOfRooms,
    hostelOwner: props.data.hostelOwner,
  };
  console.log(props.data);
  return (
    <>
      <ViewHostelDetails
        toggle={toggle}
        settoggle={settoggle}
        hostelData={hostelData}
        assignHostel={props.data.assignHostel}
      />
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.data.hostelName}
          </Typography>
          <Typography variant="h5" component="div">
            {props.data.hostelName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.data.hostelCity}
          </Typography>
          <Typography variant="body2">{props.data.hostelAddress}</Typography>
          <Typography variant="body2">
            No. of Rooms : {props.data.hostelNoOfRooms}
          </Typography>
          <HostelRating />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => settoggle(!toggle)}>
            View Details
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
