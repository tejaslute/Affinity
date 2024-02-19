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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
const initial = {
  tenth: "",
  twelth: "",
  degree: "",
  cgpa: "",
  liveBacklog: 0,
  educationGap: 0,
  yearDown: 0,
  internship: 0,
};
function EmployibilityScore() {
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState(initial);
  const [result, setResult] = useState({
    Employability: "",
    Score: "",
  });
  const handleSubmit = async () => {
    console.log("submitted", data);
    const response = await fetch(`http://localhost:5000/score`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const exp = await response.json();
    setResult(exp);
    // console.log(await response.json())
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        fullWidth
        type="submit"
        sx={{
          m: "2rem 0",
          p: "1rem",
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
          "&:hover": { color: palette.primary.main },
        }}
      >
        Check Employability Score
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
                  Check Employability Score
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
                  type="number"
                  value={data.tenth}
                  onChange={(e) => setData({ ...data, tenth: e.target.value })}
                  label="10th Percentage"
                  variant="outlined"
                  required
                />
                <TextField
                  value={data.twelth}
                  onChange={(e) => setData({ ...data, twelth: e.target.value })}
                  type="number"
                  fullWidth
                  label="12th Percentage"
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
                  type="number"
                  label="Degree Percentage"
                  variant="outlined"
                  value={data.degree}
                  required
                  onChange={(e) => setData({ ...data, degree: e.target.value })}
                />
                <TextField
                  value={data.cgpa}
                  onChange={(e) => setData({ ...data, cgpa: e.target.value })}
                  type="number"
                  fullWidth
                  label="Degree CGPA"
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
                <FormControlLabel
                  required
                  control={
                    <Checkbox
                      checked={!!data.liveBacklog}
                      onChange={(e) =>
                        setData({
                          ...data,
                          liveBacklog: Number(e.target.checked),
                        })
                      }
                    />
                  }
                  label="Have Live Backlog?"
                />
                <FormControlLabel
                  required
                  control={
                    <Checkbox
                      checked={!!data.educationGap}
                      onChange={(e) =>
                        setData({
                          ...data,
                          educationGap: Number(e.target.checked),
                        })
                      }
                    />
                  }
                  label="had Education gap?"
                />
              </Stack>
              <Stack
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                direction={"row"}
              >
                <FormControlLabel
                  required
                  control={
                    <Checkbox
                      checked={!!data.yearDown}
                      onChange={(e) =>
                        setData({ ...data, yearDown: Number(e.target.checked) })
                      }
                    />
                  }
                  label="Had Year Down?"
                />
                <FormControlLabel
                  required
                  control={
                    <Checkbox
                      checked={!!data.internship}
                      onChange={(e) =>
                        setData({
                          ...data,
                          internship: Number(e.target.checked),
                        })
                      }
                    />
                  }
                  label="Have you done internship?"
                />
              </Stack>
            </Stack>
            <Typography variant="h5" gutterBottom>
              Result
            </Typography>
            <Stack
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              direction={"row"}
            >
              <TextField fullWidth value={result.Employability} aria-readonly />
              <TextField fullWidth value={result.Score} aria-readonly />
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
                Check Your Employability Score
              </Button>
              <Button onClick={handleClose}>Close</Button>
            </Stack>
          </Box>
        </form>
      </Modal>
    </div>
  );
}

export default EmployibilityScore;
