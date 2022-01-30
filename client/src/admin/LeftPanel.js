import * as React from "react";
import Box from "@mui/material/Box";

export default function LeftPanel() {
  return (
    <Box
      sx={{
        width: 500,
        height: 800,
        marginTop: "-3rem",
        backgroundColor: "#1976D2",
        "&:hover": {
          backgroundColor: "#1976D2",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  );
}
