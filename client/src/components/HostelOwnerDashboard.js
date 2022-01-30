import React from "react";
import Container from "@mui/material/Container";
import { useContext, useState } from "react";
import { useEffect } from "react";
import DashboardNavIcons from "./DashboardNavIcons";
import Box from "@mui/material/Box";
import Profile from "./Profile";
import AuthContext from "../context/AuthContext";
import AddHostelIcon from "./AddHostelIcon";
import HostelOwnerHostels from "./HostelOwnerHostels";
const HostelOwnerDashboard = () => {
  const context = useContext(AuthContext);

  const { loggedinuser, hostelownerlogindetails } = context;

  const [navChangerNum, setnavChangerNum] = useState(0);
  const { name, email } = loggedinuser;

  // this state is used  to re render hostel owners hostels after adding hostels
  const [rerender, setrerender] = useState(false);

  useEffect(() => {
    hostelownerlogindetails();

    document.title = "Dashboard";
    // eslint-disable-next-line
  }, []);

  const stateChange = (val) => {
    setnavChangerNum(val);
  };

  return (
    <div>
      <Box
        sx={{
          width: 700,
          margin: "auto",
          maxWidth: "100%",
          marginTop: "-3rem",
          marginRight: "8rem",
        }}
      >
        <DashboardNavIcons stateChange={stateChange} />
      </Box>
      <Container
        style={{ height: "auto", minHeight: "80vh", marginBottom: "3rem" }}
      >
        <h1 style={{ textAlign: "center" }}>{name}'s Dashboard</h1>

        {navChangerNum === 1 ? (
          <Profile name={name} email={email} />
        ) : (
          <>
            <AddHostelIcon setrerender={setrerender} />
            <HostelOwnerHostels rerender={rerender} setrerender={setrerender} />
          </>
        )}
      </Container>
    </div>
  );
};

export default HostelOwnerDashboard;
