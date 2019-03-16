import { createStore, combineReducers } from 'redux'
import { materialFields, materialRenderers } from '@jsonforms/material-renderers'
import { Actions, jsonformsReducer } from '@jsonforms/core'

export const store = createStore(
  combineReducers({ jsonforms: jsonformsReducer() }),
  {
    jsonforms: {
      renderers: materialRenderers,
      fields: materialFields
    }
  }
)
