import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const skills = [
  "Angular",
  "React",
  "Vue",
  "Javascript",
  "Typescript",
  "HTML",
  "CSS",
  "Node",
  "Express",
  "MongoDB",
  "SQL",
  "Python",
  "Java",
  "C",
  "C++",
  "C#",
];

function getStyles(skill, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(skill) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Skills() {
  const theme = useTheme();
  const { _id } = useSelector((state) => state.user);
  const temp = useSelector((state) => state.user);
  console.log("temp", temp);
  const [personName, setPersonName] = React.useState([]);
  const token = useSelector((state) => state.token);
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setPersonName(data.skills);
  };
  React.useEffect(() => {
    getUser();
  }, []);
  const updateUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skills: personName,
      }),
    });
    const data = await response.json();
    console.log("data", data);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    updateUser(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 0.2, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Skills</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Skills" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {skills.map((skill) => (
            <MenuItem
              key={skill}
              value={skill}
              style={getStyles(skill, personName, theme)}
            >
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
