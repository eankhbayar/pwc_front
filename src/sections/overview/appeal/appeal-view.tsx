import React, { useState } from 'react';
import { Box, Button, Card, Grid, Typography,CardContent,FormControl, RadioGroup, FormControlLabel, Radio, TextField, MenuItem, Select} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

const exams = [
    {subject: 'Introduction to Python', cid: 'CSCI 1200'},
    {subject: 'Introduction to Database system', cid: 'CSCI 3170'},
    {subject: 'Introduction to Operating Systems', cid: 'CSCI 3150'},
    {subject: 'Fundamentals of Electric Circuits', cid: 'ELEG 2202'},
    {subject: 'In Dialogue with Nature', cid: 'UGFN 1001'},
    {subject: 'History of China Past and Present', cid: 'UGEA 1350'},
];

const Appeal : React.FC =() =>{
    const [selectedExam, setSelectedExam] = useState('');
    const [appealMessage, setAppealMessage] = useState('');
    const handleExamChange = (event: SelectChangeEvent<string>) => {
        setSelectedExam(event.target.value);
    };
    const [errorMessage, setErrorMessage] = useState('');

    const handleAppealMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAppealMessage(event.target.value);
    };

    const handleSubmit = () => {
        if (appealMessage.trim() === '') {
            setErrorMessage('Please enter an appeal message.');
            return;
        }
        console.log('Selected Exam:', selectedExam);
        console.log('Appeal Message:', appealMessage);
        setErrorMessage('');
    };
    return (
        <Box mt={2}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Appeal Form</Typography>
                    <br />
                    <FormControl fullWidth>
                        <Select
                            value={selectedExam}
                            onChange={handleExamChange}
                            displayEmpty
                            fullWidth
                            variant="outlined"
                        >
                            <MenuItem value="" disabled>Select Recent Exam</MenuItem>
                            {exams.map((exam, index) => (
                                <MenuItem key={index} value={exam.cid}>{exam.subject}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <TextField
                        label="Appeal Message"
                        multiline
                        rows={10}
                        fullWidth
                        value={appealMessage}
                        onChange={handleAppealMessageChange}
                        variant="outlined"
                        margin="normal"
                        required
                        error={errorMessage !== ''}
                        helperText={errorMessage}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                </CardContent>
            </Card>
        </Box>
    );
}
export default Appeal;