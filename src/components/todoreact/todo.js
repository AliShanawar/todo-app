import React, { useState, useEffect } from 'react';
import "./style.css";

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  }
  else {
    return [];
  }
}

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addItems = () => {
    if (!inputData) {
      alert("Please enter some text");
    }
    else if (inputData && toggleButton) {
      setItems(
        items.map((curElement) => {
          if (curElement.id === isEditItem) {
            return { ...curElement, name: inputData };
          }
          return curElement;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData
      }
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };
  const editItem = (index) => {
    const itme_todo_edit = items.find((curElement) => {
      return curElement.id === index;
    });
    setInputData(itme_todo_edit.name);
    setIsEditItem(index);
    setToggleButton(true);
  }

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElement) => {
      return curElement.id !== index;
    });
    setItems(updatedItems);
  };
  const removeAll = () => {
    setItems([]);
  }

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
    // console.log(items);
  }, [items])
  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            {/* <img src="./images/todo.svg" alt="todologo" /> */}
            <figcaption>
              Add your list here ✌
            </figcaption>
          </figure>
          <div className='addItems'>
            <input
              type="text"
              placeholder='✍Add Item'
              className='form-control'
              onChange={(event) => setInputData(event.target.value)}
              value={inputData}

            />
            {
              toggleButton ? (<i className='far fa-edit add-btn'
                onClick={addItems}></i>) : (<i className='fa fa-plus add-btn' onClick={addItems}></i>)
            }

          </div>
          <div className='showItems'>
            {items.map((curElement) => {
              return (
                <div className='eachItem' key={curElement.id}>
                  <h3>{curElement.name}</h3>
                  <div className='todo-btn'>
                    <i className='far fa-edit add-btn'
                      onClick={() => editItem(curElement.id)}
                    ></i>
                    <i className='far fa-trash-alt add-btn'
                      onClick={() => deleteItem(curElement.id)}
                    ></i>
                  </div>

                </div>
              )
            })}

          </div>

          <div className='showItems'>
            <button
              data-sm-link-text="Remove All"
              className='btn effect04'
              onClick={removeAll}
            >
              <span>Check List</span>

            </button>

          </div>
        </div>

      </div>
    </>
  )
}

export default Todo