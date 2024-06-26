/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import moment from 'moment';
import { tasks } from './reducers/tasks';
import { AddButton, DeleteButton, HeadLine } from './styles/global';
import { Counter } from './Counter';

const AddTask = styled.input`
    border: none;
    border-bottom: solid black 1px;
    width: 80%;
    margin-left: 20px;
    font-size: 2em;
    font-family: 'Dongle', sans-serif;
    &:focus {
        outline: none;
    }
`

const TodoForm = styled.form`
    max-width: 100vw;
`

const HeadlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0;
`

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 20px;
  margin-top: 50px;
`

export const NewTask = () => {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const onTaskSubmit = (event) => {
    event.preventDefault();
    const addTask = {
      id: Date.now().toString(),
      text: inputValue,
      complete: false,
      time: moment().format('D MMM HH:mm')
    }
    dispatch(tasks.actions.addTask(addTask));
    setInputValue('');
  }

  const deleteAllTasksBtn = () => {
    dispatch(tasks.actions.deleteAllTasks());
  }

  return (
    <section>
      <HeaderWrapper>
        <DeleteButton
          type="button"
          onClick={deleteAllTasksBtn}>
                      Delete all tasks
          <span className="material-symbols-outlined">
delete
          </span>
        </DeleteButton>
        <HeadlineWrapper>
          <HeadLine>To Do</HeadLine>
          <Counter />
        </HeadlineWrapper>
      </HeaderWrapper>
      <TodoForm onSubmit={onTaskSubmit}>
        <label htmlFor="addTaskInput">
          <AddTask
            key={onTaskSubmit.id}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            id="addTaskInput"
            type="text"
            placeholder="Add task" />
        </label>
        <AddButton type="submit">
          <span className="material-symbols-outlined">
add_circle
          </span>
        </AddButton>
      </TodoForm>
    </section>
  )
}