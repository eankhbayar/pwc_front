import type { IInvoice, IInvoiceTableFilters } from 'src/types/invoice';

import React, { useState, useCallback, useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { sumBy } from 'src/utils/helper';
import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';
import { _invoices, INVOICE_SERVICE_OPTIONS } from 'src/_mock';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { Typography, Slider, Alert } from "@mui/material";

import { InvoiceAnalytic } from '../invoice-analytic';
import { InvoiceTableRow } from '../invoice-table-row';
import { InvoiceTableToolbar } from '../invoice-table-toolbar';
import { InvoiceTableFiltersResult } from '../invoice-table-filters-result';



// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'invoiceNumber', label: 'Timestamp' },
  { id: 'createDate', label: 'Event' },
  { id: 'dueDate', label: 'Descriptione' },
  // { id: 'price', label: 'Amount' },
  // { id: 'sent', label: 'Sent', align: 'center' },
  // { id: 'status', label: 'Status' },
   { id: '' },
];

// ----------------------------------------------------------------------

export function InvoiceListView() {
  const theme = useTheme();

  const router = useRouter();

  const table = useTable({ defaultOrderBy: 'createDate' });

  const confirm = useBoolean();

  const [tableData, setTableData] = useState<IInvoice[]>(_invoices);

  const filters = useSetState<IInvoiceTableFilters>({
    name: '',
    service: [],
    status: 'all',
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.name ||
    filters.state.service.length > 0 ||
    filters.state.status !== 'all' ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const getInvoiceLength = (status: string) =>
    tableData.filter((item) => item.status === status).length;

  const getTotalAmount = (status: string) =>
    sumBy(
      tableData.filter((item) => item.status === status),
      (invoice) => invoice.totalAmount
    );

  const getPercentByStatus = (status: string) =>
    (getInvoiceLength(status) / tableData.length) * 100;

  const TABS = [
    {
      value: 'all',
      label: 'All',
      color: 'default',
      count: tableData.length,
    },
    {
      value: 'paid',
      label: 'Multiple Faces Detected',
      color: 'success',
      // count: getInvoiceLength('paid'),
      count: 3,
    },
    {
      value: 'pending',
      label: 'Face Not Detected',
      color: 'warning',
      // count: getInvoiceLength('pending'),
      count: 0,
    },
    {
      value: 'overdue',
      label: 'Eyes Off-Screen',
      color: 'error',
      // count: getInvoiceLength('overdue'),
      count: 5,
    },

  ] as const;

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.invoice.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.invoice.details(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );





  // const videoRef = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [progress, setProgress] = useState(0);
  // const [duration, setDuration] = useState(0);
  // const [warnings, setWarnings] = useState([
  //   { time: 30, message: "Warning: 3 unknown faces recognized" },
  //   { time: 90, message: "Warning: User left screen" },
  // ]);
  // const [activeWarning, setActiveWarning] = useState("");

  // // Play or pause the video
  // const togglePlayPause = () => {
  //   if (videoRef === null) return;
  //   if (videoRef.current === null) return;
  //   if (isPlaying) {
  //     videoRef.current.pause();
  //   } else {
  //     videoRef.current.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };

  // // Handle progress change when user interacts with slider
  // const handleProgressChange = (event, newValue) => {
  //   if (videoRef === null) return;
  //   if (videoRef.current === null) return;
  //   if (videoRef.current.currentTime === null) return;
  //   setProgress(newValue);
  //   videoRef.current.currentTime = (newValue / 100) * duration;
  //   updateWarning(newValue);
  // };

  // // Update progress as video plays
  // const handleTimeUpdate = () => {
  //   const currentTime = videoRef.current.currentTime;
  //   const progressValue = (currentTime / duration) * 100;
  //   setProgress(progressValue);
  //   updateWarning(progressValue);
  // };

  // // Set duration once video metadata is loaded
  // const handleLoadedMetadata = () => {
  //   setDuration(videoRef?.current?.duration);
  // };

  // // Check for warnings at the current progress
  // const updateWarning = (progressValue) => {
  //   const currentTime = (progressValue / 100) * duration;
  //   const warning = warnings.find((w) => Math.abs(currentTime - w.time) < 5);
  //   setActiveWarning(warning ? warning.message : "");
  // };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayPause = () => {
    if (videoRef.current) { // Ensure videoRef is not null
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (event: Event, newValue: number | number[]) => {
    if (videoRef.current && typeof newValue === "number") {
      const newTime = (newValue / 100) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(newValue);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };






  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Invoice', href: paths.dashboard.invoice.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.invoice.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New invoice
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card sx={{ mb: { xs: 3, md: 5 } }}>
          <Scrollbar sx={{ minHeight: 108 }}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <InvoiceAnalytic
                title="Multiple Faces Detected"
                subtitle="3 Times"
                percent={40}
                price={sumBy(tableData, (invoice) => invoice.totalAmount)}
                icon="stash:user-group"
                color={theme.vars.palette.info.main}
              />

              <InvoiceAnalytic
                title="Face Not Detected"
                subtitle="0 Times"
                percent={0}
                price={getTotalAmount('paid')}
                icon="bx:user-x"
                color={theme.vars.palette.success.main}
              />

              <InvoiceAnalytic
                title="Eyes Off-Screen"
                subtitle="5 Times"
                percent={30}
                price={getTotalAmount('pending')}
                icon="ri:eye-off-line"
                color={theme.vars.palette.warning.main}
              />

              <InvoiceAnalytic
                title="Suspicion Level"
                subtitle=""
                percent={80}
                price={getTotalAmount('overdue')}
                icon="material-symbols:warning-outline"
                color={theme.vars.palette.error.main}
                label="High"
              />
            </Stack>
          </Scrollbar>
        </Card>







        {/* 
        
        <Box sx={{ width: "100%", padding: 2 }}>
          
          <Slider
            value={progress}
            onChange={handleProgressChange}
            aria-labelledby="video-progress-bar"
            sx={{ marginBottom: 2 }}
          />

         
          <Box sx={{ position: "relative", textAlign: "center" }}>
            <video
              ref={videoRef}
              src="/path/to/video.mp4" // replace with your video path
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              width="100%"
              controls={false}
            />

            
            <Button
              onClick={togglePlayPause}
              variant="contained"
              sx={{
                position: "absolute",
                bottom: 10,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "darkblue",
              }}
            >
              {isPlaying ? <Iconify icon="ic:round-pause" /> : <Iconify icon="ic:round-play-arrow" />}
            </Button>
          </Box>

          
          {activeWarning && (
            <Alert severity="warning" sx={{ marginTop: 2 }}>
              {activeWarning}
            </Alert>
          )}
        </Box> 
        
        */}

<Box sx={{ width: "100%", margin: "0 auto", textAlign: "center", p: 2 }}>
      {/* Video Progress Bar */}
      <Slider
        value={progress}
        onChange={handleProgressChange}
        aria-labelledby="video-progress-bar"
        sx={{ marginBottom: 2 }}
      />

      {/* Video Element */}
      <Box sx={{ position: "relative" }}>
        <video
          ref={videoRef}
          src="/path/to/video.mp4" // Replace with your video source
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          width="100%"
          controls={false}
        >
          {/* Track element for captions */}
          <track
            kind="captions"
            srcLang="en"
            src="/path/to/captions.vtt" // Replace with actual path to captions file
            label="English"
            default
          />
        </video>

        {/* Play/Pause Button */}
        <Button
          onClick={togglePlayPause}
          variant="contained"
          sx={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "darkblue",
            color: "white",
            "&:hover": {
              backgroundColor: "navy",
            },
          }}
        >
          {isPlaying ? <Iconify icon="ic:round-pause" /> : <Iconify icon="ic:round-play-arrow" />}
        </Button>
      </Box>
    </Box>








        <Card>
          <Tabs
            value={filters.state.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                iconPosition="end"
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                      'soft'
                    }
                    color={tab.color}
                  >
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>

          {/* <InvoiceTableToolbar
            filters={filters}
            dateError={dateError}
            onResetPage={table.onResetPage}
            options={{ services: INVOICE_SERVICE_OPTIONS.map((option) => option.name) }}
          /> */}

          {canReset && (
            <InvoiceTableFiltersResult
              filters={filters}
              onResetPage={table.onResetPage}
              totalResults={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) => {
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                );
              }}
              action={
                <Stack direction="row">
                  <Tooltip title="Sent">
                    <IconButton color="primary">
                      <Iconify icon="iconamoon:send-fill" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Download">
                    <IconButton color="primary">
                      <Iconify icon="eva:download-outline" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Print">
                    <IconButton color="primary">
                      <Iconify icon="solar:printer-minimalistic-bold" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />

            <Scrollbar sx={{ minHeight: 444 }}>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <InvoiceTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}


// ----------------------------------------------------------------------

type ApplyFilterProps = {
  dateError: boolean;
  inputData: IInvoice[];
  filters: IInvoiceTableFilters;
  comparator: (a: any, b: any) => number;
};

function applyFilter({ inputData, comparator, filters, dateError }: ApplyFilterProps) {
  const { name, status, service, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (invoice) =>
        invoice.invoiceNumber.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        invoice.invoiceTo.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((invoice) => invoice.status === status);
  }

  if (service.length) {
    inputData = inputData.filter((invoice) =>
      invoice.items.some((filterItem) => service.includes(filterItem.service))
    );
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((invoice) => fIsBetween(invoice.createDate, startDate, endDate));
    }
  }

  return inputData;
}

