import React from 'react';
import { Box, Button, Card, List, ListItem, ListItemIcon, ListItemText,Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';

const button_list = [
    {value: "Student Name", icon: "eva:book-open-outline"},
    {value: "Announcements", icon: "eva:book-open-outline"},
    {value: "My courses", icon: "eva:book-open-outline"},
    {value: "My grades", icon: "eva:book-open-outline"},
    {value: "Calendar", icon: "eva:book-open-outline"},
    {value: "Events registration", icon: "eva:book-open-outline"},
    {value: "To-do", icon: "eva:book-open-outline"},
    {value: "Dormitory", icon: "eva:book-open-outline"},
    {value: "Counselling", icon: "eva:book-open-outline"},
    {value: "Appeal", icon: "eva:book-open-outline"},
    {value: "IT services", icon: "eva:book-open-outline"},
    {value: "Feedback", icon: "eva:book-open-outline"}
]

const Sidebar: React.FC = () => {
    return (
        <Card sx={{ mr: 3, display:"flex", flexDirection:"column"}}>
            {
                button_list.map((item) => (
                    <Button
                        startIcon={<Iconify icon={item.icon}/>}
                        sx={{mt: 2}}
                    >
                        <Typography>
                            {item.value}
                        </Typography>
                    </Button>
                ))
            }
        </Card>
    );
};

export default Sidebar;