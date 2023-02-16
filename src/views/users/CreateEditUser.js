import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CButton, CCol, CForm, CModal, CModalHeader, CModalTitle, CRow } from '@coreui/react'
import { useFormik } from 'formik'
import API from 'src/libs/axios'
import { onError } from 'src/libs/errorLib'
import { initialVals, valSchema } from './UserFormValues'
import Input from 'src/components/Input'
import SelectInput from 'src/components/SelectInput'

const CreateEditUser = ({ openState, userId, getUsers }) => {
  const { openModal, setOpenModal } = openState
  const [initialFormikValues, setInitialFormikValues] = useState(initialVals)

  const formik = useFormik({
    initialValues: initialFormikValues,
    enableReinitialize: true,
    validationSchema: valSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const userData = {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          role: values.role,
          ...(values.password && { password: values.password }),
          ...(values.confirmPassword && { confirmPassword: values.confirmPassword }),
        }
        if (userId) {
          await API.put(`users/${userId}`, userData)
        } else {
          await API.post('users', userData)
        }
        getUsers()
        setOpenModal(false)
        resetForm()
      } catch (error) {
        onError(error)
      }
    },
  })

  const getUser = async (userId) => {
    try {
      const res = await API.get(`users/${userId}`)
      if (res?.user) {
        console.log(res)
        setInitialFormikValues({ ...res.user, _id: res.user._id })
      }
    } catch (error) {
      onError(error)
    }
  }

  useEffect(() => {
    if (userId) {
      getUser(userId)
    }
  }, [userId])

  return (
    <CModal
      visible={openModal}
      onClose={() => {
        formik.resetForm()
        setOpenModal(false)
      }}
    >
      <CModalHeader>
        <CModalTitle>{userId ? 'Edit User' : 'Add User'}</CModalTitle>
      </CModalHeader>
      <div className="p-5">
        <CRow>
          <CCol md={12}>
            <CForm className="row g-3" onSubmit={formik.handleSubmit}>
              <CCol md={8}>
                <Input
                  id="firstname"
                  type="text"
                  name="firstname"
                  label="Firstname"
                  formik={formik}
                />
              </CCol>
              <CCol md={8}>
                <Input id="lastname" type="text" name="lastname" label="Lastname" formik={formik} />
              </CCol>
              <CCol md={8}>
                <Input id="email" type="text" name="email" label="Email" formik={formik} />
              </CCol>
              <CCol md={8}>
                <SelectInput
                  id="role"
                  name="role"
                  label="Role"
                  formik={formik}
                  options={[
                    { name: 'Admin', id: 'ADMIN' },
                    { name: 'Client', id: 'CLIENT' },
                    { name: 'Agent', id: 'AGENT' },
                  ]}
                />
              </CCol>
              <CCol md={8}>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  label="Password"
                  formik={formik}
                />
              </CCol>
              <CCol md={8}>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  formik={formik}
                />
              </CCol>
              <CCol md={12}></CCol>
              <CCol md={4}>
                <CButton
                  color="secondary"
                  className="mt-3 px-4"
                  type="button"
                  onClick={() => {
                    formik.resetForm()
                    setOpenModal(false)
                  }}
                >
                  Cancel
                </CButton>
              </CCol>
              <CCol md={4}>
                <CButton type="submit" color="primary" className="mt-3 px-4">
                  {userId ? 'Edit User' : 'Add User'}
                </CButton>
              </CCol>
            </CForm>
          </CCol>
        </CRow>
      </div>
    </CModal>
  )
}

export default CreateEditUser

CreateEditUser.propTypes = {
  openState: PropTypes.object,
  userId: PropTypes.string,
  getUsers: PropTypes.func,
}
