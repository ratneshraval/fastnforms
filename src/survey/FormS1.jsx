import React, { Component } from 'react'
import * as Survey from 'survey-react'
import 'survey-react/survey.css'

export default class FormS1 extends Component {
  json = {
    checkErrorsMode: 'onComplete',
    completeText: 'Save / Submit',
    elements: [

      {
        type: 'paneldynamic',
        innerIndent: 1,
        name: 'applicants',
        title: 'Applicant Information',
        templateElements: [
          {
            type: 'dropdown',
            name: 'prefix',
            title: 'Prefix',
            colCount: 2,
            choices: [
              'Mr',
              'Mrs',
              'Ms'
            ],
            width: '30%'
          },
          { type: 'text', name: 'first_name', title: 'First Name', isRequired: true },
          { type: 'text', name: 'middle_name', title: 'Middle Name', startWithNewLine: false },
          { type: 'text', name: 'last_name', title: 'Last Name', isRequired: true, startWithNewLine: false },
          {
            type: 'dropdown',
            name: 'suffix',
            title: 'Suffix',
            colCount: 2,
            choices: [
              'II',
              'III',
              'IV'
            ],
            width: '30%'
          }
        ]
      },

      {
        name: 'email',
        type: 'text',
        inputType: 'email',
        title: 'Email',
        isRequired: true,
        validators: [{ 'type': 'email', 'text': 'enter email' }],
        width: '40%'
      },

      {
        name: 'number',
        type: 'text',
        inputType: 'tel',
        title: 'Phone Number',
        isRequired: true,
        validators: [{ 'type': 'numeric' }],
        width: '30%',
        maxLength: 10

      }

    ],
    completeSurveyText: 'Save'
  };

  onComplete (survey, options) {
    // Write survey results into database
    console.log('Survey results: ' + JSON.stringify(survey.data))
  }

  render () {
    // Survey.StylesManager
    //   .applyTheme('default')
    const styles = {
      width: '70%',
      margin: 'auto'
    }
    const model = new Survey.Model(this.json)

    return (
      <React.Fragment >
        <p> NESH </p>
        <div style={styles} >
          <Survey.Survey model={model} onComplete={this.onComplete} />
        </div>
      </React.Fragment >
    )
  }
}
