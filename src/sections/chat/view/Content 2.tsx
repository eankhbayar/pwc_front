import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Content: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Content Box Section */}
      <div style={{ marginBottom: '20px' }}>
        <Typography variant="h6">Overview</Typography>
        {/* <Typography variant="body2">
        </Typography> */}
      </div>

      {/* Accordion Section */}
      <div style={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary>
            <Typography variant="body1">{expanded === 'panel1' ? '-' : '+'} Exam 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Upcoming exam from course X</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary>
            <Typography variant="body1">{expanded === 'panel2' ? '-' : '+'} Exam 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Upcoming exam 2</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary>
            <Typography variant="body1">{expanded === 'panel3' ? '-' : '+'} Exam 3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Upcoming exam 3</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary>
            <Typography variant="body1">{expanded === 'panel4' ? '-' : '+'} Item 4</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Upcoming exam 4</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Content;