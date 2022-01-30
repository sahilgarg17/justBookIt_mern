import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatars from "./Avatars";

export default function Profile({ name, email }) {
  return (
    <Box
      sx={{
        width: "19rem",
        margin: "auto",
        textAlign: "center",
        marginBottom: "3rem",
      }}
    >
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Avatars />

            <Typography sx={{ m: "1rem" }} color="text.secondary">
              Your Profile
            </Typography>
            <Typography variant="body2">
              <b>Name : </b> {name}
              <br />
            </Typography>
            <Typography variant="body2">
              <b> Email </b> : {email}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
