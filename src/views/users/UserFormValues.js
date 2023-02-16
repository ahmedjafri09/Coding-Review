import * as Yup from 'yup'

export const initialVals = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const valSchema = Yup.object().shape({
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
  role: Yup.string().required('Required'),
  email: Yup.string()
    .matches(
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid Email',
    )
    .required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
})
