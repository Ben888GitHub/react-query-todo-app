import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
	getTodos,
	getTodo,
	addTodo,
	deleteTodo,
	updateTodo
} from '../api/todos-api';

export const useTodos = () => {
	return useQuery('todos', getTodos, {
		keepPreviousData: true
	});
};

export const useTodo = (todoId) => {
	return useQuery(['post', todoId], () => getTodo(todoId), {
		enabled: !!todoId,
		keepPreviousData: true
	});
};

export const useAddTodo = () => {
	const queryClient = useQueryClient();
	const mutation = useMutation((todoValue) => addTodo(todoValue), {
		onSuccess: (newTodo) => {
			// Invalidate and refetch (real time update)
			// queryClient.invalidateQueries('todos');
			// Add new Query Data in Real Time
			queryClient.setQueryData('todos', (oldTodo) => [...oldTodo, newTodo]);
		}
	});

	return { mutation };
};

export const useDeleteTodo = (todoId) => {
	const queryClient = useQueryClient();

	const deleteMutation = useMutation((id) => deleteTodo(id), {
		onSuccess: (newTodo) => {
			// Invalidate and refetch (real time update)
			queryClient.invalidateQueries('todos');
		}
	});

	return { deleteMutation };
};

export const useUpdateTodo = (id) => {
	const queryClient = useQueryClient();
	const updateMutation = useMutation((todoData) => updateTodo(todoData), {
		onSuccess: (newTodo) => {
			// Invalidate and refetch (real time update)
			// queryClient.invalidateQueries('todos');
			console.log(newTodo);
			console.log(id);

			// Update data in real time
			queryClient.setQueryData(['todos', id], newTodo);
		}
	});

	return { updateMutation };
};
