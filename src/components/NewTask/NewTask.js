import useHttp from '../../hooks/use-http';
import TaskForm from './TaskForm';
import Section from '../UI/Section';

const NewTask = (props) => {
	
	const {isLoading, error, sendRequest: sendTaskRequest} = useHttp();
	const createTask = (taskText, taskData) => {
		const generateId = taskData.name;
		const createdTask = {id: generateId, text: taskText};

		props.onAddTask(createdTask);
	}

	const enterTaskHandler = async (taskText) => {				
		sendTaskRequest({
			url: 'https://task-tracker-15-http-default-rtdb.firebaseio.com/tasks.json',
			method: 'POST',
			body: { text: taskText },
			headers: {
				'Content-Type': 'application/json'
			}
		}, createTask.bind(null, taskText));
	}

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p> }
		</Section>
	)
}

export default NewTask;