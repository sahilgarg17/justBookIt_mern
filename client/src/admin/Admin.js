import React from "react";
import LeftPanel from "./LeftPanel";
import RightBox from "./RightBox";
import { useEffect } from "react";

const Admin = () => {
  useEffect(() => {
    document.title = "Admin Dashboard";
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <LeftPanel />
      <RightBox />
    </div>
  );
};

export default Admin;
