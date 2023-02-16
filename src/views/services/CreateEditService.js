import React, { useCallback, useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormLabel,
  CHeaderText,
  CRow,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import { useFormik } from 'formik'
import DatePicker from 'react-date-picker'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import TimePicker from 'react-time-picker'
import Input from 'src/components/Input'
import SelectInput from 'src/components/SelectInput'
import API from 'src/libs/axios'
import { defaultDateTime, hhmmFormat } from 'src/libs/common'
import { onError } from 'src/libs/errorLib'
import { initialVals, valSchema } from './ServiceFormValues'

const CreateEditService = () => {
  const { s_id } = useParams()
  const navigate = useNavigate()
  const [bookingTimeVal, setBookingTimeVal] = useState(new Date())
  const [bookingDateVal, setBookingDateVal] = useState(new Date())
  const [initialFormikValues, setInitialFormikValues] = useState(initialVals)

  const getOrder = useCallback(async () => {
    try {
      const res = await API.get(`orders/${s_id}`)
      if (res?.order) {
        setInitialFormikValues({ ...res.order, _id: res.order?._id })
      }
    } catch (error) {
      onError(error)
    }
  }, [s_id])

  useEffect(() => {
    if (s_id) {
      getOrder()
    }
  }, [s_id, getOrder])

  const formik = useFormik({
    initialValues: initialFormikValues,
    enableReinitialize: true,
    validationSchema: valSchema,
    onSubmit: async (values) => {
      try {
        if (s_id) {
          await API.put(`orders/${s_id}`, { ...values })
        } else {
          await API.post('orders/add-order', { ...values })
        }
        navigate('/services')
      } catch (error) {
        onError(error)
      }
    },
  })

  useEffect(() => {
    console.log({ vals: formik.values })
  }, [formik.values])

  const { valueAddedServices, paymentTypes } = useSelector((state) => state)
  console.log({ valueAddedServices })

  const registerAddedValueService = (id) => {
    const services = formik.values.valueAddedServices || []
    console.log({ services })
    const index = services.indexOf(id)

    if (index > -1) {
      services.splice(index, 1)
    } else {
      services.push(id)
    }
    formik.setFieldValue('valueAddedServices', services)
  }
  useEffect(() => {
    formik.setFieldValue('bookingTime', hhmmFormat(bookingTimeVal))
  }, [bookingTimeVal])

  useEffect(() => {
    formik.setFieldValue('bookingDate', defaultDateTime(bookingDateVal))
  }, [bookingDateVal])

  useEffect(() => {
    switch (formik.values.meetGreetType) {
      case 'Arrival':
        formik.setFieldValue('departureFlightNum', '')
        break
      case 'Departure':
        formik.setFieldValue('arrivalFlightNum', '')
        break
      default:
        return undefined
    }
  }, [formik.values.meetGreetType])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{s_id ? 'Edit Service' : 'Add Service'}</strong>
          </CCardHeader>
          <CCardBody>
            <div className="example">
              <CTabContent className="rounded-bottom">
                <CTabPane className="p-3 preview" visible>
                  <CForm className="row g-3" onSubmit={formik.handleSubmit}>
                    <CCol md={4}>
                      <SelectInput
                        id="meetGreetType"
                        name="meetGreetType"
                        label="Meet Greet Type"
                        formik={formik}
                        options={[
                          { name: 'Arrival', id: 'Arrival' },
                          { name: 'Departure', id: 'Departure' },
                          { name: 'Transit', id: 'Transit' },
                        ]}
                      />
                    </CCol>
                    <CCol md={2}>
                      <div>
                        <CFormLabel htmlFor={'bookingDate'}>{'Booking Date'}</CFormLabel>
                      </div>
                      <DatePicker
                        className="form-control-time-picker"
                        name="bookingDate"
                        id="bookingDate"
                        onChange={setBookingDateVal}
                        value={bookingDateVal}
                        format="dd/MM/yyyy"
                        dayPlaceholder="dd"
                        monthPlaceholder="mm"
                        yearPlaceholder="yyyy"
                      />
                      {formik.touched.bookingDate && formik.errors.bookingDate && (
                        <div className="text-medium-emphasis small is-invalid">
                          {formik.errors.bookingDate}
                        </div>
                      )}
                    </CCol>
                    <CCol md={2}>
                      <div>
                        <CFormLabel htmlFor={'bookingTime'}>{'Booking Time'}</CFormLabel>
                      </div>
                      <TimePicker
                        className="form-control-time-picker"
                        name="bookingTime"
                        onChange={setBookingTimeVal}
                        value={formik.values.bookingTime || bookingTimeVal}
                        format="HH:mm"
                        hourPlaceholder="hh"
                        minutePlaceholder="mm"
                      />
                      {formik.touched.bookingTime && formik.errors.bookingTime && (
                        <div className="text-medium-emphasis small is-invalid">
                          {formik.errors.bookingTime}
                        </div>
                      )}
                    </CCol>
                    <CCol md={4}>
                      <Input
                        id="airportName"
                        type="text"
                        name="airportName"
                        label="Airport"
                        formik={formik}
                      />
                    </CCol>
                    <CCol md={4}>
                      <Input
                        id="arrivalFlightNum"
                        type="text"
                        name="arrivalFlightNum"
                        label="Arrival Flight Number"
                        placeholder="e.g BA857"
                        formik={formik}
                        disabled={formik.values.meetGreetType === 'Arrival' ? false : true}
                      />
                    </CCol>
                    <CCol md={4}>
                      <Input
                        id="departureFlightNum"
                        type="text"
                        name="departureFlightNum"
                        label="Departure Flight Number"
                        placeholder="e.g QR016"
                        formik={formik}
                        disabled={formik.values.meetGreetType === 'Departure' ? false : true}
                      />
                    </CCol>
                    <CCol md={3}>
                      <Input
                        id="paxName"
                        type="text"
                        name="paxName"
                        label="Pax Lead Name"
                        placeholder="e.g John Smith"
                        formik={formik}
                      />
                    </CCol>
                    <CCol md={3}>
                      <Input
                        id="paxContactNum"
                        type="text"
                        name="paxContactNum"
                        label="Pax Contact No"
                        formik={formik}
                      />
                    </CCol>
                    <CCol md={3}>
                      <Input
                        id="paxEmail"
                        type="email"
                        name="paxEmail"
                        label="Pax E-mail"
                        formik={formik}
                      />
                    </CCol>
                    <CCol md={1}>
                      <Input
                        id="numberOfPax"
                        type="text"
                        name="numberOfPax"
                        label="No of pax"
                        formik={formik}
                      />
                    </CCol>
                    <CCol md={1}>
                      <Input id="bags" type="text" name="bags" label="No of bags" formik={formik} />
                    </CCol>
                    <CCol md={12}>
                      <CHeaderText>Value Added Services</CHeaderText>
                    </CCol>
                    <CCol md={12}>
                      {valueAddedServices?.map((service) => (
                        <CFormCheck
                          key={service.id}
                          type="checkbox"
                          id={service.name}
                          name={service.name}
                          label={service.name}
                          checked={
                            formik.values?.valueAddedServices?.find(
                              (value) => value.name === service.name,
                            )
                              ? true
                              : false
                          }
                          onChange={() => registerAddedValueService(service.id)}
                        />
                      ))}
                    </CCol>
                    <CCol md={12}>{/* <CHeaderText>Value Added Services</CHeaderText> */}</CCol>
                    <CCol md={3}>
                      <Input
                        id="terminal"
                        type="text"
                        name="terminal"
                        label="Terminal"
                        formik={formik}
                      />
                    </CCol>
                    <CCol md={3}>
                      <Input
                        id="greeterName"
                        type="text"
                        name="greeterName"
                        label="Meeter Greeter"
                        formik={formik}
                      />
                    </CCol>
                    <CCol md={3}>
                      <Input
                        id="supportingBackups"
                        type="text"
                        name="supportingBackups"
                        label="Supporting backup(s)"
                        formik={formik}
                      />
                    </CCol>
                    <CCol md={3}>
                      <SelectInput
                        id="paymentType"
                        name="paymentType"
                        label="Payment Type"
                        formik={formik}
                        options={paymentTypes}
                      />
                    </CCol>
                    <CCol md={4}>
                      <Input
                        id="clientName"
                        type="text"
                        name="clientName"
                        label="Client"
                        formik={formik}
                      />
                    </CCol>
                    <CCol md={4}>
                      <Input
                        id="totalInvoice"
                        type="text"
                        name="totalInvoice"
                        label="Total to invoice"
                        placeholder="e.g 50.00"
                        formik={formik}
                      />
                    </CCol>
                    <CCol md={4}>
                      <SelectInput
                        id="status"
                        name="status"
                        label="Status"
                        formik={formik}
                        options={[
                          { name: 'Pending', id: 'PENDING' },
                          { name: 'Accepted', id: 'ACCEPTED' },
                          { name: 'In Progress', id: 'IN_PROGRESS' },
                          { name: 'Completed', id: 'COMPLETED' },
                          { name: 'Rejected', id: 'REJECTED' },
                        ]}
                      />
                    </CCol>
                    <CCol xs={1}>
                      <CFormCheck
                        type="checkbox"
                        id="addVat"
                        name="addVat"
                        label="Add VAT"
                        checked={formik.values.addVat ? true : false}
                        onChange={formik.handleChange}
                      />
                    </CCol>
                    <CCol xs={11}>
                      <CFormCheck
                        type="checkbox"
                        id="sendEmail"
                        name="sendEmail"
                        label="Send email"
                        checked={formik.values.sendEmail}
                        onChange={formik.handleChange}
                      />
                    </CCol>
                    <CCol xs={12}>
                      <CButton type="submit">{s_id ? 'Update Order' : 'Add Order'}</CButton>
                    </CCol>
                  </CForm>
                </CTabPane>
              </CTabContent>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CreateEditService
