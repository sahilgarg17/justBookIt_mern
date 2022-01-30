import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import HostelItem from "./HostelItem";
import Container from "@mui/material/Container";
import HostelSearchBar from "./HostelSearchBar";
import HostelContext from "../context/HostelContext";

import Box from "@mui/material/Box";
import HostelImagesSlider from "./HostelImagesSlider";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
function GridItem(props) {
  return (
    // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
    // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
    // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
    <Grid item xs={12} sm={6} md={3}>
      <HostelItem data={props.hostel} />
    </Grid>
  );
}
export default function Hostels() {
  const classes = useStyles();

  const context = useContext(HostelContext);

  const { hostels, getHostels, assignHostel } = context;

  useEffect(() => {
    getHostels();

    document.title = "Home";
    // console.log(hostels);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {/* <h3>Ex 4: Responsive Material UI Grid </h3> */}
      {/* // I am a container Grid with 1 (8px) spacing */}

      <Container sx={{ marginBottom: "2rem" }}>
        <HostelImagesSlider />
      </Container>

      <HostelSearchBar />

      <h1 style={{ textAlign: "center" }}>Hostels</h1>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {hostels.map((hostelItem) => {
            return (
              <GridItem
                classes={classes}
                key={hostelItem._id}
                hostel={hostelItem}
                assignHostel={assignHostel}
              />
            );
          })}
        </Grid>
        ;
      </Container>
    </div>
  );
}
