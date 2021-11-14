import axios, { AxiosError } from 'axios';

import { Response } from 'src/types';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_LOCATION
});

export default function conn(tok?: string) {
	const token = tok || '';
	if (token) {
		api.defaults.headers.common.Cookie = `token=${token}`;
		api.defaults.headers.common.Authorization = `Bearer ${token}`;
	}
	return api;
}

const errorHandler = (e: AxiosError) => {
	if (e.response) {
		return {
			data: null,
			status: false,
			message: e.response.data.message || e.response.data.data
		};
	}

	return {
		data: null,
		status: false,
		message: 'An error occurred'
	};
};

export async function getRequest<T = any>(
	url: string,
	token: string = ''
): Promise<Response<T>> {
	return conn(token)
		.get(url)
		.then((r) => r.data)
		.catch(errorHandler);
}

export async function postRequest<D = any, T = any>(
	url: string,
	data: D,
	token: string = ''
): Promise<Response<T>> {
	return conn(token)
		.post(url, data)
		.then((r) => r.data)
		.catch(errorHandler);
}

export async function putRequest<D = any, T = any>(
	url: string,
	data: D,
	token: string = ''
): Promise<Response<T>> {
	return conn(token)
		.put(url, data)
		.then((r) => r.data)
		.catch(errorHandler);
}

export async function deleteRequest<D = any, T = any>(
	url: string,
	data: D,
	token: string = ''
): Promise<Response<T>> {
	return conn(token)
		.delete(url, data)
		.then((r) => r.data)
		.catch(errorHandler);
}
