import type { LayoutServerLoad } from './$types';
import { jwtDecode } from 'jwt-decode';
import type { UserCookieProps } from '$routes/api/user/type';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const tokenCookie = cookies.get('token');
	const user = tokenCookie ? jwtDecode<UserCookieProps>(tokenCookie) : null;
	return { user };
};
