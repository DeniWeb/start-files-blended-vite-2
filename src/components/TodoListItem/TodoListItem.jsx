import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import style from './TodoListItem.module.css';
import Text from '../Text/Text';

const TodoListItem = ({ text, number, id, onDelete }) => {
  return (
    <div className={style.box}>
      <Text textAlign="center" marginBottom="20">
        TODO #{number + 1}
      </Text>
      <Text>{text}</Text>

      <button
        onClick={() => onDelete(id)}
        className={style.deleteButton}
        type="button"
      >
        <RiDeleteBinLine size={24} />
      </button>

      <button className={style.editButton} type="button">
        <RiEdit2Line size={24} />
      </button>
    </div>
  );
};

export default TodoListItem;
