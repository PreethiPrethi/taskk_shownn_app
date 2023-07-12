// we need useState and useEffect hooks
import React, { useState, useEffect } from 'react'

// icons from react icons kit
// main Icon component
import { Icon } from 'react-icons-kit'

// icons themselves
import { plus } from 'react-icons-kit/feather/plus'
import { trash } from 'react-icons-kit/feather/trash'

// getting todos from local storage
const getTodosFromLS = () => {
  const data = localStorage.getItem('Todos');
  if (data) {
    return JSON.parse(data);

  }
  else {
    return []
  }
}

export const Form = () => {

  // todo value state
  const [todoValue, setTodoValue] = useState('');

  // todos array of objects
  const [todos, setTodos] = useState(getTodosFromLS());
  // console.log(todos);

  const [count, setcount] = useState(0);


  const [toggle, setToggle] = useState(false);


  // form submit event
  const handleSubmit = (e) => {
    e.preventDefault();

    // creating a todo object


    setcount(count + 1);


    if (count < 9 || todos.length < 10) {

      let todoObject = {
        ID: count,
        TodoValue: todoValue,
        completed: false
      }

      setTodos([...todos, todoObject]);
      setTodoValue('');
      console.log("add", count);

    }
    else {
      let items = [...todos];
      console.log(count);

      if (count === 19) {
        setcount(count - 9);
      }

      let item = items[count - 10];
      item.TodoValue = todoValue;
      item.completed = false;
      setTodos(items);
      setEditForm(false);
      setTodoValue('');

    }
    console.log(todos);

  }

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(todos.length));
    localStorage.setItem('Todos', JSON.stringify(todos));
  }, [todos])

  // delete todo
  const handleDelete = (id) => {
    console.log(id);
    console.log("del", count);
    const filtered = todos.filter((todo) => {
      return todo.ID !== id
    });
    setTodos(filtered);
  }

  // edit form
  const [editForm, setEditForm] = useState(false);

 


  return (
    <>

      {/* form component */}
      {editForm === false && (
        <div className="form">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="input-and-button">
              <input type='text' placeholder="Add a Task" required
                onChange={(e) => setTodoValue(e.target.value)} value={todoValue} />
              <div className='button'>
                <button type="submit" className='submit'>
                  <Icon icon={plus} size={20} />
                </button>
              </div>
            </div>
            <div>

            </div>
          </form>
          <button className='toggle' onClick={() => {
            setTimeout(() => {
              setToggle(!toggle)
            }, 500); // Delay of 2000 milliseconds (2 seconds)
          }
          }>Show Form</button>
        </div>
      )}


      {/* start of rendering todos depending on
          if we have length of todos greater than 0 */}
      {toggle === true && todos.length > 0 && (
        <>
          {todos.map((individualTodo, index) => (
            <div className='todo' key={individualTodo.ID}>

              <span>{"Count:     " + index}</span>
              <br />
              <span>{"Task:"}</span>
              <br />
              <div>
                <span>{individualTodo.TodoValue}</span>
              </div>

              {/* we dont need to show edit and delete icons when edit
                  button is clicked */}
              {editForm === false && (
                <div className='edit-and-delete'>
                  <div onClick={() => {
                    handleDelete(individualTodo.ID)
                    // delete the count value
                    setcount(count - 1)
                  }}>
                    <Icon icon={trash} size={18} />
                  </div>
                </div>
              )}

            </div>
          ))}

          {/* delete all todos */}
          {editForm === false && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className='delete-all'
                onClick={() => {
                  setTodos([]);
                  setcount(-1);
                  console.log(count);
                }}>Delete All Items</button>
            </div>
          )}
        </>
      )}
      {/* end of rendering todos depending on
          if we have length of todos greater than 0 */}

    </>
  )
}