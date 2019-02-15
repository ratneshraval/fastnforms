import React, { Component } from 'react'
import * as Survey from 'survey-react'
import 'survey-react/survey.css'
import './forms1.css'
import { Button, InputMask, Card } from '@cwds/components'

const myCss = {
  paneldynamic: {
    root: 'table table-striped'
  }
}
export default class FormS1 extends Component {
  json = {
    // checkErrorsMode: 'onComplete',
    checkErrorsMode: 'onValueChanged',
    completeText: 'Save / Submit',
    questionErrorLocation: 'bottom',
    elements: [

      {
        type: 'paneldynamic',
        innerIndent: 1,
        minPanelCount: 1,
        panelRemoveText: 'Remove Applicant',
        name: 'applicants',
        title: 'Applicant Information',
        templateTitle: 'Applicant {paneldynamic.currentIndex}',
        useDisplayValuesInTitle: true,
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
        name: 'number',
        type: 'text',
        inputMask: 'phone',
        inputType: 'tel',
        renderAs: 'InputMask',
        title: 'Phone Number',
        inputFormat: '(999)999-9999',
        // isRequired: true,
        // validators: [{ 'type': 'numeric' }],
        width: '30%',
        maxLength: 10
        // startWithNewLine: false
      },
      // {
      //   name: 'number',
      //   type: 'text',
      //   inputMask: 'phone',
      //   inputFormat: '(999)999-9999',
      //   title: 'Phone Number',
      //   width: '30%',
      //   maxLength: 10
      //   // startWithNewLine: false
      // },
      {
        name: 'email',
        type: 'text',
        inputType: 'email',
        title: 'Email',
        isRequired: true,
        validators: [{ 'type': 'email', 'text': 'Please enter email' }],
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
          // {
          //   name: 'number',
          //   cellType: 'text',
          //   inputType: 'tel',
          //   title: 'Phone Number',
          //   // isRequired: true,
          //   // validators: [{ 'type': 'numeric' }],
          //   width: '30%',
          //   maxLength: 10
          //   // startWithNewLine: false
          // },
          {
            cellType: 'text',
            inputMask: 'phone',
            renderAs: 'InputMask',
            name: 'number',
            title: 'Phone Number',
            width: '30%',
            startWithNewLine: false
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

    ],
    completeSurveyText: 'Save'
  };

  onComplete(survey, options) {
    // Write survey results into database
    console.log('Survey results: ' + JSON.stringify(survey.data))
  }

  render() {
    Survey.StylesManager
      .applyTheme('default')
    // Survey.Survey.
    // Survey.Survey.cssType = 'bootstrap'
    Survey.CustomWidgetCollection.Instance.addCustomWidget(InputMask, 'InputMask')
    // const inputmaskFormat = Survey.Survey.getque

    const styles = {
      width: '70%',
      margin: 'auto'
    }
    const model = new Survey.Model(this.json)
    const inputMaskQ = model.getQuestionByName('number')
    // inputMaskQ.mask = '(999)999-9999'

    const initialData = {
      number: '2332',
      applicants: [
        { first_name: 'sunil' },
        { last_name: 'biradar' }
      ]
    }
    // debugger
    return (
      <React.Fragment >
        <p> NESH </p>
        <div style={styles} >
          <Card>
            <Survey.Survey
              model={model}
              onComplete={this.onComplete}
              data={initialData}
            />

          </Card>
          <Card>
            <InputMask mask='(999)999-9999' />
          </Card>
        </div>
      </React.Fragment >
    )
  }
}
