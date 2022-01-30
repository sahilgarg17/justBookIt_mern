import * as React from "react";
import { useContext, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SvgIcon from "@mui/material/SvgIcon";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
// import HomeIcon from "@mui/icons-material/Home";
const drawerWidth = 240;
toast.configure();

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function Signup() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const context = useContext(AuthContext);

  const { SendStudentsToDb, SendHostelOwnersToDb, students, fetchStudents } =
    context;
  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const postData = () => {
    let isUserNotExist = true;
    students.user.forEach((item) => {
      if (values.email === item.email) {
        isUserNotExist = false;
      }
    });

    if (values.name && values.password && values.email && values.radioValue) {
      if (values.password === values.cpassword) {
        if (values.radioValue === "Student") {
          if (isUserNotExist) {
            SendStudentsToDb(values.name, values.email, values.password);

            setValues({
              password: "",
              name: "",
              email: "",
              cpassword: "",
              radioValue: "",
              showPassword: false,
            });

            toast.success(
              "Success! Your Account has been created Successfully.",
              {
                autoClose: 20000,
                position: toast.POSITION.TOP_CENTER,
              }
            );
          } else {
            toast.error("Error! Email already exist.", {
              autoClose: 20000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        } else {
          SendHostelOwnersToDb(values.name, values.email, values.password);

          setValues({
            password: "",
            name: "",
            email: "",
            cpassword: "",
            radioValue: "",
            showPassword: false,
          });

          toast.success(
            "Success! Your Account has been created Successfully.",
            {
              autoClose: 20000,
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
      } else {
        console.log("password and confirm password are  not same");

        toast.warning(
          "Sorry! Your Password and confirm password are not same",
          {
            autoClose: 20000,
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    } else {
      toast.warning("Warning! No fields can be empty.", {
        autoClose: 20000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [values, setValues] = React.useState({
    password: "",
    name: "",
    email: "",
    cpassword: "",
    radioValue: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Create a New Account</h1>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
              component="div"
            >
              JustBookIt
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Main open={open}>
          <DrawerHeader />
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["login", "Signup", "Home", "About"].map((text, index) => (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/${text}`}
              >
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index === 0 ? (
                      <LoginIcon color="success" />
                    ) : index === 1 ? (
                      <LoginIcon color="success" />
                    ) : (
                      <HomeIcon />
                    )}
                    {/* {index === 1 ? <LoginIcon color="success" /> : <MailIcon />} */}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <Container
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 9, width: "4rem" },
          }}
          noValidate
          autoComplete="off"
        />

        <TextField
          id="outlined-basic"
          style={{ width: "26rem", margin: "1rem", marginTop: "-5rem" }}
          label="Name"
          value={values.name}
          onChange={handleChange("name")}
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          style={{ width: "26rem" }}
          label="email"
          value={values.email}
          onChange={handleChange("email")}
          variant="outlined"
        />

        <FormControl sx={{ m: 2, width: "26rem" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <FormControl sx={{ m: 0.5, width: "26rem" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.cpassword}
            onChange={handleChange("cpassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 0.5 }} component="fieldset">
          <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
            <FormControlLabel
              value="Student"
              control={<Radio />}
              onChange={handleChange("radioValue")}
              label="Student"
            />
            <FormControlLabel
              value="Hostel Owner"
              control={<Radio />}
              onChange={handleChange("radioValue")}
              label="Hostel Owner"
            />
          </RadioGroup>
        </FormControl>
        <Button
          sx={{ m: 3, width: "26rem", padding: "0.6rem" }}
          variant="outlined"
          onClick={() => postData()}
        >
          Sign UP
        </Button>
      </Container>
    </>
  );
}
