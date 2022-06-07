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
		onSuccess: () => {
			// Invalidate and refetch (real time update)
			queryClient.invalidateQueries('todos');
		}
	});

	return { mutation };
};

export const useDeleteTodo = () => {
	const queryClient = useQueryClient();

	const deleteMutation = useMutation((id) => deleteTodo(id), {
		onSuccess: () => {
			// Invalidate and refetch (real time update)
			queryClient.invalidateQueries('todos');
		}
	});

	return { deleteMutation };
};

export const useUpdateTodo = () => {
	const queryClient = useQueryClient();
	const updateMutation = useMutation((todoData) => updateTodo(todoData), {
		onSuccess: () => {
			// Invalidate and refetch (real time update)
			queryClient.invalidateQueries('todos');
		}
	});

	return { updateMutation };
};
