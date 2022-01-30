import * as React from "react";
import Box from "@mui/material/Box";
import GridAdmin from "./Grid";
import Table1 from "./Table1";
import Container from "@mui/material/Container";
export default function RightBox() {
  return (
    <Container>
      <Box
        sx={{
          width: "170vh",
          height: 700,
          marginTop: "-3rem",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
        <Table1 />
      </Box>
    </Container>
  );
}
