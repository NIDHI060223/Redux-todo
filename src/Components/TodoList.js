import React, { useState } from 'react'
import styled from 'styled-components'
import DeleteImg from '../assets/delete.png';
import EditImg from '../assets/edit.png';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, clearTodo, deleteTodo, updateTodo } from '../Store/features/TodoSlice';

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleAddTodo = () => {
    if (newTodo) {
      dispatch(addTodo({ id: Date.now(), text: newTodo }));
      setNewTodo("")
    }
  }

  const handleUpdateTodo = (id) => {
    dispatch(updateTodo({ id: id, newText: editedText }));
    setEditId(null);
    setEditedText("");
  }

  return (
    <div>
      <Container>
        <h1>Todo List</h1>
        <Wrapper>
          <input type='text' placeholder='Add a New Todo' onChange={(e) => setNewTodo(e.target.value)} />
          <button onClick={handleAddTodo}>Add List</button>
        </Wrapper>

        {
          todos.map((todo) => (
            <TodoItem key={todo.id}>

              {editId === todo.id ? (
                   <EditContainer>
                    <input type='text' value={editedText} onChange={(e) => setEditedText(e.target.value)}/>
                    <button onClick={()=>handleUpdateTodo(todo.id)}>Update</button>
                   </EditContainer>
              ) : (
                  <div className='todoText'>{todo.text}</div>
                  
              )}

              {editId !== todo.id && (
              <div className="editIcon" onClick={() => setEditId(todo.id)}>
                <img className="editImg" src={EditImg} alt="edit" />
              </div>
            )}
              
              <div className='deleteIcon' onClick={() => dispatch(deleteTodo(todo.id))}>
                <img src={DeleteImg} alt='delete' />
              </div>
            </TodoItem>
          ))
        }

        {
          todos.length > 0 && (
            <ClearButton onClick={() => dispatch(clearTodo())}>Clear All</ClearButton>
          )
        }

      </Container>

    </div>
  )
}

export default TodoList

const Container = styled.div`
   display:flex;
   flex-direction:column;
   align-items:center;
   margin:20px;
`;
const Wrapper = styled.div`
    display:flex;
    align-items:center;
    margin:5px 0 20px;
    border-radius:40px;
    background:transparent;
    box-shadow:0 4px 20px -2px #e9e9e9;
      
    input{
      width:330px;
      height:20px;
      padding:10px;
      font: bold 13px "lucida sans", "trebuchet MS", "Tahoma";
      border:0;
      background:#fff;
      border-radius:40px;
      border-top-style:none; 
    }
      input:focus{
         outline:0;
      }

       input::-webkit-input-placeholder {
    color: #999;
    font-weight: normal;
    font-style: italic;
    padding-left: 20px;
  }

  input:-moz-placeholder {
    color: #999;
    font-weight: normal;
    font-style: italic;
  }

  input:-ms-input-placeholder {
    color: #999;
    font-weight: normal;
    font-style: italic;
    border-style: none;
  }

  button {
    overflow: visible;
    position: relative;
    float: right;
    border: 0;
    padding: 0;
    cursor: pointer;
    height: 40px;
    width: 110px;
    font: 13px/40px "lucida sans", "trebuchet MS", "Tahoma";
    color: #fff;
    text-transform: uppercase;
    background: #198cff;
    border-radius: 40px;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.3);
  }
    button:active,
  button:focus {
    background: #198cff;
    outline: 0;
  }

  button:focus:before,
  button:active:before {
    border-right-color: #c42f2f;
  }
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  width: 400px;
  height:50px;
  padding: 5px 20px;
  border-radius: 5px;
  justify-content: center;
  background-color: rgba(25, 140, 255, 0.09);

  .todoText {
    width: 85%;
    text-align: left;
  }
  
  .editIcon{
     margin-left: 250px;
  }
  .editImg{
      width:25px;
  }

  .deleteIcon {
    width: 50%;
    text-align: right;
    background: transparent;
    color: white;
    border: none;
    padding: 5px;
    cursor: pointer;

    img {
      width: 25px;
    }
  }
`;

const EditContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  input {
    flex: 1;
    padding: 5px;
    margin-right: 10px;
    border-radius:10px;
  }

  button {
    height: 30px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
     color: #fff;
     background: #198cff;
    border-radius: 30px;
    border:none;
    width:80px;
  }
`;

const ClearButton = styled.button`
margin-top:10px;
background-color:#4caf50;
color:white;
border:none;
border-radius:5px;
padding:10px;
cursor:pointer;
text-align:right;
`;