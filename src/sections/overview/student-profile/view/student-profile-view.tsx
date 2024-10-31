import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar} from '@mui/material';

interface Student{
    name: string;
    sid: number;
    email: string;
    major: string;
    profilePic: string;
}
const student: Student = {
    name: 'John Doe',
    sid: 2199834387330,
    email: 'johndoe@cuhksample.edu.hk',
    major: 'Computer Science',
    profilePic: '_mock.image.avatar(24),'
};

const StudentProfile: React.FC =() => {
    return(
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} textAlign='center'>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar alt={student.name} src={student.profilePic} style={{ width: 120, height: 120 }} />
                    </Box>
                    <Typography variant="h5">{student.name}</Typography>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Basic Information</Typography>
                                <Typography variant='body1'>Full Name: {student.name}</Typography>
                                <Typography variant="body1">Email: {student.email}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                        <br />
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                            <Typography variant='h6'> Additional information</Typography>
                            <Typography variant="body1">Preferred Name: John</Typography>
                            <Typography variant="body1">Year: 3</Typography>
                            <Typography variant="body1">Major: {student.major}</Typography>
                            <Typography variant="body1">Website: Add your website</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant='h6'>Contact Information</Typography>
                                <Typography variant='body1'>Phone Number: Add a phone number</Typography>
                            </CardContent>
                            
                        </Card>
                    </Grid>
                        <br />
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant='h6'>System Settings</Typography>
                                <Typography variant='body1'>Language: Default (English(United States))</Typography>
                                <Typography variant='body1'> Privacy Settings: Only administrators can see my profile</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant='h6'> Job information</Typography>
                                <Typography variant="body1">Job Title: Chairman of CUHK</Typography>
                                <Typography variant="body1">Department: Computer Science</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default StudentProfile;