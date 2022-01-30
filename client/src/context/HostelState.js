import HostelContext from "./HostelContext";

import React from "react";

import { useState } from "react";
const HostelState = (props) => {
  const host = "http://localhost:3001";

  const hostelInitialState = [];
  const [hostels, sethostels] = useState(hostelInitialState);
  const [singleHostelOwnerhostels, setsingleHostelOwnerhostels] = useState([]);
  const [getAssignHostell, setgetAssignHostell] = useState({});
  const [hostelIsAlreadyAssigned, sethostelIsAlreadyAssigned] = useState(false);
  const [regStudentData, setregStudentData] = useState([]);
  const addHostel = async (
    hostelName,
    hostelAddress,
    hostelCity,
    hostelPhone,
    hostelNoOfRooms
  ) => {
    const obj = {
      hostelName,
      hostelAddress,
      hostelCity,
      hostelPhone,
      hostelNoOfRooms,
    };

    const response = await fetch(`${host}/api/hostel/addHostel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify(obj),
    });
    const resp = await response.json(); // parses JSON response into native JavaScript objects

    console.log(resp);
  };

  const getHostels = async () => {
    const response = await fetch(`${host}/api/hostel/fetchhostels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects

    sethostels(json);
  };
  const getHostelsForSingleHostelOwner = async () => {
    const response = await fetch(`${host}/api/hostel/fetchhostel`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects

    setsingleHostelOwnerhostels(json);
  };

  const assignhostel = async (hostelId) => {
    const response = await fetch(
      `${host}/api/hostel/assignhostel/${hostelId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
    );
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    console.log(json.success, "hostel state");

    if (!json.success) {
      sethostelIsAlreadyAssigned(true);
    }
  };

  const getAssignHostel = async () => {
    const response = await fetch(`${host}/api/hostel/getassignhostel`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects

    setgetAssignHostell(json);
    console.log(json);
  };

  const deleteHostel = async (hostelId) => {
    const response = await fetch(
      `${host}/api/hostel/deletehostel/${hostelId}`,
      {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
    );

    const result = await response.json();

    console.log("this hostel is deleted", result);
  };
  const updateHostel = async (
    hostelId,
    hostelName,
    hostelAddress,
    hostelCity,
    hostelPhone,
    hostelNoOfRooms
  ) => {
    const updatedInfo = {
      hostelName,
      hostelAddress,
      hostelCity,
      hostelPhone,
      hostelNoOfRooms,
    };

    const response = await fetch(
      `${host}/api/hostel/updatehostel/${hostelId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify(updatedInfo),
      }
    );

    const result = await response.json();

    console.log("this hostel is upadated", result);
  };

  const reserveYourSeatInfo = async (
    firstName,
    lastName,
    fatherName,
    cnic,
    dob,
    workPlace,
    phone,
    hostelId,
    hostelOwner
  ) => {
    const reserveSeatInfo = {
      firstName,
      lastName,
      fatherName,
      cnic,
      dob,
      workPlace,
      phone,
      hostelId,
      hostelOwner,
    };

    const response = await fetch(`${host}/api/hostel/reg`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify(reserveSeatInfo),
    });

    const result = await response.json();

    assignhostel(hostelId);
    console.log("this hostel is registered", result);
  };

  const fetchRegStudentData = async () => {
    const response = await fetch(`${host}/api/hostel/fetchRegStudentData`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    setregStudentData(result);

    console.log("this hostel is registered", result);
  };

  const remRegStudentData = async (id) => {
    const response = await fetch(`${host}/api/hostel/remRegStudentData/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    fetchRegStudentData();
    console.log("this hostel is removed  Successfully", result);
  };

  return (
    <HostelContext.Provider
      value={{
        hostels,
        getHostels,
        getHostelsForSingleHostelOwner,
        singleHostelOwnerhostels,
        hostelIsAlreadyAssigned,
        deleteHostel,
        addHostel,
        assignhostel,
        updateHostel,
        getAssignHostel,
        getAssignHostell, // get the return data(assign hostel store the data)
        reserveYourSeatInfo,
        fetchRegStudentData,

        regStudentData,
        remRegStudentData,
      }}
    >
      {props.children}
    </HostelContext.Provider>
  );
};

export default HostelState;
