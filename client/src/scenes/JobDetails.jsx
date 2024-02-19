import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Box, useMediaQuery, Divider, Typography, Button } from "@mui/material";
import Navbar from "scenes/navbar";
import FlexBetween from "components/FlexBetween";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import CreateJob from "components/CreateJob";
import { useParams } from "react-router-dom";
import Editjob from "components/EditJob";

export default function JobDetails() {
  const { jobid } = useParams();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [jobs, setJobs] = React.useState([]);
  const getJob = async () => {
    const response = await fetch(`http://localhost:3001/job/${jobid}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setJobs(data);
  };
  React.useEffect(() => {
    getJob();
  }, [jobid]);
  console.log(jobs);
  return (
    <Box>
      <Navbar />
      {jobs.jobtitle && (
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="2rem"
          justifyContent="center"
        >
          <Stack direction={"column"}>
            <Stack w="50%" direction={"row"}>
              <Box marginRight="32px">
                <Typography variant="h2" component="h2" align="center">
                  {jobs.jobtitle &&
                    jobs.jobtitle.charAt(0).toUpperCase() +
                      jobs.jobtitle.slice(1)}
                </Typography>
                <Box>
                  <Typography variant="h5" component="h5" align="left">
                    {jobs.company}/{jobs.location}
                  </Typography>
                  <Typography variant="span" component="span" align="left">
                    posted by{" "}
                    {jobs.postedBy.firstName + " " + jobs.postedBy.lastName}
                  </Typography>
                </Box>
              </Box>
              <Box marginLeft="32px">
                <Button variant="contained" color="primary">
                  <a target="_blank" href={`${jobs.applicationForm}`}>
                    Apply for this job
                  </a>
                </Button>
              </Box>
            </Stack>
            <Stack direction={"column"} mt="64px" maxWidth="500px">
              <Typography
                my="20px"
                variant="span"
                component="span"
                align="left"
              >
                About the role
              </Typography>
              <Typography variant="span" component="span" align="left">
                {jobs.jobDescription}
              </Typography>
            </Stack>
            <Stack mt="64px">
              <Button variant="contained" color="primary">
                <a target="_blank" href={`${jobs.applicationForm}`}>
                  Apply for this job
                </a>
              </Button>
              {user._id === jobs.postedBy._id && (
                <Box>
                  <Editjob jobData={jobs} />
                </Box>
              )}
            </Stack>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
