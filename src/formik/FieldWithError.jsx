import React, { Fragment } from 'react'
import { Field, ErrorMessage } from 'formik'

export const FieldWithError =
  ({
    name,
    type,
    placeholder
  }) => {
    return (
      <Fragment>
        <Field type={type} name={name} placeholder={placeholder} />
        <ErrorMessage name={name} component='div' />
      </Fragment>
    )
  }
