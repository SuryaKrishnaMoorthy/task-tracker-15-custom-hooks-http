import React, { useState, useEffect } from "react";
import useHttp from "./hooks/use-http";
import NewTask from "./components/NewTask/NewTask";
import Tasks from './components/Tasks/Tasks';

function App() {

  const [tasks, setTasks] = useState([]);

  const {isLoading, error, sendRequest: fetchTasks} = useHttp();

  useEffect(() => {
    const transformTasks = (taskObj) => {
      const loadedTasks = [];
    
      for(const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text })
      };
  
      setTasks(loadedTasks);
    };

    fetchTasks(
      { url: 'https://task-tracker-15-http-default-rtdb.firebaseio.com/tasks.json' },
       transformTasks
    );
  }, [fetchTasks]);

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
