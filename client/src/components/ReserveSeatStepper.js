import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Aggrement from "./Aggrement";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import JazzCash from "../images/JazzCash.png";
import easypaisa from "../images/easypaisa.png";
import HostelContext from "../context/HostelContext";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
const steps = [
  "Personal Information",
  "Hostel Aggrement",
  "Pay Hostel Dues",
  "Confirmation",
];

export default function ReserveSeatStepper({ hostelData, handleClose }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const isStepOptional = (step) => {
    return step === 1;
  };

  const context = useContext(HostelContext);

  const { reserveYourSeatInfo } = context;

  const [isAgree, setisAgree] = React.useState("Agree");

  const [personalInfo, setpersonalInfo] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    cnic: "",
    dob: "",
    workPlace: "",
    phone: "",
  });

  const { firstName, lastName, fatherName, cnic, dob, workPlace, phone } =
    personalInfo;

  const { hostelId, hostelOwner } = hostelData;
  let name;
  let value;
  // eslint-disable-next-line
  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;

    setpersonalInfo({
      ...personalInfo,
      [name]: event.target.value,
    });
  };

  const sendReserveSeatInfoToDB = () => {
    reserveYourSeatInfo(
      firstName,
      lastName,
      fatherName,
      cnic,
      dob,
      workPlace,
      phone,
      hostelId,
      hostelOwner
    );
    handleNext();
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption"></Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label} </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            <br />
            {activeStep === 0 ? (
              <>
                <TextField
                  id="standard-basic"
                  sx={{ minWidth: "30rem", margin: "0.5rem" }}
                  label="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={personalInfo.firstName}
                  variant="outlined"
                />

                <TextField
                  id="standard-basic"
                  sx={{ minWidth: "30rem", margin: "0.5rem" }}
                  label="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={personalInfo.lastName}
                  variant="outlined"
                />
                <TextField
                  id="standard-basic"
                  sx={{ minWidth: "30rem", margin: "0.5rem" }}
                  label="Father Name"
                  name="fatherName"
                  onChange={handleChange}
                  value={personalInfo.fatherName}
                  variant="outlined"
                />
                <TextField
                  id="standard-basic"
                  sx={{ minWidth: "30rem", margin: "0.5rem" }}
                  label="CNIC"
                  placeholder="XXXXX-XXXXXXX-X"
                  name="cnic"
                  onChange={handleChange}
                  value={personalInfo.cnic}
                  variant="outlined"
                />
                <TextField
                  id="standard-basic"
                  type="text"
                  sx={{ minWidth: "30rem", margin: "0.5rem" }}
                  label="DOB"
                  name="dob"
                  value={personalInfo.dob}
                  onChange={handleChange}
                  variant="outlined"
                />

                <TextField
                  id="standard-basic"
                  sx={{ minWidth: "30rem", margin: "0.5rem" }}
                  label="Work Place"
                  name="workPlace"
                  onChange={handleChange}
                  value={personalInfo.workPlace}
                  variant="outlined"
                />

                <TextField
                  id="standard-basic"
                  sx={{ minWidth: "30rem", margin: "0.5rem" }}
                  label="Contact Phone"
                  name="phone"
                  onChange={handleChange}
                  value={personalInfo.phone}
                  variant="outlined"
                />
              </>
            ) : activeStep === 1 ? (
              <>
              "This Agreement shall remain effective for one year and shall 
              terminate automatically after one year from the date of its 
              execution. The term of this agreement during its tenure may 
              be revised by mutual consent after satisfactory completion of 
              first year. This agreement can be terminated by either party,
               by giving three months advance notice to the other party.
                This agreement may be renewed after one year, in the
                 mutually agreed terms."
                <br />
                <Aggrement setisAgree={setisAgree} />
              </>
            ) : activeStep === 2 ? (
              <>
                "Pay your hostel Dues" <br /> <br />
                <img
                  src={JazzCash}
                  style={{ width: "8rem" }}
                  alt=""
                  srcset=""
                />
                <img
                  src={easypaisa}
                  style={{ width: "8rem", marginLeft: "3rem" }}
                  alt=""
                  srcset=""
                />
                <br />
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="JazzCash"
                    />
                    <FormControlLabel
                      value="male"
                      style={{ marginLeft: "3rem" }}
                      control={<Radio />}
                      label="Easypaisa"
                    />
                  </RadioGroup>
                </FormControl>
                <br /> <br />
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  type="tel"
                  style={{ width: "20rem" }}
                  variant="outlined"
                />
              </>
            ) : (
              "We have recieved your information. We will reach you soon. Thanks"
            )}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              onClick={
                activeStep === 2
                  ? () => sendReserveSeatInfoToDB()
                  : activeStep === 3
                  ? () => handleClose()
                  : handleNext
              }
            >
              {activeStep === steps.length - 1
                ? "Finish"
                : isAgree === "Agree"
                ? activeStep === 2
                  ? "Submit"
                  : "Next"
                : ""}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
