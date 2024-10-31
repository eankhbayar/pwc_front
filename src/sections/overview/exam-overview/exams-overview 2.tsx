import React from 'react';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
//import {useHistory} from 'react-router-dom';

interface Info{
    subject: string;
    cid: string;
    marks: number;
    questions: number;
    time: number;
}

const exams : Info[] = [
    {subject: 'Introduction to Python', cid: 'CSCI 1200', marks: 100, questions: 26, time:105 },
    {subject: 'Introduction to Database system', cid: 'CSCI 3170', marks: 100, questions: 15, time:120 },
    {subject: 'Introduction to Operating Systems', cid: 'CSCI 3150', marks: 100, questions: 10, time:120 },
    {subject: 'Fundamentals of Electric Circuits', cid: 'ELEG 2202', marks: 100, questions: 30, time:120 },
    {subject: 'In Dialogue with Nature', cid: 'UGFN 1001', marks: 100, questions: 50, time:120 },
    {subject: 'History of China Past and Present', cid: 'UGEA 1350', marks: 100, questions: 50, time:120 },
];


const ExamOverview: React.FC = () => {
    // const history = useHistory();

    // const handleExamClick = (examCid: string) => {
    //     // Navigate to the page for the clicked exam
    //     history.push(`/exam/${examCid}`);
    // };
    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography variant='h3'> Exams</Typography>
                    <br/>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor: 'transparent'}}>Course</TableCell>
                                    <TableCell style={{ backgroundColor: 'transparent' }}>Marks</TableCell>
                                    <TableCell style={{ backgroundColor: 'transparent' }}>Questions</TableCell>
                                    <TableCell style={{ backgroundColor: 'transparent' }}>Time (minutes) </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {exams.map((exam, index) => (
                                    <TableRow key ={index}>
                                        {/* <TableCell>
                                            <a href="#" onClick={() => handleExamClick(exam.cid)}>{exam.cid} {exam.subject}</a>
                                        </TableCell> */}
                                        <TableCell>{exam.cid} {exam.subject} </TableCell>
                                        <TableCell>{exam.marks} </TableCell>
                                        <TableCell>{exam.questions} </TableCell>
                                        <TableCell>{exam.time} </TableCell>
                                    </TableRow>
                                ))} 
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ExamOverview;

