import React from 'react'
import PropType from 'prop-types'
import { CFormInput, CFormLabel } from '@coreui/react'

const Input = ({ id, formik, type, placeholder, name, label, ...rest }) => {
  return (
    <>
      <CFormLabel htmlFor={id}>{label}</CFormLabel>
      <CFormInput
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={formik.values[name] || ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        {...rest}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-medium-emphasis small is-invalid">{formik.errors[name]}</div>
      )}
    </>
  )
}

export default Input

Input.propTypes = {
  id: PropType.string,
  formik: PropType.any,
  type: PropType.string,
  name: PropType.string,
  label: PropType.string,
  placeholder: PropType.string,
}
