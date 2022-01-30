import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import AddHostelForm from "./AddHostelForm";
import { useState } from "react";

export default function AddHostelIcon({ setrerender }) {
  const [toggle, settoggle] = useState(false);

  return (
    <>
      <AddHostelForm
        toggle={toggle}
        setrerender={setrerender}
        settoggle={settoggle}
      />

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
        icon={<SpeedDialIcon />}
        onClick={() => settoggle(!toggle)}
      ></SpeedDial>
    </>
  );
}
