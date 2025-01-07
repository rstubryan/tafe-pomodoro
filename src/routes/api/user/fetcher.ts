import { AxiosInstance } from '../base/axiosInstance';
import Cookies from 'js-cookie';

export interface UserProps {
	id: number;
	username: string;
	email: string;
	password: string;
	role: string;
	avatar: string;
	createdAt: string;
	updatedAt: string;
}

const fetchUser = async <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data?: T) => {
	const token = Cookies.get('token');
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	try {
		let response;
		switch (method) {
			case 'GET':
				response = await AxiosInstance.get(url);
				break;
			case 'POST':
				response = await AxiosInstance.post(url, data, config);
				break;
			case 'PUT':
				response = await AxiosInstance.put(url, data, config);
				break;
			case 'DELETE':
				response = await AxiosInstance.delete(url, config);
				break;
			default:
				throw new Error('Invalid method');
		}
		return response.data;
	} catch (error) {
		console.error('Error fetching user data:', error);
		throw error;
	}
};

export default fetchUser;
