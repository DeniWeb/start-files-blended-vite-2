import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Form from '../components/Form/Form';
import Text from '../components/Text/Text';
import TodoList from '../components/TodoList/TodoList';
import EditForm from '../components/EditForm/EditForm';

const Todos = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos
      ? JSON.parse(savedTodos)
      : [
          { id: '1', text: 'Practice more' },
          { id: '2', text: 'Get all tasks done on time' },
        ];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addNewTodo = inputValue => {
    setTodos(prev => [
      ...prev,
      {
        id: nanoid(),
        text: inputValue,
      },
    ]);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const input = form.elements.search;
    const inputValue = input.value.trim();

    if (!inputValue) return;

    addNewTodo(inputValue);
    form.reset();
  };

  const handleDeleteToDo = id => {
    setTodos(prevToDo => prevToDo.filter(todo => todo.id !== id));
  };

  const handleEditTodo = () => {};

  const cancelUpdate = () => {};

  const defaultValue = () => {};

  return (
    <>
      {isEditing ? (
        <EditForm
          updateTodo={handleEditTodo}
          cancelUpdate={cancelUpdate}
          defaultValue={defaultValue}
        />
      ) : (
        <Form onSubmit={handleSubmit} />
      )}

      {todos.length > 0 ? (
        <TodoList onDelete={handleDeleteToDo} todos={todos} />
      ) : (
        <Text textAlign="center">There are no any todos ...</Text>
      )}
    </>
  );
};

export default Todos;
