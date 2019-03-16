import React, { Component } from 'react'
import './App.css'
import FormS1 from './survey/FormS1'
import Names from './survey/Names'
import Form1 from './jsonforms/Form1'
import Formff1 from './formik/Formff1'

class App extends Component {
  render () {
    return (
      <div className="App">
        <Formff1></Formff1>
        {/* <Form1></Form1> */}
        {/* <FormS1></FormS1> */}
        {/* <Names></Names> */}
      </div>
    )
  }
}

export default App
