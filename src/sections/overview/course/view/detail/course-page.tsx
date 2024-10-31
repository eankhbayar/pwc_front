// CourseDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent } from '@mui/material';

const CourseDetails: React.FC = () => {
    // Get the parameters from the URL
    const { cid, name, instructor } = useParams<{ cid: string; name: string; instructor: string }>();

    return (
        <Card>
            <Box p={3} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant="h4">{name}</Typography>
                <Typography variant="body1">Instructor: {instructor}</Typography>
            </Box>
            
            <Box p={3}>
                <Typography variant="body2">Course ID: {cid}</Typography>
                {/* You can add more details here as needed */}
            </Box>
        </Card>
    );
}

export default CourseDetails;
