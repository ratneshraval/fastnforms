import React, { Component } from 'react'
import './App.css'
import FormS1 from './survey/FormS1'
import Names from './survey/Names'

class App extends Component {
  render () {
    return (
      <div className="App">
        <FormS1></FormS1>
        {/* <Names></Names> */}
      </div>
    )
  }
}

export default App
