import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteDialog from "./DeleteDialog";
import { useState } from "react";
import EditDialogBox from "./EditDialogBox";

export default function HostelOwnerHostelsCards({
  item,
  deleteHostel,
  setrerender,
  updateHostel,
}) {
  const [openDialog, setopenDialog] = useState(false); // it handles remove dialog box
  const [dialogRes, setdialogRes] = useState(false);

  const [handleEditBox, sethandleEditBox] = useState(false);

  const removeHostel = () => {
    setopenDialog(true);

    console.log(dialogRes);

    if (dialogRes) {
      deleteHostel(item._id);
      setrerender(false);
    }
  };
  const editHostel = () => {
    sethandleEditBox(true);
  };

  return (
    <>
      <DeleteDialog
        setdialogRes={setdialogRes}
        openDialog={openDialog}
        setopenDialog={setopenDialog}
        item={item}
        deleteHostel={deleteHostel}
      />

      <EditDialogBox
        handleEditBox={handleEditBox}
        sethandleEditBox={sethandleEditBox}
        item={item}
        updateHostel={updateHostel}
      />
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          ></Typography>
          <Typography variant="h5" component="div">
            {item.hostelName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Hostel Address : {item.hostelAddress}
          </Typography>
          <Typography variant="body2">
            Hostel City : {item.hostelCity}
            <br />
            Hostel Phone : {item.hostelPhone}
            <br />
            Hostel No. of Rooms : {item.hostelNoOfRooms}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View Details</Button>
          <Button onClick={removeHostel} size="small" variant="outlined">
            Remove
          </Button>
          <Button size="small" onClick={editHostel} variant="contained">
            Edit
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
