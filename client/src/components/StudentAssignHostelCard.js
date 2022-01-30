import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";

export default function StudentAssignHostelCard({
  getAssignHostel,
  getAssignHostell,
}) {
  useEffect(() => {
    getAssignHostel();
    // eslint-disable-next-line
  }, []);

  console.log(getAssignHostell);
  return getAssignHostell.err === "you have not assigned a hostel yet" ? (
    " You have not assigned hostel yet"
  ) : (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {getAssignHostell.hostelName}
        </Typography>
        <Typography variant="h5" component="div">
          {getAssignHostell.hostelName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {getAssignHostell.hostelAddress}
        </Typography>
        <Typography variant="body2">
          {getAssignHostell.hostelPhone}
          <br />
          {getAssignHostell.hostelCity}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
