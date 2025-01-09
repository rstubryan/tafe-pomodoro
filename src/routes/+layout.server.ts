import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const token = cookies.get('token');

	const protectedRoutes = ['/dashboard', '/dashboard/*'];

	if ((url.pathname === '/login' || url.pathname === '/register') && token) {
		throw redirect(302, '/dashboard');
	}

	if (protectedRoutes.some((route) => url.pathname.startsWith(route.replace('*', ''))) && !token) {
		throw redirect(302, '/login');
	}

	return {};
};
