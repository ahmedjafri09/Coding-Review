import React, { useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { debounce } from 'lodash'
import DatePicker from 'react-date-picker'
import { useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CBadge,
  CTooltip,
  CFormInput,
  CButton,
} from '@coreui/react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import API from 'src/libs/axios'
import { onError } from 'src/libs/errorLib'
import { ddmmyyFormat, defaultDateTime } from 'src/libs/common'

const Services = () => {
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [totalRecords, setTotalRecords] = useState(0)
  const pageSize = 10
  const navigate = useNavigate()

  const getOrders = async (page, searchKeyword, startDate, endDate) => {
    try {
      const res = await API.get('orders', {
        params: {
          search: searchKeyword,
          page: page,
          startDate: startDate ? defaultDateTime(startDate) : null,
          endDate: endDate ? defaultDateTime(endDate) : null,
          limit: pageSize,
        },
      })
      res?.orders && setOrders(res.orders)
      res?.totalRecords && setTotalRecords(res.totalRecords)
    } catch (error) {
      onError(error)
    }
  }

  const getDelayedOrders = useCallback(
    debounce((page, searchKeyword, startDate, endDate) => {
      getOrders(page, searchKeyword, startDate, endDate)
    }, 750),
    [],
  )

  useEffect(() => {
    getDelayedOrders(page, search, startDate, endDate)
  }, [page, search, endDate])

  const columns = [
    {
      field: 'bookingId',
      headerName: 'Booking #',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (params) => {
        let result = []
        if (params.row.bookingId) {
          result.push(params.row.bookingId)
        }
        return result.join(', ')
      },
      renderHeader: () => <strong>Booking #</strong>,
      renderCell: (params) => (
        <CTooltip content={params.row.bookingId}>
          <div
            className="MuiDataGrid-cellContent"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              const bookingId = params?.row?.bookingId?.split('-')[1]
              navigate(`/services/edit/${bookingId}`)
            }}
          >
            {params.row.bookingId}
          </div>
        </CTooltip>
      ),
    },
    {
      field: 'bookingDate',
      headerName: 'Date',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (params) => {
        let result = []
        if (params.row.bookingDate) {
          result.push(params.row.bookingDate)
        }
        return result.join(', ')
      },
      renderHeader: () => <strong>Date</strong>,
      renderCell: (params) => (
        <CTooltip content={params.row.bookingDate}>
          <div className="MuiDataGrid-cellContent">{ddmmyyFormat(params.row.bookingDate)}</div>
        </CTooltip>
      ),
    },
    {
      field: 'bookingTime',
      headerName: 'Time',
      flex: 0.75,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (params) => {
        let result = []
        if (params.row.bookingTime) {
          result.push(params.row.bookingTime)
        }
        return result.join(', ')
      },
      renderHeader: () => <strong>Time</strong>,
      renderCell: (params) => (
        <CTooltip content={params.row.bookingTime}>
          <div className="MuiDataGrid-cellContent">{params.row.bookingTime}</div>
        </CTooltip>
      ),
    },
    {
      field: 'airportName',
      headerName: 'Airport',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (params) => {
        let result = []
        if (params.row.airportName) {
          result.push(params.row.airportName)
        }
        return result.join(', ')
      },
      renderHeader: () => <strong>Airport</strong>,
      renderCell: (params) => (
        <CTooltip content={params.row.airportName}>
          <div className="MuiDataGrid-cellContent">{params.row.airportName}</div>
        </CTooltip>
      ),
    },
    {
      field: 'terminal',
      headerName: 'Terminal',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (params) => {
        let result = []
        if (params.row.terminal) {
          result.push(params.row.terminal)
        }
        return result.join(', ')
      },
      renderHeader: () => <strong>Terminal</strong>,
      renderCell: (params) => (
        <CTooltip content={params.row.terminal}>
          <div className="MuiDataGrid-cellContent">{params.row.terminal}</div>
        </CTooltip>
      ),
    },
    {
      field: 'meetGreetType',
      headerName: 'Type',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (params) => {
        let result = []
        if (params.row.meetGreetType) {
          result.push(params.row.meetGreetType)
        }
        return result.join(', ')
      },
      renderHeader: () => <strong>Type</strong>,
      renderCell: (params) => (
        <CTooltip content={params.row.meetGreetType}>
          <div className="MuiDataGrid-cellContent">{params.row.meetGreetType}</div>
        </CTooltip>
      ),
    },
    {
      field: 'paxName',
      headerName: 'Pax Name',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (params) => {
        let result = []
        if (params.row.paxName) {
          result.push(params.row.paxName)
        }
        return result.join(', ')
      },
      renderHeader: () => <strong>Pax Name</strong>,
      renderCell: (params) => (
        <CTooltip content={params.row.paxName}>
          <div className="MuiDataGrid-cellContent">{params.row.paxName}</div>
        </CTooltip>
      ),
    },
    {
      field: 'numberOfPax',
      headerName: 'Pax',
      flex: 0.5,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (params) => {
        let result = []
        if (params.row.numberOfPax) {
          result.push(params.row.numberOfPax)
        }
        return result.join(', ')
      },
      renderHeader: () => <strong>Pax</strong>,
      renderCell: (params) => (
        <CTooltip content={params.row.numberOfPax}>
          <div className="MuiDataGrid-cellContent">{params.row.numberOfPax}</div>
        </CTooltip>
      ),
    },
    {
      field: 'bags',
      headerName: 'Bags',
      flex: 0.5,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (params) => {
        let result = []
        if (params.row.bags) {
          result.push(params.row.bags)
        }
        return result.join(', ')
      },
      renderHeader: () => <strong>Bags</strong>,
      renderCell: (params) => (
        <CTooltip content={params.row.bags}>
          <div className="MuiDataGrid-cellContent">{params.row.bags}</div>
        </CTooltip>
      ),
    },
    {
      field: 'arrivalFlightNum',
      headerName: 'Arrival Flight',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (params) => {
        let result = []
        if (params.row.arrivalFlightNum) {
          result.push(params.row.arrivalFlightNum)
        }
        return result.join(', ')
      },
      renderHeader: () => <strong>Arrival Flight</strong>,
      renderCell: (params) => (
        <CTooltip content={params.row.arrivalFlightNum}>
          <div className="MuiDataGrid-cellContent">{params.row.arrivalFlightNum}</div>
        </CTooltip>
      ),
    },
    {
      field: 'departureFlightNum',
      headerName: 'Departure Flight',
      flex: 1.1,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (params) => {
        let result = []
        if (params.row.departureFlightNum) {
          result.push(params.row.departureFlightNum)
        }
        return result.join(', ')
      },
      renderHeader: () => <strong>Departure Flight</strong>,
      renderCell: (params) => (
        <CTooltip content={params.row.departureFlightNum}>
          <div className="MuiDataGrid-cellContent">{params.row.departureFlightNum}</div>
        </CTooltip>
      ),
    },
    {
      field: 'STATUS',
      headerName: 'Status',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (params) => {
        let result = []
        if (params.row.status) {
          result.push(params.row.status)
        }
        return result.join(', ')
      },
      renderHeader: () => <strong>Status</strong>,
      renderCell: (params) => {
        const {
          row: { status },
        } = params
        const getColor = (status) => {
          switch (status) {
            case 'COMPLETED':
              return 'success'
            case 'IN_PROGRESS':
              return 'warning'
            case 'PENDING':
              return 'secondary'
            case 'REJECTED':
              return 'danger'
            default:
              return 'primary'
          }
        }
        return (
          <CTooltip content={status}>
            <CBadge color={getColor(status)}>{status}</CBadge>
          </CTooltip>
        )
      },
    },
    {
      field: 'clientName',
      headerName: 'Client',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (params) => {
        let result = []
        if (params.row.clientName) {
          result.push(params.row.clientName)
        }
        return result.join(', ')
      },
      renderHeader: () => <strong>Client</strong>,
      renderCell: (params) => (
        <CTooltip content={params.row.clientName}>
          <div className="MuiDataGrid-cellContent">{params.row.clientName}</div>
        </CTooltip>
      ),
    },
    {
      field: 'updatedAt',
      headerName: 'Timestamp',
      flex: 1.5,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (params) => {
        let result = []
        if (params.row.updatedAt) {
          result.push(params.row.updatedAt)
        }
        return result.join(', ')
      },
      renderHeader: () => <strong>Timestamp</strong>,
      renderCell: (params) => (
        <CTooltip content={dayjs(params.row.updatedAt).format('DD-MM-YY HH:ss')}>
          <div className="MuiDataGrid-cellContent">
            {dayjs(params.row.updatedAt).format('DD-MM-YY HH:ss')}
          </div>
        </CTooltip>
      ),
    },
  ]
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CRow>
        <CCol xs={12}>
          <div className="search-filters-groups row g-3">
            <CCol md={2}>
              <CFormInput placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
            </CCol>
            <CCol md={2}>
              <DatePicker
                className="form-control-time-picker"
                onChange={setStartDate}
                value={startDate}
                format="dd/MM/yyyy"
                dayPlaceholder="dd"
                monthPlaceholder="mm"
                yearPlaceholder="yyyy"
              />
            </CCol>
            <CCol md={2}>
              <DatePicker
                className="form-control-time-picker"
                onChange={setEndDate}
                value={endDate}
                format="dd/MM/yyyy"
                dayPlaceholder="dd"
                monthPlaceholder="mm"
                yearPlaceholder="yyyy"
              />
            </CCol>
            <CCol md={6}>
              <div className="align-content-right">
                <CButton
                  color="primary"
                  className="px-4"
                  type="button"
                  onClick={() => navigate('add')}
                >
                  Add Order
                </CButton>
              </div>
            </CCol>
          </div>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Services</strong> <small>listing</small>
            </CCardHeader>
            <CCardBody>
              <DataGrid
                autoHeight
                rows={orders}
                rowCount={totalRecords}
                columns={columns}
                pagination
                page={page}
                pageSize={pageSize}
                paginationMode="server"
                onPageChange={setPage}
                rowsPerPageOptions={[pageSize]}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </LocalizationProvider>
  )
}

export default Services
