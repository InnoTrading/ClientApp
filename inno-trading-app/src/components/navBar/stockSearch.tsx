"use client";
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import { IoIosSearch } from "react-icons/io";
import Link from 'next/link';
import { filterStocks } from '@/api/stockApi';

interface Stock {
  ticker: string;
  name: string;
}

export default function StockSearchAutocomplete() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  useEffect(() => {
    if (inputValue.trim()) {
      setLoading(true);
      filterStocks(inputValue)
        .then(res => setOptions(res.data))
        .catch((error) => {
          console.error("Error during fetching the data:", error);
          setOptions([]);
        })
        .finally(() => setLoading(false));
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option.ticker === value.ticker}
      getOptionLabel={(option) => `${option.ticker} - ${option.name}`}
      options={options}
      loading={loading}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      renderOption={(props, option) => (
        <li {...props}>
          <Link 
            href={`/instruments/${option.ticker}`} 
            style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
            onClick={() => {
              setInputValue('');
              setOptions([]);
            }}
          >
            {`${option.ticker} - ${option.name}`}
          </Link>
        </li>
      )}
      renderInput={(params) => (
        <TextField 
          {...params}
          label="Search stocks"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment  position="start" >
                <IoIosSearch />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      noOptionsText="Not found"
    />
  );
}
