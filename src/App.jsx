import { useState } from 'react';
import './App.css';
import dark from './assets/img/dark.svg';
import deleteButton from './assets/img/deleteButton.svg';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('All');

  const addTodo = (e) => {
    if (e.key === 'Enter' && newTodo.trim() !== '') {
      e.preventDefault();
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const toggleAllTodos = (e) => {
    const completed = e.target.checked;
    const updatedTodos = todos.map(todo => ({ ...todo, completed }));
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const incompleteTodos = todos.filter(todo => !todo.completed);
    setTodos(incompleteTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  return (
    <>
      <Header />
      <Hero
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        addTodo={addTodo}
        toggleAllTodos={toggleAllTodos}
      />
      <Todos
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
      <InteractiveDesktop
        setFilter={setFilter}
        clearCompleted={clearCompleted}
        activeCount={todos.filter(todo => !todo.completed).length}
      />
      <Interactive
        setFilter={setFilter}
      />
      <Copyright />
    </>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>TODO</h1>
      <button>
        <img src={dark} alt="Toggle Dark Mode" />
      </button>
    </div>
  );
}

function Hero({ newTodo, setNewTodo, addTodo, toggleAllTodos }) {
  return (
    <div className="hero">
      <CreateTodo
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        addTodo={addTodo}
        toggleAllTodos={toggleAllTodos}
      />
    </div>
  );
}

function CreateTodo({ newTodo, setNewTodo, addTodo, toggleAllTodos }) {
  return (
    <div className="createTodo">
      <form>
        <div className="inputArea">
          <input
            type="checkbox"
            onChange={toggleAllTodos}
          />
          <input
            className='newTodo'
            type="text"
            placeholder='Create a new todo…'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={addTodo}
          />
        </div>
      </form>
    </div>
  );
}

function Todos({ todos, toggleTodo, deleteTodo }) {
  return (
    <div className="todos">
      {todos.map((todo, index) => (
        <div className="todosItem" key={index}>
          <div className="todosCheck">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            <ul><li className={todo.completed ? 'completed' : ''}>{todo.text}</li></ul>
          </div>
          <button onClick={() => deleteTodo(index)}>
            <img src={deleteButton} alt="deleteButton" />
          </button>
        </div>
      ))}
    </div>
  );
}

function InteractiveDesktop({ setFilter, clearCompleted, activeCount }) {
  return (
    <div className="interactiveDesktop">
      <p>{activeCount} items left</p>
      <div className="completedStatusDesktop">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Active')}>Active</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>
      </div>
      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
}

function Interactive({ setFilter }) {
  return (
    <div className="interactive">
      <div className="completedStatus">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Active')}>Active</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>
      </div>
    </div>
  );
}

function Copyright() {
  return (
    <div className="copyright">
      Arda Toraman
    </div>
  );
}

export default App;
