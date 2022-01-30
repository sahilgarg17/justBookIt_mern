import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("category");

    history.push("/login");
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
};

export default Logout;
