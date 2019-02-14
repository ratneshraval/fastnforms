import React, { Component } from 'react'
import * as Survey from 'survey-react'
import 'survey-react/survey.css'
import { Button, InputMask, Card } from '@cwds/components'
import { CardTitle, CardHeader, CardBody } from '@cwds/reactstrap'

export default class FormS1 extends Component {
  json = {
    checkErrorsMode: 'onComplete',
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
      }
    ],
    completeSurveyText: 'Save'
  };

  onComplete (survey, options) {
    // Write survey results into database
    console.log('Survey results: ' + JSON.stringify(survey.data))
  }

  onErrorCustomText (sender, options) {
    console.log('custom error text')
    if (options.name === 'required') {
      options.text = 'Required'
    }
  }

  render () {
    Survey.StylesManager
      .applyTheme('default')
    // Survey.Survey.
    Survey.Survey.cssType = 'bootstrap'
    // Survey.Survey.onErrorCustomText.add(this.onErrorCustomText)
    const styles = {
      width: '70%',
      margin: 'auto'
    }
    const model = new Survey.Model(this.json)
    model.onErrorCustomText.add(this.onErrorCustomText)
    return (
      <React.Fragment >
        <p> NESH </p>
        <div style={styles} >

          <Card>
            <CardHeader>
              <CardTitle>
                Applicant Information HERE
              </CardTitle>
            </CardHeader>
            <CardBody>

              <Survey.Survey model={model} onComplete={this.onComplete} />
            </CardBody>
          </Card>

        </div>
      </React.Fragment >
    )
  }
}
