import { useState } from 'react';
import TaskForm from './TaskForm';
import Section from '../UI/Section';

const NewTask = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const enterTaskHandler = async (taskText) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch('https://task-tracker-15-http-default-rtdb.firebaseio.com/tasks.json',{
				method: 'POST',
				body: JSON.stringify({ text: taskText }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if(!response.ok) {
				throw new Error('Request failed');
			}

			const data = await response.json();
			const generateId = data.name;
			const createdTask = {id: generateId, text: taskText};

			props.onAddTask(createdTask);
		} catch (err) {
			setError(err.message || 'Something went wrong');
		}
			setIsLoading(false);
	}

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p> }
		</Section>
	)
}

export default NewTask;