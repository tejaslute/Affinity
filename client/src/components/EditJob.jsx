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
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
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

function EditJob({ jobData }) {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState(jobData);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [result, setResult] = useState({
    Employability: "",
    Score: "",
  });
  const handleSubmit = async () => {
    console.log("submitted", data);
    const response = await fetch(`http://localhost:3001/job/${jobData._id}`, {
      method: "PATCH",
      body: JSON.stringify({ ...data }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const exp = await response.json();
    setResult(exp);
    // console.log(await response.json())
  };
  const deleteJob = async () => {
    const response = await fetch(`http://localhost:3001/job/${jobData._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const exp = await response.json();
    navigate("/job");
    // console.log(await response.json())
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button
        onClick={handleOpen}
        variant="contained"
        type="submit"
        sx={{
          m: "1rem 0",
          p: "1rem",

          backgroundColor: palette.primary.main,
          color: palette.background.alt,
          "&:hover": { color: palette.primary.main },
        }}
      >
        Update Job
      </Button>
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
                  Update Job
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
                  type="text"
                  value={data.jobtitle}
                  onChange={(e) =>
                    setData({ ...data, jobtitle: e.target.value })
                  }
                  label="Job Title"
                  variant="outlined"
                  required
                />
                <TextField
                  value={data.company}
                  onChange={(e) =>
                    setData({ ...data, company: e.target.value })
                  }
                  type="text"
                  fullWidth
                  label="Company Name"
                  variant="outlined"
                  required
                />
              </Stack>
              <Stack
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                direction={"row"}
              >
                <TextField
                  fullWidth
                  type="text"
                  label="Job Description"
                  variant="outlined"
                  value={data.jobDescription}
                  required
                  onChange={(e) =>
                    setData({ ...data, jobDescription: e.target.value })
                  }
                />
                <TextField
                  value={data.location}
                  onChange={(e) =>
                    setData({ ...data, location: e.target.value })
                  }
                  type="text"
                  fullWidth
                  label="Location"
                  variant="outlined"
                  required
                  inputProps={{ step: "0.1" }}
                />
              </Stack>

              <Stack
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                direction={"row"}
              >
                <TextField
                  fullWidth
                  type="text"
                  label="salary"
                  variant="outlined"
                  value={data.salary}
                  required
                  onChange={(e) => setData({ ...data, salary: e.target.value })}
                />
                <TextField
                  value={data.applicationForm}
                  onChange={(e) =>
                    setData({ ...data, applicationForm: e.target.value })
                  }
                  type="text"
                  fullWidth
                  label="Google Form Link"
                  variant="outlined"
                  required
                  inputProps={{ step: "0.1" }}
                />
              </Stack>
            </Stack>

            <Stack
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              direction={"row"}
            >
              <Button
                sx={{
                  color: palette.background.alt,
                  backgroundColor: palette.primary.main,
                  borderRadius: "3rem",
                }}
                type="submit"
                marginTop={"20px"}
              >
                Update Job
              </Button>
              <Button onClick={deleteJob}>Delete</Button>
              <Button onClick={handleClose}>Close</Button>
            </Stack>
          </Box>
        </form>
      </Modal>
    </Box>
  );
}

export default EditJob;
