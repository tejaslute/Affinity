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

const EditEducation = ({ open, user, handleClose, handleOpen }) => {
  // console.log("user", user);
  const [eduData, setEduData] = React.useState({
    institute: "",
    startDate: "",
    endDate: "",
    location: "",
  });
  const token = useSelector((state) => state.token);

  const createEducation = async () => {
    const response = await fetch(
      `http://localhost:3001/education/create/${user._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eduData),
      }
    ).then((res) => {
      console.log("res", res);
      handleClose();
    });
  };
  const handleSubmit = () => {
    console.log("exp", eduData);
    createEducation();
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
            {/* This is education */}

            <Typography variant="h5" gutterBottom>
              Add Education
            </Typography>

            <Stack direction={"column"} justifyContent={"center"} spacing={2}>
              <Stack direction={"row"} justifyContent={"center"} spacing={2}>
                <TextField
                  value={eduData.institute}
                  onChange={(e) =>
                    setEduData((prev) => ({
                      ...prev,
                      institute: e.target.value,
                    }))
                  }
                  required
                  fullWidth
                  label="Institute"
                  variant="outlined"
                />

                <TextField
                  value={eduData.location}
                  onChange={(e) =>
                    setEduData((prev) => ({
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
              <Stack direction={"row"} justifyContent={"center"} spacing={2}>
                <TextField
                  value={eduData.startDate}
                  onChange={(e) =>
                    setEduData((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                  type="date"
                  required
                  fullWidth
                  label="Start Date"
                  variant="outlined"
                />
                <TextField
                  value={eduData.endDate}
                  onChange={(e) =>
                    setEduData((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                  type="date"
                  required
                  fullWidth
                  label="End Date"
                  variant="outlined"
                />
              </Stack>
            </Stack>
          </Stack>

          <Button type="submit"> Save</Button>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </form>
    </Modal>
  );
};

export default EditEducation;
