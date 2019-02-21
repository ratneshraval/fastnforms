import { InputMask } from '@cwds/components'
import { Survey } from 'survey-react'

const InputMaskEx = {

  name: 'InputMaskEx',
  title: 'InputMask from CWDS',
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
    Survey.JsonObject.metaData.addClass('InputMaskEx', [], null, 'text')
    // signaturepad is derived from "empty" class - basic question class
    // Survey.JsonObject.metaData.addClass("signaturepad", [], null, "empty");

    // Add new property(s)
    // For more information go to https://surveyjs.io/Examples/Builder/?id=addproperties#content-docs
    Survey.JsonObject.metaData.addProperties('InputMaskEx', [
      { name: 'mask', default: '(999)999-9999' }
    ])
  },
  // If you want to use the default question rendering then set this property to true. We do not need any default rendering, we will use our our htmlTemplate
  isDefaultRender: true,
  // You should use it if your set the isDefaultRender to false
  htmlTemplate: '<div><input /><button></button></div>',
  // The main function, rendering and two-way binding
  afterRender: (question, el) => {
    // el is our root element in htmlTemplate, is "div" in our case
    // get the text element
    const text = el.getElementsByTagName('input')[0]
    // set some properties
    text.inputType = question.inputType
    text.placeholder = question.placeHolder
    // get button and set some rpoeprties
    const button = el.getElementsByTagName('button')[0]
    button.innerText = question.buttonText
    button.onclick = () => {
      question.value = 'You have clicked me'
    }

    // set the changed value into question value
    text.onchange = () => {
      question.value = text.value
    }
    onValueChangedCallback = () => {
      text.value = question.value ? question.value : ''
    }
    onReadOnlyChangedCallback = () => {
      if (question.isReadOnly) {
        text.setAttribute('disabled', 'disabled')
        button.setAttribute('disabled', 'disabled')
      } else {
        text.removeAttribute('disabled')
        button.removeAttribute('disabled')
      }
    }
    // if question becomes readonly/enabled add/remove disabled attribute
    question.readOnlyChangedCallback = onReadOnlyChangedCallback
    // if the question value changed in the code, for example you have changed it in JavaScript
    question.valueChangedCallback = onValueChangedCallback
    // set initial value
    onValueChangedCallback()
    // make elements disabled if needed
    onReadOnlyChangedCallback()
  },
  // Use it to destroy the widget. It is typically needed by jQuery widgets
  willUnmount: (question, el) => {
    // We do not need to clear anything in our simple example
    // Here is the example to destroy the image picker
    // var $el = $(el).find("select");
    // $el.data('picker').destroy();
  }
}

// Register our widget in singleton custom widget collection
Survey.CustomWidgetCollection.Instance.addCustomWidget(InputMaskEx, 'customtype')
