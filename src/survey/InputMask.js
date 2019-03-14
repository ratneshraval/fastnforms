import { InputMask } from '@cwds/components'
// import { Survey } from 'survey-react'

export function importInputMaskEx (Survey) {
  const InputMaskEx = {

    name: 'InputMaskEx',
    title: 'InputMask from CWDS',
    mask: '(999)999-9999',
    iconName: '',
    widgetIsLoaded: () => {
      return true
    },
    isFit: (question) => {
      return question.getType() === 'InputMaskEx'
    },
    // Use this function to create a new class or add new properties or remove unneeded properties from your widget
    // activatedBy tells how your widget has been activated by: property, type or customType
    // property - it means that it will activated if a property of the existing question type is set to particular value, for example inputType = "date"
    // type - you are changing the behaviour of entire question type. For example render radiogroup question differently, have a fancy radio buttons
    // customType - you are creating a new type, like in our example "textwithbutton"
    activatedByChanged: (activatedBy) => {
      // we do not need to check acticatedBy parameter, since we will use our widget for customType only
      // We are creating a new class and derived it from text question type. It means that text model (properties and fuctions) will be available to us
      Survey.JsonObject.metaData.addClass('InputMaskEx', [], null, 'question')
      // signaturepad is derived from "empty" class - basic question class
      // Survey.JsonObject.metaData.addClass("signaturepad", [], null, "empty");

      // Add new property(s)
      // For more information go to https://surveyjs.io/Examples/Builder/?id=addproperties#content-docs
      Survey.JsonObject.metaData.addProperties('InputMaskEx', [
        { name: 'mask:string', default: '(999)999-9999' }
      ])
    },
    // If you want to use the default question rendering then set this property to true. We do not need any default rendering, we will use our our htmlTemplate
    isDefaultRender: false,
    // You should use it if your set the isDefaultRender to false
    htmlTemplate: '<div><InputMask mask="(999)999-9999" /></div>',
    // The main function, rendering and two-way binding
    afterRender: (question, el) => {
      // // el is our root element in htmlTemplate, is "div" in our case
      // // get the text element
      // const m = question.mask
      // const ipm =
      //   question.InputMaskEx = ipm
      const text = el.getElementsByTagName('InputMask')[0]
      // // set some properties
      // text.mask = '(999)999-9999'
      text.inputType = question.inputType
      text.placeholder = question.placeHolder
      // // set the changed value into question value
      text.onchange = () => {
        question.value = text.value
      }
      question.valueChangedCallback = () => {
        text.value = question.value ? question.value : ''
      }
      question.valueChangedCallback()
      // // if the question value changed in the code, for example you have changed it in JavaScript
      // question.valueChangedCallback = () => {
      //   text.value = question.value ? question.value : ''
      // }
      // // // set initial value
      // // onValueChangedCallback()
      // // // make elements disabled if needed
      // // onReadOnlyChangedCallback()
    },
    // Use it to destroy the widget. It is typically needed by jQuery widgets
    willUnmount: (question, el) => {
      // We do not need to clear anything in our simple example
      // Here is the example to destroy the image picker
      // var $el = $(el).find("select");
      // $el.data('picker').destroy();
    }
  }

  //   // Register our widget in singleton custom widget collection
  Survey.CustomWidgetCollection.Instance.addCustomWidget(InputMaskEx)
}
