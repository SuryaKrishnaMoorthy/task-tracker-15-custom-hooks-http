import React, { useState, useEffect } from "react";
import NewTask from "./components/NewTask/NewTask";
import Tasks from './components/Tasks/Tasks';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://task-tracker-15-http-default-rtdb.firebaseio.com/tasks.json')
      if(!response.ok) {
        throw new Error('Request failed')
      }
  
      const data = await response.json();
      const loadedTasks = [];
  
      for(const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text })
      }
      setTasks(loadedTasks);
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTaskHandler = (task) => {
    setTasks(prevTasks => prevTasks.concat(task));
  }


  return (
    <React.Fragment>
    <NewTask onAddTask={addTaskHandler} />
      <Tasks
        items={tasks} 
        error={error}
        loading={isLoading}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
