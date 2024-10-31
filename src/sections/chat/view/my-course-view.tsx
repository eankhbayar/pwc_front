import React from 'react';
import { Box, ButtonBase, Card, Grid, Typography,CardContent } from '@mui/material';

interface Course {
    cid: number;
    name: string;
    instructor: string;
    availability : string;
}

{/* Im pretty much copying the blackboard format */}

const courses: Course[] = [
    { cid: 1, name: 'Mathematics', instructor: 'Prof. Smith', availability: 'Open'},
    { cid: 2, name: 'History', instructor: 'Prof. Johnson', availability: 'Open'},
    { cid: 3, name: 'Science', instructor: 'Prof. Williams', availability: 'Open'},
    { cid: 4, name: 'Chinese', instructor: 'Prof. Lee', availability: 'Open'},
    { cid: 5, name: 'English', instructor: 'Prof. Bailey', availability: 'Open'},
    { cid: 6, name: 'Computer Science', instructor: 'Prof. Khan', availability: 'Open'},
];
const MyCourse : React.FC = () => {

    return(
        <Grid>
            <Box>
                <Typography textAlign='left' fontSize='2rem'>
                    Courses
                    <br />
                    <hr />
                </Typography>
            </Box>
            <br />
            <style>
                
            </style>
            <Box>
            <Typography variant='h6'>
                All Courses
            </Typography>
            <br />
                <Grid container spacing={2}>
                    {courses.map((course) => (
                        <Grid item key={course.cid} xs={12} sm={6} md={4}>
                            <Card style={{ height: '100%', display: 'flex' }}>
                            <ButtonBase style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <CardContent style={{flex: 1}}>
                                        <Typography variant="h6" gutterBottom textAlign='left'>{course.name}</Typography>
                                        <Typography variant="body2" textAlign='left'>{course.availability} | Instructor: {course.instructor}</Typography>
                                    </CardContent>
                                </ButtonBase>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Grid>        
    );

};

export default MyCourse;