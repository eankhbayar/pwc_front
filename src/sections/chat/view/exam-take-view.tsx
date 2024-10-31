import React from 'react';
import {useState, useEffect, useCallback } from 'react';
import { Box, Button, Card, List, ListItem, ListItemIcon, ListItemText, Radio, FormControl, RadioGroup, FormControlLabel, Stepper, Step, StepLabel } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { Typography } from '@mui/material';


const button_list = [
    {value: "Dashboard", icon: "eva:globe-fill"},
    {value: "Student Name", icon: "eva:person-fill"},
    {value: "Exam", icon: "eva:book-open-outline"},
    {value: "My courses", icon: "eva:book-open-outline"},
    {value: "My grades", icon: "eva:book-open-outline"},
    {value: "Calendar", icon: "<eva:calendar-outline"},
    {value: "Events registration", icon: "eva:book-open-outline"},
    {value: "To-do", icon: "eva:book-open-outline"},
    {value: "Dormitory", icon: "eva:book-open-outline"},
    {value: "Counselling", icon: "eva:book-open-outline"},
    {value: "Appeal", icon: "eva:book-open-outline"},
    {value: "IT services", icon: "eva:book-open-outline"},
    {value: "Feedback", icon: "eva:book-open-outline"}
]


const steps = ['Question 1', 'Question 2', 'Question 4', 'Question 5', 'Question 6'];

const ExamTakeView: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectChoice, setSelectedChoice] = useState(Array(steps.length).fill(''));
    const [error, setError] = useState(false);
    const handleAns = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedOptions = [...selectChoice];
    updatedOptions[activeStep] = (event.target as HTMLInputElement).value;
    setSelectedChoice(updatedOptions);
    setError(false); // Reset error state when an option is selected
    };

    const handleNext = () =>{
    if(selectChoice[activeStep] !== ''){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    else{
        setError(true);
    }
    };

    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    return(
        <Card>
            <Typography variant="h3"> CSCI1200 Introduction to Python</Typography>
            <Box p={3} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant="h6" > 
                    {steps[activeStep]}
                </Typography>
                <Typography variant='h6' ml={2}>
                    Timer: 
                </Typography>
            </Box>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Box p={3}>
                <FormControl component="fieldset">
                    <RadioGroup value={selectChoice[activeStep]} onChange={handleAns}>
                        <FormControlLabel value="a" control={<Radio />} label="A. Option 1" />
                        <FormControlLabel value="b" control={<Radio />} label="B. Option 2" />
                        <FormControlLabel value="c" control={<Radio />} label="C. Option 3" />
                        <FormControlLabel value="d" control={<Radio />} label="D. Option 4" />
                    </RadioGroup>
                </FormControl>
                {error && (
                    <Typography variant="body2" color="error">
                        Select an answer before proceeding.
                    </Typography>
                )}
                <Box mt={3}>
                    {activeStep !== 0 && (
                        <Button variant="contained" onClick={handleBack}>
                            Back
                        </Button>
                    )}
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                </Box>
            </Box>
        </Card>
    ); 
};

export default ExamTakeView;