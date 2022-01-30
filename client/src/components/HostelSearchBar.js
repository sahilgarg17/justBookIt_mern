import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Container from "@mui/material/Container";
import SearchIcon from "@material-ui/icons/Search";
export default function FullWidthTextField() {
  return (
    <Container>
      <Box
        sx={{
          width: 500,
          margin: "auto",
          maxWidth: "100%",
        }}
      >
        <TextField
          fullWidth
          label="Search Hostels"
          id="fullWidth"
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
      </Box>
    </Container>
  );
}
