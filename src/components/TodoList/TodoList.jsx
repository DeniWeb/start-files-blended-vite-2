import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import TodoListItem from '../TodoListItem/TodoListItem';

const TodoList = ({ todos, onDelete }) => {
  return (
    <Grid>
      {todos.map((todo, index) => (
        <GridItem key={todo.id}>
          <TodoListItem
            text={todo.text}
            number={index}
            id={todo.id}
            onDelete={onDelete}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TodoList;
