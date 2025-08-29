import { Box, Button, Card, CardContent, CircularProgress, Divider, FormControl, FormControlLabel, ListItemAvatar, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSections } from '../../hooks/useSections';
import { FilterAlt } from '@mui/icons-material';
import { filterSchema } from './FilterValidation';

const FilterSction = ({setFilter}) => {

    const  sections = useSections({ filter: '' });

    
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
      section: '',
      date: '',
    })

    const handleChange = (e) => {
      setData((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleApply = async () => {
      try {
        setErrors({});
        const validatedData = await filterSchema.validate(data, { abortEarly: false });
        setFilter(validatedData);

      } catch (validationError) {
        if (validationError.inner) {
          const formErrors = {};
          validationError.inner.forEach((err) => {
            formErrors[err.path] = [err.message]; // using array to match your helperText logic
          });
          setErrors(formErrors);
        }
      }
    };

  return (
    <Card elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <CardContent sx={{ p: 2.5 }}>
          <Stack direction="row" spacing={2} >

          {/* section select  */}
          <FormControl sx={{ width: "250px"}}>
            <Typography variant='body1'>
              Select Section
            </Typography>
            <Select
              labelId="section-select-label"
              id="section-select"
              name="section"
              value={data.section}
              onChange={(e) => handleChange(e)}
              placeholder="Select Section"
              error={Boolean(errors?.section)}
              helperText={errors?.section?.[0] || ""}
              displayEmpty
            >
              {/* placeholder  */}
              <MenuItem value="">
                <em>Select Section</em>
              </MenuItem>

              {sections.isLoading && (
                <MenuItem disabled>
                  <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
                </MenuItem>
              )}

              {sections.isError && (
                <MenuItem disabled>
                  <Typography color="error">{sections.error.message}</Typography>
                </MenuItem>
              )}

              {sections?.data?.length === 0 && (
                <MenuItem disabled>No classes available</MenuItem>
              )}

              {sections?.data?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* date  */}
          <FormControl sx={{ width: "250px"}}>
            <Typography variant='body1'>
              Put Date
            </Typography>    
            <TextField
              name="date"
              value={data.date}
              type="date"
              onChange={(e) => handleChange(e)}
              error={Boolean(errors?.date)}
              helperText={errors?.date?.[0] || ""}
            />
          </FormControl>

          <Box sx={{flex: 1}} />

          <Button
            variant="contained"
            color="info"
            startIcon={<FilterAlt />}
            sx={{ margin:'0 20px', padding: '10px 25px', alignSelf: 'center'}}
            onClick={handleApply}
          >
            Apply
          </Button>
         
          </Stack>
        </CardContent>
    </Card>
  )
}

export default FilterSction