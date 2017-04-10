'use strict'

export default class {
  constructor (pLabel, pInput) {
    this._label = this._constructLabel(pLabel)
    this._input = this._constructInput(pInput)
    this._constructDataName()
  }

  _constructLabel (label) {
    let tempLabel = {placeHolder: '', class: '', dataName: ''}
    return Object.assign(tempLabel, label)
  }

  _constructInput (input) {
    let tempInput = {type: 'text', id: '', required: false, dataName: ''}
    return Object.assign(tempInput, input)
  }

  _constructDataName () {
    let confirmRegex = /^confirm-*/
    for (let property in this) {
      let beginningName = this[property].class || this[property].id
      let newName = null
      if (confirmRegex.test(beginningName)) {
        let indexOfHyphen = beginningName.indexOf('-')
        let confirmName = beginningName.substr(0, indexOfHyphen)
        let afterConfirmName = beginningName.substr(indexOfHyphen + 1).charAt(0).toUpperCase() + beginningName.substr(indexOfHyphen + 2)
        newName = confirmName + afterConfirmName + property.substr(1).charAt(0).toUpperCase() + property.substr(2)
      } else {
        newName = beginningName + property.substr(1).charAt(0).toUpperCase() + property.substr(2)
      }
      this[property].dataName = newName
    }
  }

  getLabel () {
    return this._label
  }

  getInput () {
    return this._input
  }

}
