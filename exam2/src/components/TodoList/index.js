import React from 'react'
import {connect} from 'react-redux'
import {actionCreators} from './store'
import './index.css'

class TodoList extends React.Component {
  render() {
    const {todoItem, inputValue, changeInputValue, changeCheckboxValue, handleSaveBtn, handleDeleteBtn} = this.props
    return(
      <div className='container'>
        <h1 style={{marginBottom:3}}>React Todo</h1>
        <div className='list'>
          {
            todoItem.map((item, index) => 
              (
                <div key={index} className={item.finished? 'item finished': 'item'}>
                  <input onChange={() => { changeCheckboxValue(index)}} type="checkbox" checked={item.finished}/> {item.content}
                  <span onClick={() => { handleDeleteBtn(index)}} className='del'>删除</span>
                </div>
              )
            )
          }
          <div className='item'>
            <span className='desc'>{todoItem.filter(item => item.finished).length} 已完成 / {todoItem.length}总数</span>
          </div>
        </div>
        <div className='todo'>
          <strong>Task</strong>
          <input className='text' onChange={changeInputValue} placeholder='你想做点什么' value={inputValue} type="text" />
        </div>
        <button onClick={handleSaveBtn} className='btn'>Save Task</button>
      </div>
    )
  }
}

const mapState = (state) => ({
  inputValue: state.inputValue,
  todoItem: state.todoItem
})

const mapDispatch = (dispatch) => ({
  changeInputValue(e) {
    dispatch(actionCreators.changeInputValue(e.target.value))
  },
  handleDeleteBtn(index) {
    dispatch(actionCreators.deleteTodoItem(index))
  },
  handleSaveBtn() {
    dispatch(actionCreators.addTodoItem())
  },
  changeCheckboxValue(index) {
    dispatch(actionCreators.changeCheckboxValue(index))
  }
})


export default connect(mapState, mapDispatch)(TodoList);