import type { IJobItem } from 'src/types/job';

import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';
import  Box from '@mui/material/Box';
import { useState } from 'react';
import { Button } from "@mui/material";
import { Link } from "react-router-dom"; 

// ----------------------------------------------------------------------

type Props = {
  job?: IJobItem;
};

export function JobDetailsContent({ job }: Props) {
  const [showContent, setShowContent] = useState(false);

  const renderExamInfo = (
    <Card sx={{ p: 3, gap: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6">Exam Information</Typography>
      {[
        {
          label: 'Exam Title:',
          value: fDate(job?.createdAt),
          icon: <Iconify icon="solar:bill-list-bold" />,
        },
        {
          label: 'Exam Date:',
          value: fDate(job?.createdAt),
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Start Time:',
          value: fDate(job?.createdAt),
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'End Time:',
          value: fDate(job?.expiredDate),
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Time Allowed:',
          value: job?.salary.negotiable ? 'Negotiable' : fCurrency(job?.salary.price),
          icon: <Iconify icon="solar:bell-bing-bold" />,
        },
      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{ typography: 'body2', color: 'text.secondary', mb: 0.5 }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.primary',
              typography: 'subtitle2',
            }}
          />
        </Stack>
      ))}

    </Card>
  );

  const renderExamDetails = (
    <Card sx={{ p: 3, gap: 2, display: 'flex', flexDirection: 'column' }}>

      <Typography variant="h6">Exam Details</Typography>
      <Typography variant="body2">exam?.examRule</Typography>
      
      {[
        {
          label: 'Exam Scope:',
          value: fDate(job?.createdAt),
          icon: <Iconify icon="solar:notes-bold" />,
        },
        {
          label: 'Passiong Criteria:',
          value: fDate(job?.createdAt),
          icon: <Iconify icon="solar:verified-check-bold" />,
        },
        {
          label: 'Number of Questions:',
          value: fDate(job?.createdAt),
          icon: <Iconify icon="fluent:calendar-agenda-24-regular" />,
        },

      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{ typography: 'body2', color: 'text.secondary', mb: 0.5 }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.primary',
              typography: 'subtitle2',
            }}
          />
        </Stack>
      ))}

    </Card>
  );
  

  const renderDeviceRequirements = (
    <Card sx={{ p: 3, gap: 1, display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={1}>
        <Typography variant="h6">Device Requirements</Typography>
        <Typography variant="body1">To take this exam, please ensure that your device meets the following minimum requirements:</Typography>
          <Grid container spacing={2} sx={{display: 'flex', flexDirection: 'row'}}>
          <Grid md={6}>
          <Typography variant='subtitle1'>1. Hardware:</Typography>
            <ul>
              <li>- A functioning webcam capable of 720p or higher resolution.</li>
              <li>- A microphone for audio monitoring.</li>
              <li>- At least 4GB of RAM.</li>
              <li>- Stable internet connection with a minimum speed of 1 Mbps.</li>
            </ul>
            <br />
            <Typography variant='subtitle1'>2. Browser:</Typography>
            <ul>
              <li>- Recommended: Latest versions of Google Chrome or Mozilla Firefox.</li>
              <li>- Ensure that your browser has permission to access your camera and microphone.</li>
            </ul>
          </Grid>
          <Grid md={6}>
          <Typography variant='subtitle1'>3. Operating System:</Typography>
            <ul>
              <li>- Windows 10 or higher / macOS 10.13 or higher.</li>
            </ul> 
            <br />
            <Typography variant='subtitle1'>4. Screen Resolution:</Typography>
            <ul>
              <li>- Minimum screen resolution of 1024 x 768.</li>
            </ul>
            <br />
            <Typography variant='subtitle1'>5. Software:</Typography>
            <ul>
              <li>- The browser must have JavaScript enabled.</li>
              <li>- Disable any pop-up blockers or browser extensions that could interfere with the exam software.</li>
            </ul>
          </Grid>
          </Grid>
      </Stack>
    </Card>

  );
  
  const renderBiometricConsent = (
    <Card sx={{ p: 3, gap: 1, display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={1}>
        <Typography variant="h6">Biometric Consent</Typography>
        <Typography variant="body1">By participating in this exam, you acknowledge and agree to the following biometric authentication terms:</Typography>
        <ul>
          <li>- Face Recognition: The exam system will use your device’s camera to recognize and monitor your face throughout the exam to verify your identity and detect potential cheating attempts.</li>
          <li>- Eye Tracking: The system will track your eye movements to ensure you remain focused on the exam content and are not engaging in suspicious activities.</li>
        </ul>
        <br />
        <Typography variant="h6">Instructions for Biometrics Setup</Typography>
        <Typography variant="body1">To ensure the integrity of the exam, we will use biometric authentication methods during the exam. Please carefully follow the instructions below to set up your biometric authentication before starting the exam:</Typography>
        <Grid container spacing={2} sx={{display: 'flex', flexDirection: 'row'}}>
          <Grid md={2}>
          <Iconify icon="iconoir:face-id" sx={{ width: "70%", height: "auto"}}/>
          </Grid>
          <Grid md={10}>
            <Typography variant='subtitle1'>1. Face Recognition Setup:</Typography>
              <ul>
                <li>- Ensure your webcam is enabled and properly functioning.</li>
                <li>- When prompted, position yourself directly in front of the camera. Make sure your face is clearly visible and the environment is well-lit.</li>
                <li>- Follow the on-screen prompts to complete face recognition verification.</li>
              </ul>
              <br />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{display: 'flex', flexDirection: 'row'}}>
          <Grid md={10}>
            <Typography variant='subtitle1'>1. Eye-Tracking Setup:</Typography>
              <ul>
                <li>- Ensure your webcam can capture your eye movements. Keep your head still and ensure your eyes are visible to the camera throughout the exam.</li>
                <li>- Avoid looking away from the screen for extended periods.</li>
              </ul>
              <br />
          </Grid>
          <Grid md={2}>
          <Iconify icon="solar:eye-broken" sx={{ width: "70%", height: "auto"}}/>
          </Grid>
        </Grid>
        <Typography variant="body1">Before the exam begins, you will go through a system check to verify your camera, microphone, and eye-tracking system are functioning correctly. If any issues arise, follow the troubleshooting steps or contact support immediately.</Typography>
        
      </Stack>
    </Card>
  );

  const renderPreExamGuidelines = (
    <Card sx={{ p: 3, gap: 1, display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={1}>
        <Typography variant="h6">Pre-Exam Guidelines</Typography>
        <Typography variant="body1">Please carefully read the following guidelines to ensure a smooth exam experience:</Typography>
        <br />
          <Typography variant='subtitle1'>1. Location and Setup:</Typography>
            <ul>
              <li>- Choose a quiet, well-lit environment with minimal distractions.</li>
              <li>- Ensure that there are no other individuals or pets visible in the camera frame during the exam.</li>
            </ul>
            <br />
            <Typography variant='subtitle1'>2. Prohibited Items:</Typography>
            <ul>
              <li>- No external devices (phones, tablets, smartwatches, or other electronic devices) are allowed during the exam.</li>
              <li>- No study materials, books, or notes are allowed unless explicitly stated..</li>
            </ul>
            <br />
          <Typography variant='subtitle1'>3. Camera Position:</Typography>
            <ul>
              <li>- Position your camera so that your entire face is visible. The system may pause or terminate the exam if it cannot detect your face or if it detects multiple faces in the frame.</li>
            </ul> 
            <br />
            <Typography variant='subtitle1'>4. Internet Connection:</Typography>
            <ul>
              <li>- Ensure that your internet connection is stable throughout the exam.</li>
              <li>- If you lose connection, attempt to reconnect within 5 minutes. Extended disconnections may lead to exam termination.</li>
            </ul>
            <br />
            <Typography variant='subtitle1'>5. Breaks:</Typography>
            <ul>
              <li>- No breaks are allowed during the exam. Ensure you are seated comfortably and have everything you need before the exam begins.</li>
            </ul>
            <br />
            <Typography variant='subtitle1'>6. Suspected Cheating:</Typography>
            <ul>
              <li>- The biometric monitoring system will flag any suspicious behavior, including looking away from the screen, talking aloud, or any face-detection failures. Suspicious behavior will be reviewed after the exam, and any confirmed cases of cheating may result in disqualification.</li>
            </ul>
            <br />
            <Typography variant='subtitle1'>7. Exam Interface:</Typography>
            <ul>
              <li>- Once the exam starts, you will not be allowed to switch to any other tabs, applications, or devices. Any attempt to do so will trigger a warning.</li>
              <li>- Keep your attention on the exam interface at all times. The eye-tracking system will detect if you look away for extended periods.</li>
            </ul>

      </Stack>
    </Card>

  );

  const renderSupportContactInformation = (
    <Card sx={{ p: 3, gap: 1, display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={1}>
        <Typography variant="h6">Support Contact Information</Typography>
        <Typography variant="body1">If you experience any technical issues during the exam, please contact our support team immediately. We are available to assist you with any biometric or technical difficulties you may encounter.</Typography>
        <Typography variant='subtitle1'>- Technical Support Email: support@examportal.com</Typography>
        <Typography variant='subtitle1'>- Phone: +1-800-123-4567</Typography>
        <Typography variant='subtitle1'>- Live Chat: Available on the exam interface from 9:00 AM to 6:00 PM (local time).:</Typography>


      </Stack>
    </Card>

  );

  const renderContent = (
    <Card sx={{ p: 3, gap: 1, display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={1}>
        <Typography variant="h6">Exam Information</Typography>
        <Typography variant="subtitle1" color="#7B7B7B">  Exam Title:</Typography>
      </Stack>


      <Markdown children={job?.content} />

      <Stack spacing={2}>
        <Typography variant="h6">Skills</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {job?.skills.map((skill) => <Chip key={skill} label={skill} variant="soft" />)}
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6">Benefits</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {job?.benefits.map((benefit) => <Chip key={benefit} label={benefit} variant="soft" />)}
        </Stack>
      </Stack>
    </Card>
  );

  const renderOverview = (
    <Card sx={{ p: 3, gap: 2, display: 'flex', flexDirection: 'column' }}>
      {[
        {
          label: 'Date posted',
          value: fDate(job?.createdAt),
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Expiration date',
          value: fDate(job?.expiredDate),
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Employment type',
          value: job?.employmentTypes,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Offered salary',
          value: job?.salary.negotiable ? 'Negotiable' : fCurrency(job?.salary.price),
          icon: <Iconify icon="solar:wad-of-money-bold" />,
        },
        {
          label: 'Experience',
          value: job?.experience,
          icon: <Iconify icon="carbon:skill-level-basic" />,
        },
      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{ typography: 'body2', color: 'text.secondary', mb: 0.5 }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.primary',
              typography: 'subtitle2',
            }}
          />
        </Stack>
      ))}
    </Card>
  );

  const renderCompany = (
    <Paper variant="outlined" sx={{ p: 3, mt: 3, gap: 2, borderRadius: 2, display: 'flex' }}>
      <Avatar
        alt={job?.company.name}
        src={job?.company.logo}
        variant="rounded"
        sx={{ width: 64, height: 64 }}
      />

      <Stack spacing={1}>
        <Typography variant="subtitle1">{job?.company.name}</Typography>
        <Typography variant="body2">{job?.company.fullAddress}</Typography>
        <Typography variant="body2">{job?.company.phoneNumber}</Typography>
      </Stack>
    </Paper>
  );
  

  return (
    <>
    <Grid container spacing={3}>
      <Grid xs={12} md={6}>
        {renderExamInfo}
      </Grid>
      <Grid xs={12} md={6}>
        {renderExamDetails}
      </Grid>
      <Grid xs={12} md={12}>
        {renderDeviceRequirements}
      </Grid>
      <Grid xs={12} md={12}>
        {renderBiometricConsent}
      </Grid>
      <Grid xs={12} md={12}>
        {renderPreExamGuidelines}
      </Grid>
      <Grid xs={12} md={12}>
        {renderSupportContactInformation}
      </Grid>
    </Grid>

    <Button
    component={Link}
    to="/dashboard/ecommerce" // Link to the exam page
    variant="contained"
    sx={{
      position: "fixed",
      bottom: 16, // 16px from the bottom
      left: "60%", // Center horizontally
      transform: "translateX(-50%)", // Adjust to center precisely
      backgroundColor: "darkblue", // Dark blue background
      color: "white", // White text color
      fontSize: "18px", // Adjust font size as desired
      width: "500px",
      padding: "10px 20px", // Add padding for a larger button
      "&:hover": {
        backgroundColor: "navy", // Darker blue on hover
      },
    }}
    >
    Start Exam
    </Button>
</>


  );
}
