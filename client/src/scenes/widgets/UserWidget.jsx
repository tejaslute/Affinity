import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import EmployibilityScore from "components/EmployibilityScore";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import UserEditModel from "components/UserEditModel";
import Experience from "./Experience";
import Education from "./Education";

import Button from "@mui/material/Button";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import Skills from "../../components/Skills";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // this is for the model values

  console.log("token", token);

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
    email,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        {_id === userId && (
          <BorderColorIcon
            onClick={handleOpen}
            style={{
              cursor: "pointer",
            }}
          />
        )}

        {/* <ManageAccountsOutlined />   */}
      </FlexBetween>
      <Divider />
      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <ForwardToInboxIcon fontSize="large" sx={{ color: main }} />

          <Typography color={medium}>
            <a href={`mailto:${email}`}>{email}</a>
          </Typography>
        </Box>
      </Box>
      {_id === userId && <Skills />}
      <EmployibilityScore />
      <Divider />
      <Divider />
      {/* Fifth ROW */}
      <Experience userId={userId} />
      <Education userId={userId} />
      <UserEditModel
        user={!user ? {} : user}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </WidgetWrapper>
  );
};

export default UserWidget;
