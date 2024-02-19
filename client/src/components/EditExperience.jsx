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

const EditExperience = ({
  open,
  user,
  handleClose,
  handleOpen,
  experience,
}) => {
  // console.log("user", user);
  const [exp, setExp] = React.useState(experience);
  const token = useSelector((state) => state.token);

  const createExperience = async () => {
    const response = await fetch(
      `http://localhost:3001/experience/${user._id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exp),
      }
    ).then((res) => {
      console.log("res", res);
      handleClose();
    });
  };
  const handleSubmit = () => {
    console.log("exp", exp);
    createExperience();
  };
  const deleteExperience = async (id) => {
    const response = await fetch(
      `http://localhost:3001/experience/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exp),
      }
    ).then((res) => {
      console.log("res", res);
      handleClose();
    });
  };
  const handleDelete = (id) => {
    console.log("exp", exp);
    deleteExperience(id);
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
                Edit Details1
              </Typography>
            </Stack>

            {/* This is experience */}

            <Typography variant="h5" gutterBottom>
              Add Experience
            </Typography>

            <Stack direction={"column"} justifyContent={"center"} spacing={2}>
              <Stack direction={"row"} justifyContent={"center"} spacing={2}>
                <TextField
                  value={exp.title}
                  onChange={(e) =>
                    setExp((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                  fullWidth
                  label="Title"
                  variant="outlined"
                />

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-label"
                  fullWidth
                  value={exp.type}
                  required
                  onChange={(e) =>
                    setExp((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                  label={"Position"}
                >
                  <MenuItem value={"Full Time"}>Full Time</MenuItem>
                  <MenuItem value={"Part Time"}>Part Time</MenuItem>
                  <MenuItem value={"Internship"}>Internship</MenuItem>
                  <MenuItem value={"Freelancer"}>Freelancer</MenuItem>
                </Select>
              </Stack>

              <TextField
                value={exp.company}
                onChange={(e) =>
                  setExp((prev) => ({
                    ...prev,
                    company: e.target.value,
                  }))
                }
                required
                fullWidth
                label="Company"
                variant="outlined"
              />
              <TextField
                value={exp.location}
                onChange={(e) =>
                  setExp((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                required
                fullWidth
                label="Location"
                variant="outlined"
              />
            </Stack>
          </Stack>

          <Button type="submit"> Save</Button>
          <Button onClick={()=>handleDelete(exp._id)}>Delete</Button>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </form>
    </Modal>
  );
};

export default EditExperience;
