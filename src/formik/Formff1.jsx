import React, { Component, Fragment } from 'react'
import { Button } from '@cwds/components'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik'
import { FieldWithError } from './FieldWithError'

import * as Yup from 'yup'

import GridItem from './GridItem'
import GridContainer from './GridContainer'
import Card from './Card'
import CardBody from './CardBody'

const initialV = {
  first_name: 'john',
  last_name: 'smith',
  email: 'blah@gmail',
  phones: [
    {
      number: '23',
      type: 'h',
      preferred: true
    },
    {
      number: '77',
      type: 'w',
      preferred: false,
      _destroy: true
    },
    {
      number: '645',
      type: 'c',
      preferred: false
    }
  ]
}
const newPhone = {
  number: '',
  type: 'c',
  preferred: false
}

const validations = Yup.object().shape({
  first_name: Yup.string().required('required'),
  last_name: Yup.string().required('required'),
  email: Yup.string().email(),
  phones: Yup.array()
    .of(
      Yup.object().shape({
        _destroy: Yup.boolean(),
        number: Yup.string()
          .when('_destroy', {
            is: true,
            otherwise: Yup.string().min(3, 'too short').required('Required')
          })
      })
    )
})

export default class Formff1 extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.interceptOnChange = this.interceptOnChange.bind(this)
  }
  handleSubmit (values, actions) {
    console.log(values)
  }

  interceptOnChange () {

  }

  render () {
    const styles = {
      width: '70%',
      margin: 'auto'
    }

    return (
      <React.Fragment >
        <p> Formik </p>
        <div style={styles} >

          <Card>
            <Formik
              initialValues={initialV}
              onSubmit={(values, actions) => {
                this.handleSubmit(values, actions)
              }}
              validationSchema={validations}
            >
              {({ values, errors, status, touched, isSubmitting }) => (
                <Form>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Card>
                        <CardBody>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                              <Field type="text" name="first_name" />
                              <ErrorMessage name="first_name" component="div" />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <Field type="text" name="middle_name" />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <Field type="text" name="last_name" />
                              <ErrorMessage name="last_name" component="div" />
                            </GridItem>

                          </GridContainer>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                              <Field type="email" name="email" />
                              <ErrorMessage name="email" component="div" />
                            </GridItem>

                          </GridContainer>
                        </CardBody>
                      </Card>
                    </GridItem>

                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Card>
                        <CardBody>

                          <FieldArray name="phones"
                            render={
                              ({ push, remove, insert, unshift, pop, form, replace }) =>
                                (
                                  <Fragment>
                                    debugger
                                    {/* {values.phones.map((phone, index) => ( */}
                                    {values.phones.map((phone, index) => (
                                      values.phones[index]._destroy
                                        ? undefined
                                        : <GridContainer key={index}>
                                          <GridItem xs={12} sm={12} md={3}>
                                            <Field type="tel" name={`phones[${index}].number`} />
                                            <ErrorMessage name={`phones[${index}].number`} component="div" />
                                          </GridItem>

                                          <GridItem xs={12} sm={12} md={3}>
                                            <Field component="select" name={`phones[${index}].type`}>
                                              <option label='Cell' value='c'>Cell1</option>
                                              <option label='Home' value='h'>Home1</option>
                                              <option label='Work' value='w'>Work1</option>
                                            </Field>
                                          </GridItem>
                                          <GridItem xs={12} sm={12} md={3}>
                                            <Field
                                              name={`phones[${index}].preferred`}
                                              render={({ field, form }) => {
                                                return (
                                                  <input type="checkbox" checked={field.value} {...field} />
                                                )
                                              }}
                                              handleOnChange
                                            />

                                          </GridItem>
                                          <GridItem xs={12} sm={12} md={3}>
                                            <button type='button' onClick={() => { values.phones[index]._destroy = true }}>X</button>
                                          </GridItem>
                                        </GridContainer>
                                    ))
                                    }
                                    <button type='button' onClick={() => push(newPhone)}>+</button>
                                  </Fragment>
                                )
                            } />

                        </CardBody>
                      </Card>
                    </GridItem>

                  </GridContainer>

                  {status && status.msg && <div>{status.msg}</div>}
                  <br />
                  <br />
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>

          </Card>

        </div >

        <br />
        <br />
        <br />
      </React.Fragment >
    )
  }
}
