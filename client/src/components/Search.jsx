import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import { useSelector } from "react-redux";

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = "AIzaSyC3aviU6KHXAjoSnxcw6qbOhjnFctbxPkE";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}
const searchUserName = async (input, token) => {
  const response = await fetch(`http://localhost:3001/users/search/${input}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
  console.log("response", response);
  return response;
};
const autocompleteService = { current: null };

export default function SearchUser() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);
  const token = useSelector((state) => state.token);

  

  const fetch = React.useMemo(
    () =>
      debounce(async (request, callback) => {
        
        callback(await searchUserName(request.input, token));
        // autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }
  React.useEffect(() => {
    let active = true;
    

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }
    
    fetch({ input: inputValue }, (results) => {
      
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions.filter(onlyUnique));
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: 300 }}
      getOptionLabel={(option) =>
        typeof option === "string"
          ? option
          : `${option.firstName} ${option.lastName}`
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No User Found"
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          inputProps={{
            style: { border: "0px" },
          }}
          {...params}
          label="Search"
          fullWidth
        />
      )}
      renderOption={(props, option) => {
        console.log("option", option);
        const matches ={name: option.firstName + " " + option.lastName,id:option._id} || {};

        // const parts = parse(
        //   option.firstName + " " + option.lastName,
        //   matches.map((match) => [match.offset, match.offset + match.length]),
        // );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <PeopleAltOutlinedIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
               <a href={`/profile/${matches.id}`}><Box component="span">{matches.name}</Box></a> 
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
