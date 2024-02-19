import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { EditOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import AddEducation from "../../components/AddEducation";
import EditEducation from "../../components/EditEducation";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useParams } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
const SubEducation = ({ education, user }) => {
  console.log("education", education);
  const { _id } = useSelector((state) => state.user);
  const { userId } = useParams();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <FlexBetween gap="1rem" mb="0.5rem">
      <FlexBetween gap="1rem">
        <Box>
          <FlexBetween gap="1rem" width={"100%"}>
            <Typography color={main} fontSize={20} fontWeight="500">
              {education.institute}
            </Typography>
            <Typography color={main} fontWeight="200">
              {education.location}
            </Typography>
          </FlexBetween>

          <FlexBetween gap="1rem">
            <Typography color={medium}>{new Date(education.startDate).toLocaleString('default', { month: 'long' })} {new Date(education.startDate).getFullYear()}</Typography>
            to <Typography color={medium}>{new Date(education.endDate).toLocaleString('default', { month: 'long' })} {new Date(education.endDate).getFullYear()}</Typography>
          </FlexBetween>
        </Box>
      </FlexBetween>
      {_id === userId && (
        <>
          <EditOutlined
            onClick={handleOpen}
            style={{
              cursor: "pointer",
            }}
            sx={{ color: main }}
          />
          <EditEducation
            user={!user ? {} : user}
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            education={education}
          />
        </>
      )}
    </FlexBetween>
  );
};
function Education({ userId }) {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const [education, setEducation] = useState([]);
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);
  const getEducation = async () => {
    const response = await fetch(
      `http://localhost:3001/education/getall/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setEducation(data);
  };

  useEffect(() => {
    getEducation();
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;
  return (
    <Box p="1rem 0">
      <FlexBetween gap="1rem">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Education
        </Typography>
        <AddIcon
          onClick={handleOpen}
          style={{
            cursor: "pointer",
          }}
        />
        <AddEducation
          user={!user ? {} : user}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </FlexBetween>

      {education.map((item, key) => (
        <SubEducation education={item} key={key} user={user} />
      ))}
    </Box>
  );
}

export default Education;
