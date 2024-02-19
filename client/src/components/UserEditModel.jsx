import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  TextField,
  Stack,
  Typography,
  InputLabel,
  Select,
  Divider,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  maxHeight: 650,
  overflow: "scroll",
};

// This is experience component

const ExperienceSection = () => {
  const [age, setAge] = React.useState("Full Time");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Stack direction={"column"} justifyContent={"center"} spacing={2}>
      <Stack direction={"row"} justifyContent={"center"} spacing={2}>
        <TextField fullWidth label="Title" variant="outlined" />

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-label"
          fullWidth
          value={age}
          label={"Position"}
          onChange={handleChange}
        >
          <MenuItem value={"Full Time"}>Full Time</MenuItem>
          <MenuItem value={"Part Time"}>Part Time</MenuItem>
          <MenuItem value={"Internship"}>Internship</MenuItem>
          <MenuItem value={"Freelancer"}>Freelancer</MenuItem>
        </Select>
      </Stack>

      <TextField fullWidth label="Company" variant="outlined" />
      <TextField fullWidth label="Location" variant="outlined" />
    </Stack>
  );
};

const UserEditModel = ({ open, user, handleClose, handleOpen }) => {
  console.log("user", user);
  const token = useSelector((state) => state.token);
  const [userdata, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    occupation: user.occupation,
    email: user.email,
  });
  // To handle Submit
  const updateUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${user._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    });
    const data = await response.json();
    console.log("data", data);
  };

  const handleSubmit = () => {
    updateUser();
    // This will have to hit /saveprofile route with application id
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box sx={{ ...style, width: 700 }}>
          <Stack
            marginBottom={2}
            direction="column"
            justifyContent="center"
            spacing={3}
          >
            <Stack
              direction="column"
              alignItems={"center"}
              justifyContent="center"
              mt={4}
            >
              <Typography variant="h3" gutterBottom>
                Edit Profile
              </Typography>
            </Stack>

            <Stack
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              direction={"row"}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                value={userdata.firstName}
                onChange={(e) =>
                  setUserData({ ...userdata, firstName: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                value={userdata.lastName}
                onChange={(e) =>
                  setUserData({ ...userdata, lastName: e.target.value })
                }
              />
            </Stack>

            {/* <TextField
              fullWidth
              label="Headline"
              variant="outlined"
              value={userdata.occupation}
              onChange={(e) =>
                setUserData({ ...userdata, occupation: e.target.value })
              }
            /> */}
            <Select
              fullWidth
              label="Headline"
              variant="outlined"
              value={userdata.occupation}
              onChange={(e) =>
                setUserData({ ...userdata, occupation: e.target.value })
              }
              sx={{ gridColumn: "span 4" }}
              defaultValue={"Student"}
            >
              <MenuItem value={"Student"}>Student</MenuItem>
              <MenuItem value={"Alumni"}>Alumni</MenuItem>
            </Select>
            <Stack
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              direction={"row"}
            >
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                value={userdata.location}
                onChange={(e) =>
                  setUserData({ ...userdata, location: e.target.value })
                }
              />
            </Stack>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={userdata.email}
              onChange={(e) =>
                setUserData({ ...userdata, email: e.target.value })
              }
            />
          </Stack>

          <Button type="submit">Update Details</Button>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </form>
    </Modal>
  );
};

export default UserEditModel;
