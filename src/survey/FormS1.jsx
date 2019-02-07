import React, { Component } from 'react'
import * as Survey from 'survey-react'
import 'survey-react/survey.css'
import './forms1.css'

export default class FormS1 extends Component {
  json = {
    checkErrorsMode: 'onComplete',
    completeText: 'Save / Submit',
    questionErrorLocation: 'bottom',
    elements: [

      {
        type: 'paneldynamic',
        innerIndent: 2,
        minPanelCount: 1,
        panelRemoveText: 'Remove Applicant',
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
          { type: 'text', name: 'first_name', title: 'First Name', isRequired: true, text: 'Enter first name' },
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
        type: 'matrixdynamic',
        // minPanelCount: 1,
        // panelRemoveText: 'Remove Phone',
        name: 'phones',
        title: 'Phone numbers',
        columns: [
          {
            cellType: 'dropdown',
            name: 'type',
            title: 'Type',
            choices: [
              'Cellular',
              'Home',
              'Work'
            ],
            minWidth: '20%'
          },
          {
            name: 'number',
            cellType: 'text',
            inputType: 'tel',
            title: 'Phone Number',
            // isRequired: true,
            // validators: [{ 'type': 'numeric' }],
            width: '30%',
            maxLength: 10
            // startWithNewLine: false
          },
          {
            name: 'preferred',
            cellType: 'checkbox',
            title: 'Preferred',
            choices: ['Preferred'],
            startWithNewLine: false
          }
        ]
      }

      // {
      //   type: 'paneldynamic',
      //   innerIndent: 2,
      //   minPanelCount: 1,
      //   panelRemoveText: 'Remove Phone',
      //   name: 'phones',
      //   title: 'Phone numbers',
      //   templateElements: [
      //     {
      //       type: 'dropdown',
      //       name: 'type',
      //       title: 'Type',
      //       choices: [
      //         'Cellular',
      //         'Home',
      //         'Work'
      //       ],
      //       width: '20%'
      //     },
      //     {
      //       name: 'number',
      //       type: 'text',
      //       inputType: 'tel',
      //       title: 'Phone Number',
      //       isRequired: true,
      //       validators: [{ 'type': 'numeric' }],
      //       width: '30%',
      //       maxLength: 10,
      //       startWithNewLine: false
      //     },
      //     {
      //       name: 'preferred',
      //       type: 'checkbox',
      //       title: 'Preferred',
      //       choices: ['Preferred'],
      //       startWithNewLine: false
      //     }
      //   ]
      // }

    ],
    completeSurveyText: 'Save'
  };

  onComplete (survey, options) {
    // Write survey results into database
    console.log('Survey results: ' + JSON.stringify(survey.data))
  }

  render () {
    Survey.StylesManager
      .applyTheme('winterstone')
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
