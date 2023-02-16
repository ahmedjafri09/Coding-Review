import { ddmmyyFormat } from 'src/libs/common'
import * as Yup from 'yup'

export const initialVals = {
  meetGreetType: '',
  bookingDate: ddmmyyFormat(new Date()),
  bookingTime: null,
  airportName: '',
  arrivalFlightNum: '',
  departureFlightNum: '',
  paxName: '',
  paxContactNum: '',
  paxEmail: '',
  numberOfPax: '',
  bags: '',
  valueAddedServices: null,
  terminal: '',
  greeterName: '',
  paymentType: '',
  clientName: '',
  totalInvoice: '',
  supportingBackups: '',
  status: '',
  addVat: false,
  sendEmail: false,
  notes: '',
}

export const valSchema = Yup.object().shape({
  meetGreetType: Yup.string().required('Required'),
  bookingDate: Yup.date().nullable().required('Required'),
  bookingTime: Yup.string().nullable().required('Required'),
  airportName: Yup.string().required('Required'),
  arrivalFlightNum: Yup.string().when('meetGreetType', {
    is: 'Arrival',
    then: Yup.string().required('Required'),
  }),
  departureFlightNum: Yup.string().when('meetGreetType', {
    is: 'Departure',
    then: Yup.string().required('Required'),
  }),
  paxName: Yup.string().required('Required'),
  paxContactNum: Yup.string().required('Required'),
  paxEmail: Yup.string()
    .matches(
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid Email',
    )
    .required('Required'),
  numberOfPax: Yup.number().required('Required'),
  bags: Yup.number().required('Required'),
  valueAddedServices: Yup.array().optional(),
  terminal: Yup.string().required('Required'),
  greeterName: Yup.string().required('Required'),
  clientName: Yup.string().required('Required'),
  totalInvoice: Yup.number().required('Required'),
  supportingBackups: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
  addVat: Yup.bool().required(),
  sendEmail: Yup.bool().required(),
  notes: Yup.string(),
})
