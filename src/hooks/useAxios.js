import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const getTodos = async () => {
	const { data } = await axios.get('http://localhost:3001/todos');
	return data;
};

const getTodo = async (id) => {
	const { data } = await axios.get(`http://localhost:3001/todos/${id}`);
	return data;
};

const addTodo = async (todo) => {
	const { data } = await axios.post('http://localhost:3001/todos', todo);

	return data;
};

const deleteTodo = async (id) => {
	console.log(id);
	const { data } = await axios.delete(`http://localhost:3001/todos/${id.id}`);
	return data;
};

const updateTodo = async (todo) => {
	const { data } = await axios.put(
		`http://localhost:3001/todos/${todo.id}`,
		todo
	);
	return data;
};

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
