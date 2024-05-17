import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from 'react';
import Task from './components/Task';

function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('taskList'));
    if (storedTodos) {
      setTaskList(storedTodos);
    }
  }, []);

  // // Update local storage whenever TODOs change
  // useEffect(() => {
  //   localStorage.setItem('taskList', JSON.stringify(taskList));
  // }, [taskList]);

 
  function AddTask() {
    if (task !== "") {
      setTaskList([...taskList, { task, index: `${task}-${Date.now()}` }]);
      localStorage.setItem('taskList', JSON.stringify(taskList));
      setTask('');
    }

    if (editId) {
      const editTask = taskList.find((i) => i.index === editId);
      const updatedTasks = taskList.map((t) => 
        t.index === editTask.index ? t= {index: t.index , task} : {index: t.index, task: t.task}
      )
      setTaskList(updatedTasks);
      setEditId(0);
      return;
    }
  }

 
  const deleteTodo = (index) => {
    var newList = taskList;
    newList.splice(index, 1);
    setTaskList([...newList]);
  }

  
  const handleEdit = (index) => {
    const editTask = taskList.find((i) => i.index === index);
    setTask(editTask.task);
    setEditId(index);
  }

  return (
    <div className="App">
      <h1 className='title'> TODO LIST APP </h1>
      
      <input type='text' value={task} onChange={(e) => { setTask(e.target.value) }} />
      <button onClick={AddTask}> Add </button>

      {taskList.map((task) => {
        return <Task task={task.task} deleteTodo={deleteTodo} index={task.index} handleEdit={handleEdit} />
      })}

    </div>
  );
}

export default App;
  