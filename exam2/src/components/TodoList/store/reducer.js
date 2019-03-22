import {constants} from './index'

const defaultState = {
  todoItem: [
    {
      content: '吃饭',
      finished: true,
    },
    {
      content: '睡觉',
      finished: true,
    },
    {
      content: '打豆豆',
      finished: false,
    },
    {
      content: '回家',
      finished: false,
    },
  ],
  inputValue: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_INPUT_VALUE:
      return Object.assign({}, state, {
        inputValue: action.value
      });

    case constants.CHANGE_CHECKBOX_VALUE: 
      var newTodoItem = [...state.todoItem]
      newTodoItem[action.index].finished = !newTodoItem[action.index].finished
      return Object.assign({}, state, {
        todoItem: newTodoItem
      });

    case constants.ADD_TODO_ITEM: 
      return Object.assign({}, state, {
        todoItem: [...state.todoItem, {
          content: state.inputValue,
          finished: false,
          index: state.todoItem.length
        }]
      });

    case constants.DELETE_TODO_ITEM:
      var newTodoItem = [...state.todoItem]
      newTodoItem.splice(action.index, 1)
      return Object.assign({}, state, {
        todoItem: newTodoItem
      })

    default:
      return state;
  }
}