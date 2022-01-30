import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function Aggrement({ setisAgree }) {
  const [value, setValue] = React.useState("Agree");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    if (value === "Agree") {
      setisAgree("Agree");
    } else {
      setisAgree("Disagree");
    }
  }, [value]);

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="Agree" control={<Radio />} label="Agree" />
        <FormControlLabel
          value="Disagree"
          control={<Radio />}
          label="Disagree"
        />
      </RadioGroup>
    </FormControl>
  );
}
