import Cookies from 'js-cookie';
import { goto } from '$app/navigation';

export const useLogout = () => {
	return () => {
		Cookies.remove('token');
		goto('/login');
	};
};
