'use strict'

import InputAndLabel from '@/utilities/inputAndLabel.js'

export default class {
  constructor () {
    this._inputs = [
      new InputAndLabel({placeHolder: 'Full Name', class: 'name'}, {type: 'name', id: 'name', required: true}),
      new InputAndLabel({placeHolder: 'Email', class: 'email'}, {type: 'email', id: 'email', required: true}),
      new InputAndLabel({placeHolder: 'Confirm Email', class: 'confirm-email'}, {type: 'email', id: 'confirm-email', required: true}),
      new InputAndLabel({placeHolder: 'Password', class: 'password'}, {type: 'password', id: 'password', required: true}),
      new InputAndLabel({placeHolder: 'Confirm Password', class: 'confirm-password'}, {type: 'password', id: 'confirm-password', required: true}),
      new InputAndLabel({placeHolder: 'Original Password', class: 'originalPassword'}, {type: 'password', id: 'originalPassword', required: true})
    ]
  }

  getInputs () {
    return this._inputs
  }
}
