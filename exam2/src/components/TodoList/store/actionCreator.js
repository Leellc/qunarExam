import {constants} from './index' 

export const changeInputValue = (value) => ({
  type: constants.CHANGE_INPUT_VALUE,
  value
})

export const changeCheckboxValue = (index) => ({
  type: constants.CHANGE_CHECKBOX_VALUE,
  index
})

export const addTodoItem = () => ({
  type: constants.ADD_TODO_ITEM,
})

export const deleteTodoItem = (index) => ({
  type: constants.DELETE_TODO_ITEM,
  index
})