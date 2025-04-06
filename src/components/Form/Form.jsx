import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';
import { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handelChange = e => {
    setQuery(e.target.value);
  };

  const handelSubmit = e => {
    e.preventDefault();
    if (!query.trim()) {
      return alert('No');
    }
    onSubmit(query);
    setQuery('');
  };
  return (
    <form onSubmit={handelSubmit} className={style.form}>
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        value={query}
        onChange={handelChange}
        required
        autoFocus
      />
    </form>
  );
};

export default Form;
