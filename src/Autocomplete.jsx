import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MUIAutocomplete from "@mui/material/Autocomplete";
import styled from "@emotion/styled";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-input": {}
});

const formatOptions = (options) => {
  return options.map((option) => ({
    id: option.id,
    label: option.title
  }));
};

const Autocomplete = ({ value }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const [options, setOptions] = useState([]);
  // const [options, setOptions] = useState(formatOptions([topFilms[0]]));
  const [enterPress, setEnterPress] = useState(false);
  const loading = open && options.length === 0;
  console.log("selected value", selectedValue);
  console.log("options", options);

  useEffect(() => {
    if (!value) return;
    if (selectedValue) return;
    setSelectedValue({
      id: value.id,
      label: value.title
    });
  }, [value, selectedValue]);

  useEffect(() => {
    if (enterPress === true) {
      setEnterPress(false);
    }
  }, [enterPress, selectedValue]);

  useEffect(() => {
    let active = true;

    // if (!loading) {
    //   return undefined;
    // }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        console.log("active");
        setOptions(formatOptions([...films]));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleChange = (_, value) => {
    console.log("handleChange", value);
    setSelectedValue(value);
  };

  const onKeyDown = (event) => {
    if (event && event.keyCode === 13) {
      event.preventDefault();
    }
  };
  const onFocus = () => {};
  const onBlur = () => {};
  const _stopPropagation = (event) => event && event.stopPropagation();

  return (
    <MUIAutocomplete
      name="film"
      id="asynchronous-film"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      value={selectedValue}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.label || ""}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          label="Films"
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={_stopPropagation}
        />
      )}
    />
  );
};

export default Autocomplete;

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "L??on: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 }
];

export const films = topFilms.map((film, index) => ({
  id: index + 1,
  ...film
}));
