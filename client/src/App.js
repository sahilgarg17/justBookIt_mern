import "./App.css";
import Appbar from "./components/Appbar";
import Hostels from "./components/Hostels";
import HostelState from "./context/HostelState";
import AuthState from "./context/AuthState";
import { Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import HostelOwnerDashboard from "./components/HostelOwnerDashboard";
import Footer from "./components/Footer";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import HomePage from "./components/HomePage";
import Admin from "./admin/Admin";
function App() {
  return (
    <>
      <HostelState>
        <AuthState>
          <Appbar />
          <Route exact path="/Home">
            <Hostels />
          </Route>
          <Route exact path="/">
            <Hostels />
          </Route>
          <Route exact path="/Signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/StudentDashboard">
            <StudentDashboard />
          </Route>
          <Route exact path="/HostelOwnerDashboard">
            <HostelOwnerDashboard />
          </Route>
          <Route exact path="/Profile">
            <Profile />
          </Route>
          <Route exact path="/HomePage">
            <HomePage />
          </Route>
          <Route exact path="/Admin">
            <Admin />
          </Route>

          <Footer />
        </AuthState>
      </HostelState>
    </>
  );
}

export default App;
