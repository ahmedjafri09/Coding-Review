import React, { useCallback, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CTooltip,
  CFormInput,
  CButton,
} from '@coreui/react'
import API from 'src/libs/axios'
import { onError } from 'src/libs/errorLib'
import dayjs from 'dayjs'
import { debounce } from 'lodash'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import CreateEditUser from './CreateEditUser'

const Users = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)
  const [user, setUser] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const pageSize = 10

  const getUsers = async (page, searchKeyword) => {
    try {
      const res = await API.get('users', {
        params: {
          search: searchKeyword,
          page: page,
          limit: pageSize,
        },
      })
      res?.users && setUsers(res.users)
      res?.totalRecords && setTotalRecords(res.totalRecords)
    } catch (error) {
      onError(error)
    }
  }

  const getDelayedUsers = useCallback(
    debounce((page, searchKeyword) => {
      getUsers(page, searchKeyword)
    }, 750),
    [],
  )

  useEffect(() => {
    getDelayedUsers(page, search)
  }, [page, search])

  const columns = [
    {
      field: 'fullname',
      headerName: 'Name',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      renderHeader: () => <strong>Fullname</strong>,
      renderCell: (params) => (
        <CTooltip content={params?.row?.fullname}>
          <div
            className="MuiDataGrid-cellContent"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              const id = params?.row?.id
              setUser(id)
              setOpenModal(true)
            }}
          >
            {params?.row?.fullname}
          </div>
        </CTooltip>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      renderHeader: () => <strong>Email</strong>,
      renderCell: (params) => (
        <CTooltip content={params?.row?.email}>
          <div className="MuiDataGrid-cellContent">{params?.row?.email}</div>
        </CTooltip>
      ),
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 0.75,
      disableColumnMenu: true,
      sortable: false,
      renderHeader: () => <strong>Role</strong>,
      renderCell: (params) => (
        <CTooltip content={params?.row?.role}>
          <div className="MuiDataGrid-cellContent">{params?.row?.role}</div>
        </CTooltip>
      ),
    },
    {
      field: 'verified',
      headerName: 'Verfied',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      renderHeader: () => <strong>Verfied</strong>,
      renderCell: (params) => (
        <CTooltip content={params?.row?.verified ? 'Yes' : 'No'}>
          <div className="MuiDataGrid-cellContent">{params?.row?.verified ? 'Yes' : 'No'}</div>
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
        if (params?.row?.updatedAt) {
          result.push(params?.row?.updatedAt)
        }
        return result.join(', ')
      },
      renderHeader: () => <strong>Timestamp</strong>,
      renderCell: (params) => (
        <CTooltip content={dayjs(params?.row?.updatedAt).format('DD-MM-YY HH:ss')}>
          <div className="MuiDataGrid-cellContent">
            {dayjs(params?.row?.updatedAt).format('DD-MM-YY HH:ss')}
          </div>
        </CTooltip>
      ),
    },
  ]
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {setOpenModal ? (
        <CreateEditUser openState={{ openModal, setOpenModal }} userId={user} getUsers={getUsers} />
      ) : null}
      <CRow>
        <CCol xs={12}>
          <div className="search-filters-groups row g-3">
            <CCol md={2}>
              <CFormInput placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
            </CCol>
            <CCol md={8}></CCol>
            <CCol md={2}>
              <div className="align-content-right">
                <CButton
                  color="primary"
                  className="px-4"
                  type="button"
                  onClick={() => setOpenModal(true)}
                >
                  Add User
                </CButton>
              </div>
            </CCol>
          </div>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Users</strong> <small>listing</small>
            </CCardHeader>
            <CCardBody>
              <DataGrid
                autoHeight
                rows={users}
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

export default Users
