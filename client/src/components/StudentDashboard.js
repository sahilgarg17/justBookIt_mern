import React from "react";
import Container from "@mui/material/Container";
import { useContext, useState } from "react";
import { useEffect } from "react";
import DashboardNavIcons from "./DashboardNavIcons";
import Box from "@mui/material/Box";
import Profile from "./Profile";
import AuthContext from "../context/AuthContext";
import HostelContext from "../context/HostelContext";
import StudentAssignHostelCard from "./StudentAssignHostelCard";
const StudentDashboard = () => {
  const authContext = useContext(AuthContext);
  const hostelContext = useContext(HostelContext);

  const { studentLoginDetails, loggedinuser } = authContext;

  const { getAssignHostel, getAssignHostell } = hostelContext;

  const { name, email } = loggedinuser;
  useEffect(() => {
    studentLoginDetails();
    //eslint-disable-next-line
  }, []);

  const [navChangerNum, setnavChangerNum] = useState(0);

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

        {navChangerNum === 0 ? (
          <StudentAssignHostelCard
            getAssignHostell={getAssignHostell}
            getAssignHostel={getAssignHostel}
          />
        ) : (
          <Profile name={name} email={email} />
        )}
      </Container>
    </div>
  );
};

export default StudentDashboard;
