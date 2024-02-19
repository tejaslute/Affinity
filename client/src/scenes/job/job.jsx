import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Box, useMediaQuery, Divider, Typography } from "@mui/material";
import Navbar from "scenes/navbar";
import FlexBetween from "components/FlexBetween";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import CreateJob from "components/CreateJob";

export default function Job() {
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [jobs, setJobs] = React.useState([]);
  const getAllJobs = async () => {
    const response = await fetch(`http://localhost:3001/job`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setJobs(data);
  };
  React.useEffect(() => {
    getAllJobs();
  }, []);
  return (
    <Box>
      <Navbar />
      <Box my="8px">
        <Typography variant="h3" component="h4" align="center">
          Jobs Page
        </Typography>
      </Box>
      <Box my="8px">
        <CreateJob/>
      </Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <List
          sx={{ width: "100%", maxWidth: 700, bgcolor: "background.paper" }}
        >
          {jobs.map((item, key) => (
            <Box key={key}>
              <ListItem
                onClick={() => {
                  window.location.href = "/job/" + item._id;
                }}
                sx={{ cursor: "pointer", width: "100%" }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    alignItems="end"
                    primary={`${item.jobtitle} at ${item.company}`}
                    secondary={`${new Date(item.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}`}
                  />
                  <ListItemText
                    alignItems="end"
                    primary="Posted By"
                    secondary={item.postedBy.firstName+" "+item.postedBy.lastName}
                  />
                </Stack>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
}
