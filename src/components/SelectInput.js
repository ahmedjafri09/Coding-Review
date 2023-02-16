import React from 'react'
import PropType from 'prop-types'
import { CFormLabel, CFormSelect } from '@coreui/react'

const SelectInput = ({ id, formik, name, label, options, ...rest }) => {
  return (
    <>
      <CFormLabel className="form-label" htmlFor={id}>
        {label}
      </CFormLabel>
      <CFormSelect
        id={id}
        name={name}
        placeholder={label}
        {...rest}
        value={formik.values[name]?.id || formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <option>...</option>
        {options?.map((option, key) => (
          <option key={key} value={option?.id}>
            {option?.name}
          </option>
        ))}
      </CFormSelect>
      {formik.errors[name] && formik.touched[name] && (
        <div className="text-medium-emphasis small is-invalid">{formik.errors[name]}</div>
      )}
    </>
  )
}

export default SelectInput

SelectInput.propTypes = {
  id: PropType.string,
  formik: PropType.any,
  name: PropType.string,
  label: PropType.string,
  options: PropType.array,
}
