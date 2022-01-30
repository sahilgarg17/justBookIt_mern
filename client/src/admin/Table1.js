import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import HostelContext from "../context/HostelContext";
import Remove from "./Remove";
import { useContext, useEffect, useState } from "react";
import Details from "./Details";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976D2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function Table1() {
  const context = useContext(HostelContext);
  const [toggleDialog, settoggleDialog] = useState(false);
  const [toggleRemDialog, settoggleRemDialog] = useState(false);
  const [rowData, setrowData] = useState({});
  const { fetchRegStudentData, regStudentData, remRegStudentData } = context;

  console.log(context);
  useEffect(() => {
    fetchRegStudentData();
    // eslint-disable-next-line
  }, []);

  console.log(regStudentData);
  return (
    <>
      <Details
        toggleDialog={toggleDialog}
        settoggleDialog={settoggleDialog}
        rowData={rowData}
      />
      <Remove
        rowData={rowData}
        toggleRemDialog={toggleRemDialog}
        settoggleRemDialog={settoggleRemDialog}
        remRegStudentData={remRegStudentData}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Student Name</StyledTableCell>
              <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {regStudentData.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.firstName + " " + row.lastName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      settoggleDialog(!toggleDialog);
                      setrowData(row);
                    }}
                  >
                    Details
                  </Button>
                  <Button
                    variant="outlined"
                    style={{ marginLeft: "1rem" }}
                    color="error"
                    onClick={() => {
                      settoggleRemDialog(!toggleRemDialog);
                    }}
                  >
                    Remove
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
