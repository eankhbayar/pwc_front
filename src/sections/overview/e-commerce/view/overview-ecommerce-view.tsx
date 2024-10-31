
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
import { fCurrency, fData } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

import { svgColorClasses } from 'src/components/svg-color';


import { DashboardContent } from 'src/layouts/dashboard';
import { MotivationIllustration } from 'src/assets/illustrations';
import {
  _ecommerceNewProducts,
  _ecommerceBestSalesman,
  _ecommerceSalesOverview,
  _ecommerceLatestProducts,
} from 'src/_mock';

import { useMockedUser } from 'src/auth/hooks';

import chart from 'src/pages/components/extra/chart';
import { Chart, useChart } from 'src/components/chart';

import { EcommerceWelcome } from '../ecommerce-welcome';
import { EcommerceNewProducts } from '../ecommerce-new-products';
import { EcommerceYearlySales } from '../ecommerce-yearly-sales';
import { EcommerceBestSalesman } from '../ecommerce-best-salesman';
import { EcommerceSaleByGender } from '../ecommerce-sale-by-gender';
import { EcommerceSalesOverview } from '../ecommerce-sales-overview';
import { EcommerceWidgetSummary } from '../ecommerce-widget-summary';
import { EcommerceLatestProducts } from '../ecommerce-latest-products';
import { EcommerceCurrentBalance } from '../ecommerce-current-balance';
import { AppWidget } from '../ecommerce-widget';




// ----------------------------------------------------------------------

type Props = {
  job?: IJobItem;
};

export function OverviewEcommerceView({ job }: Props) {
  const { user } = useMockedUser();

  const theme = useTheme();

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    stroke: { width: 0 },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: "green", opacity: 1 },
          { offset: 100, color: "lightgreen", opacity: 1 },
        ],
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: 40,
        startAngle: -90,
        endAngle: 90,
        hollow: { margin: -24 },
        track: { margin: -24 },
        dataLabels: {
          name: { offsetY: 8 },
          value: { offsetY: -36 },
          total: {
            label: `Time Used: 1 h 25 mins`,
            color: theme.vars.palette.text.disabled,
            fontSize: theme.typography.caption.fontSize as string,
            fontWeight: theme.typography.caption.fontWeight,
          },
        },
      },
    },
    // ...chart.options,
  });

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={7}>
          <EcommerceWelcome
            title={`Congratulations 🎉  \n ${user?.displayName}`}
            description="You passed the exam!"
            feedback="You did a great job! Still need more practical coding  exercise."
            img={<MotivationIllustration hideBackground />}

          />
        </Grid>

        <Grid xs={12} md={5}>
          {/* <EcommerceNewProducts list={_ecommerceNewProducts} /> */}
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

        </Grid>

        <Grid xs={12} md={4}>
          <AppWidget
            title="Marks"
            total={75}
            icon="material-symbols:readiness-score-outline"
            chart={{
              series: 75,
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidget
            title="Rank"
            total={13}
            icon="solar:ranking-line-duotone"
            chart={{
              series: 81,
              colors: [theme.vars.palette.info.light, theme.vars.palette.info.main],
            }}
            sx={{ bgcolor: 'info.dark', [`& .${svgColorClasses.root}`]: { color: 'info.light' } }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidget
            title="correctness (/45)"
            total={32}
            icon="icon-park-outline:correct"
            chart={{
              series: 78,
              colors: [theme.vars.palette.secondary.light, theme.vars.palette.secondary.main],
            }}
            sx={{ bgcolor: 'secondary.dark', [`& .${svgColorClasses.root}`]: { color: 'secondary.light' } }}
          />
        </Grid>


        {/* <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Product sold"
            percent={2.6}
            total={765}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Total balance"
            percent={-0.1}
            total={18765}
            chart={{
              colors: [theme.vars.palette.warning.light, theme.vars.palette.warning.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Sales profit"
            percent={0.6}
            total={4876}
            chart={{
              colors: [theme.vars.palette.error.light, theme.vars.palette.error.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 75, 70, 50, 28, 7, 64],
            }}
          />
        </Grid> */}

        <Grid xs={12} md={6} lg={4}>
          <EcommerceSaleByGender
            title="Score per Question Types"
            total={75}
            chart={{
              series: [
                { label: 'MC', value: 95 },
                { label: 'Short Questions', value: 75 },
                { label: 'Coding', value: 60 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <EcommerceYearlySales
            title="Exam Statistic"
            subheader="No. of Respondent: 150  Mean: 80  SD:1.5"
            chart={{
              categories: [
                '10',
                '20',
                '30',
                '40',
                '50',
                '60',
                '70',
                '80',
                '90',
                '100',
              ],
              series: [

                {
                  name: 'Final Exam',
                  data: [
                    {
                      name: 'Mark Distribution',
                      data: [0, 0, 2, 7, 10, 21, 43, 60, 15, 1],
                    },

                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <EcommerceSalesOverview
            title="Score Per Topics"
            subheader=""
            data={[
              {
                label: 'Operators and Expression',
                value: 90,
                totalAmount: 9,
              },
              {
                label: 'Variable and Data Type',
                value: 95,
                totalAmount: 6,
              },
              {
                label: 'Control Flow',
                value: 91,
                totalAmount: 10,
              },
              {
                label: 'Functions',
                value: 80,
                totalAmount: 11,
              },
              {
                label: 'Data Structures',
                value: 70,
                totalAmount: 15,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
        <Card sx={{ p: 3, gap: 1, display: 'flex', flexDirection: 'column' }}>
          {/* <EcommerceCurrentBalance
            title="Current balance"
            earning={25500}
            refunded={1600}
            orderTotal={287650}
            currentBalance={187650}
          /> */}
          <Chart
            type="radialBar"
            series={[76]}
            options={chartOptions}
            width={240}
            height={240}
            sx={{ mx: 'auto' }}
          />
          <Grid container spacing={2} sx={{display: 'flex', flexDirection: 'row'}}>
          <Grid md={6}>
            <Typography variant='body2'>Start Time: 09:01 am</Typography> 
          </Grid>
          <Grid md={6}>
          <Typography variant='body2'>End Time: 10:26 am</Typography>
          </Grid>
          </Grid>
          </Card>
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <EcommerceBestSalesman
            title="Best salesman"
            tableData={_ecommerceBestSalesman}
            headLabel={[
              { id: 'name', label: 'Seller' },
              { id: 'category', label: 'Product' },
              { id: 'country', label: 'Country', align: 'center' },
              { id: 'totalAmount', label: 'Total', align: 'right' },
              { id: 'rank', label: 'Rank', align: 'right' },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <EcommerceLatestProducts title="Latest products" list={_ecommerceLatestProducts} />
        </Grid> */}
      </Grid>
    </DashboardContent>
  );
}
